// CompanyInfo.js
import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { FaPencilAlt } from "react-icons/fa";
import Tabs from "../../components/Tabs";
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
import { Oval } from "react-loader-spinner";
import ImageSection from "./ImageSection";
import { deepEqual } from "../../utils/deepEqual";

const UserInfo = () => {
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("companyInfo");
  const [spinner, setSpinner] = useState(false);

  const [editing, setEditing] = useState(false);
  const { user, dispatch, refresh } = useContext(AuthContext);
  const { seller_type } = Object(user);
  const isPrivateSeller = seller_type == "private seller";

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
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

  const onSubmit = async (values) => {
    let updatedValues = {};

    // Iterate over all fields in values.user object
    for (const fieldName in values.user) {
      console.log(fieldName);
      // Check if the field exists in the user object and if its value has changed
      if (
        values.user.hasOwnProperty(fieldName) &&
        !deepEqual(values.user[fieldName], user[fieldName])
      ) {
        // Update the updatedValues object with the new value
        updatedValues[fieldName] = values.user[fieldName];
      }
    }

    // Convert facilities to an array of names if it's an array of objects
    if (
      updatedValues.hasOwnProperty("facilities") &&
      Array.isArray(updatedValues["facilities"])
    ) {
      updatedValues["facilities"] = updatedValues["facilities"].map(
        (facility) => facility.name
      );
    }

    if (
      updatedValues.hasOwnProperty("working_days") &&
      Array.isArray(updatedValues["working_days"])
    ) {
      updatedValues["working_days"] = updatedValues["working_days"].map(
        (day) => day.day
      );
    }

    // Check if any updates are needed
    if (Object.keys(updatedValues).length === 0) {
      // If no differences, no need to send any updates
      return;
    }

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
      dispatch({ type: "REFRESH_STATE", payload: !refresh });

      dispatch({ type: "SET_USER", payload: data.data });
      setSpinner(false);
      setEditing(false);
    } catch (error) {
      console.error("An unexpected error occurred:", error);
      const { errors } = error.response.data;
      displayErrorMessages(errors);
      setSpinner(false);
    }
  };
  return (
    <Layout>
      <LoadingWrapper
        loading={loading}
        className="top-0 xl:-translate-x-0 -translate-x-1/2"
      >
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
          {({ values, setFieldValue }) => (
            <Form>
              <div className="mt-6 flex smallLg:flex-row flex-col rounded-lg bg-white min-h-screen">
                <ImageSection
                  setFieldValue={setFieldValue}
                  company_logo={values.user.company_logo}
                  image_field={values.user.image_field}
                  main_picture={values.user.main_picture}
                  isPrivateSeller={isPrivateSeller}
                />
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
                      <CompanyInfo
                        editable={editing}
                        user={user}
                        isPrivateSeller={isPrivateSeller}
                      />
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
                disabled={spinner}
                className="hover:bg-[#0a1dbd] mt-6 block ml-auto bg-[#0D1A8B] hover:text-white font-medium text-white px-6 py-3 rounded cursor-pointer min-w-44 min-h-12"
              >
                {spinner ? (
                  <Oval
                    secondaryColor="#fff"
                    color="#fff"
                    width={20}
                    height={20}
                    wrapperClass="justify-center"
                  />
                ) : (
                  " Save Changes"
                )}
              </button>
            </Form>
          )}
        </Formik>
      </LoadingWrapper>
    </Layout>
  );
};

export default UserInfo;
