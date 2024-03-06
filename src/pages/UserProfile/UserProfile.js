// CompanyInfo.js
import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { FaPencilAlt } from "react-icons/fa";
import Tabs from "../../components/Tabs";
import { cameraIcon, coverPhoto } from "../../assets";
import BusinessDetails from "./BusinessDetails";
import ContactPersonDetails from "./ContactPersonDetails";
import CompanyInfo from "./CompanyInfo";
import { AuthContext } from "../../Context/AuthContext";
import LoadingWrapper from "../../utils/LoadingWrapper";
import { Formik, Form } from "formik";
import { SERVER_BASE_URL } from "../..";
import { toast } from "react-toastify";
import { displayErrorMessages } from "../../utils/displayErrors";
import axios from "axios";

const UserInfo = () => {
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("companyInfo");
  const [spinner, setSpinner] = useState(false);
  const [coverPhotoSrc, setCoverPhotoSrc] = useState(null);
  const [profilePhotoSrc, setProfilePhotoSrc] = useState(null);

  const [editing, setEditing] = useState(true);
  const { user, dispatch } = useContext(AuthContext);
  const { seller_type } = Object(user);
  const isPrivateSeller = seller_type == "private seller";

  const handleEditClick = () => {
    setEditing(!editing);
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const handleFileUpload = (type, e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === "cover") {
          setCoverPhotoSrc(reader.result);
          setFieldValue("user.company_logo", file);
          console.log(reader);
        } else if (type === "profile") {
          setProfilePhotoSrc(reader.result);
          setFieldValue(
            `${isPrivateSeller ? "user.image_field" : "user.main_picture"}`,
            file
          );
        }
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  const tabs = [
    { id: "companyInfo", label: "Company Info" },
    { id: "businessDetails", label: "Business Details" },
    { id: "contactPersonDetails", label: "Contact Person Details" },
  ];

  const initialValues = {
    user,
  };

  console.log(user);

  const onSubmit = async (values) => {
    const updatedValues = {
      ...values.user,
      service_hours: JSON.stringify(values.user?.service_hours),
      open_public_holidays: "yes",
    };
    console.log(updatedValues);
    setSpinner(true);
    try {
      const { data } = await axios.post(
        `${SERVER_BASE_URL}/${
          isPrivateSeller ? "private" : "trade-seller"
        }/update`,
        updatedValues,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(data.message);
      // localStorage.setItem("token", data.token);
      dispatch({ type: "SET_USER", payload: data.data });
      setSpinner(false);
      // NavigateTo("/dashboard");
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      const { errors } = error.response.data;
      displayErrorMessages(errors);
      setSpinner(false);
    }
  };

  return (
    <Layout>
      <LoadingWrapper loading={loading}>
        <div className="flex items-center justify-between rounded-lg  shadow-[7px] bg-white font-semibold py-5 px-7">
          <p className="">User Profile</p>
          <p
            onClick={handleEditClick}
            className="flex items-center gap-2 underline text-[#0D1A8B] cursor-pointer"
          >
            <FaPencilAlt />
            Edit
          </p>
        </div>
        <Formik onSubmit={onSubmit} initialValues={initialValues}>
          {({ isValid, values, setErrors, setTouched, setFieldValue }) => (
            <Form>
              <div className="mt-6 flex smallLg:flex-row flex-col rounded-lg bg-white min-h-screen">
                <div className="smallLg:w-4/12  w-full bg-[#EDF1FE] smallLg:rounded-tl-lg smallLg:rounded-bl-lg smallLg:mb-0 mb-4">
                  {isPrivateSeller ? (
                    ""
                  ) : (
                    <div className="relative">
                      <img
                        src={coverPhotoSrc || values.user.company_logo}
                        className="min-h-[270px] smallLg:max-h-[270px] max-h-[450px] w-full object-cover"
                      />
                      <label
                        htmlFor="coverPhotoInput"
                        className="flex items-center absolute top-5 right-5 gap-2 underline text-[#fff] cursor-pointer"
                      >
                        <FaPencilAlt />
                        Edit
                      </label>
                      <input
                        type="file"
                        id="coverPhotoInput"
                        accept="image/*"
                        name="company_logo"
                        onChange={(e) =>
                          handleFileUpload("cover", e, setFieldValue)
                        }
                        className="hidden"
                      />
                    </div>
                  )}

                  <div
                    className={`relative ${
                      isPrivateSeller ? "top-10" : "-top-20"
                    }  w-40 mx-auto`}
                  >
                    <img
                      src={
                        profilePhotoSrc ||
                        values.user.image_field ||
                        values.user.main_picture
                      }
                      alt="Profile Photo"
                      className="rounded-full w-40 h-40 object-cover object-top border-4 border-[#CDD0F0]"
                    />
                    <label
                      htmlFor="profilePhotoInput"
                      className="absolute w-14 bottom-0 right-0 cursor-pointer"
                    >
                      <img src={cameraIcon} alt="camera-icon" />
                    </label>
                    <input
                      type="file"
                      id="profilePhotoInput"
                      accept="image/*"
                      name={`${
                        isPrivateSeller ? "image_field" : "main_picture"
                      }`}
                      onChange={(e) =>
                        handleFileUpload("profile", e, setFieldValue)
                      }
                      className="hidden"
                    />
                  </div>
                </div>
                <div className="smallLg:w-8/12 w-full overflow-x-hidden">
                  {isPrivateSeller ? (
                    ""
                  ) : (
                    <div className="sm:overflow-x-hidden overflow-x-scroll userProfileTab">
                      <Tabs
                        tabs={tabs}
                        selectedTab={selectedTab}
                        handleTabClick={handleTabClick}
                        className="xl:text-base text-sm sm:w-auto w-[700px]"
                      />
                    </div>
                  )}
                  <div className="tab-content px-6 py-10">
                    {selectedTab === "companyInfo" && (
                      <CompanyInfo editable={editing} user={user} />
                    )}
                    {selectedTab === "businessDetails" && (
                      <BusinessDetails editable={editing} user={user} />
                    )}
                    {selectedTab === "contactPersonDetails" && (
                      <ContactPersonDetails editable={editing} user={user} />
                    )}
                  </div>
                </div>
              </div>
              <button
                type="submit"
                className="hover:bg-[#0a1dbd] mt-6 block ml-auto bg-[#0D1A8B] hover:text-white font-medium text-white px-6 py-3 rounded cursor-pointer"
              >
                Save Changes
              </button>
            </Form>
          )}
        </Formik>
      </LoadingWrapper>
    </Layout>
  );
};

export default UserInfo;
