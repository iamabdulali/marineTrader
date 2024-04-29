import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { Field, Form, Formik } from "formik";
import CategoryList from "../../components/categoryList/CategoryList";
import { AuthContext } from "../../Context/AuthContext";
import FileInput from "../../components/Forms/FormElements/FileInput";
import { Oval } from "react-loader-spinner";
import { inquiryTypes } from "../../utils/DummyData";

import CompanyInformation from "./CompanyInformation";
import LoadingWrapper from "../../utils/LoadingWrapper";
import axios from "axios";
import { SERVER_BASE_URL } from "../..";
import { toast } from "react-toastify";

const ContactUs = () => {
  const { selectedCategory, categories } = useContext(AuthContext);
  const [spinner, setSpinner] = useState(false);
  const [loading, setLoading] = useState(true);
  const initialValues = {
    user_name: "",
    user_email: "",
    category: "",
    category_selection: "",
    description: "",
    attachment: "",
    type: "",
  };

  const onSubmit = async (values) => {
    setSpinner(true);
    console.log(values);
    try {
      const { data } = await axios.post(
        `${SERVER_BASE_URL}/contact-support`,
        values,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      toast.success(data.message);
    } catch (error) {
      console.log(error);
    } finally {
      setSpinner(false);
    }
  };

  useEffect(() => {
    categories?.length != 0 ? setLoading(false) : setLoading(true);
  }, [categories]);

  const { user } = useContext(AuthContext);
  const { seller_type, email, phone_no, city, country } = Object(user);

  return (
    <LoadingWrapper
      loading={loading}
      className="top-0 xl:-translate-x-0 -translate-x-1/2"
    >
      <Layout>
        <div
          className={` bg-white sm:p-5 py-7 px-3 rounded-lg shadow-[7px] mb-4 `}
        >
          <label
            htmlFor="search"
            className="mr-2 sm:text-lg text-base font-semibold"
          >
            Contact Support
          </label>
        </div>
        <div className="flex lg:flex-row flex-col items-baseline gap-6">
          <div
            className={`bg-white sm:p-5 py-7 px-3 lg:w-7/12 w-full rounded-lg shadow-[7px]`}
          >
            {/* <p className="font-medium text-sm">Seller Type</p>
            <div className="flex items-center justify-between mt-4 border-2 rounded-md p-3 text-sm font-medium">
              <button className="bg-[#0D1A8B] hover:bg-[#0a1dbd] text-white py-4 rounded-sm block w-full">
                Private
              </button>
              <button className="block w-full">Seller</button>
              <button className="block w-full">Not a Member</button>
            </div> */}
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              {({ isValid, values, setErrors, setTouched, setFieldValue }) => (
                <Form className="mt-4 ">
                  <div className="sm:flex-row flex-col flex items-center gap-5">
                    <div className="w-full">
                      <label className="text-sm font-medium block mb-1">
                        Username
                      </label>
                      <Field
                        type="text"
                        name="user_name"
                        className="border-2 rounded-md px-3 py-3 w-full text-sm"
                        placeholder="Username"
                      />
                    </div>
                    <div className="w-full">
                      <label className="text-sm font-medium block mb-1">
                        Email
                      </label>
                      <Field
                        type="email"
                        name="user_email"
                        className="border-2 rounded-md px-3 py-3 w-full text-sm"
                        placeholder="Email"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <p className=" font-semibold">Enquiry Information</p>
                    <p className=" text-sm font-semibold mt-7">
                      Select Category
                    </p>
                    <div className="category-menu overflow-x-auto ">
                      <CategoryList
                        initialCategory={-1}
                        className="lg:grid lg:px-0 sm:px-4 pr-4  2xl:grid-cols-5 lg:grid-cols-4 flex justify-between flex-wrap  sm:py-2 place-items-center mt-5 gap-x-6 gap-y-4 smallLg:w-auto w-[900px]  bg-white border-2 rounded-lg border-[#D9DFF5]
              "
                        activeCategory="border-b-4 border-[#0D1A8B] py-3"
                        unActiveCategory="py-3"
                        onCategoryChange={(category) => {
                          setFieldValue("category", selectedCategory?.id);
                        }}
                        onCategoryClick={() => {}}
                        categories={categories}
                      />
                    </div>

                    <label className="flex items-center gap-3 mt-4">
                      <Field
                        type="checkbox"
                        name="category_selection"
                        className="min-w-5 min-h-5"
                      />
                      <p className="text-sm font-medium">
                        This is not about a Category
                      </p>
                    </label>
                    <p className=" text-sm font-semibold mt-7">
                      Please Select the Inquiry Type
                    </p>
                    <div className="grid md:grid-cols-3 grid-cols-1 gap-4 text-sm mt-4">
                      {inquiryTypes.map(({ name, id }) => {
                        return (
                          <div key={id} className="radio">
                            <input
                              type="radio"
                              id={id}
                              name="type"
                              value={`${name}`}
                              onChange={(e) => {
                                setFieldValue("type", e.target.value);
                                console.log(values.type);
                              }}
                              checked={values?.type === name}
                            />
                            <label htmlFor={id} className="radio-label mr-5">
                              {name}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                    <p className=" text-sm font-semibold mt-5 block mb-2">
                      Other
                    </p>
                    <Field
                      type="text"
                      name="other"
                      className="border-2 rounded-md px-3 py-3 w-full text-sm"
                      placeholder="Write Here..."
                    />
                    <p className=" text-sm font-semibold mt-5 block mb-2">
                      Please provide information
                    </p>
                    <Field
                      as="textarea"
                      resize="vertical"
                      name="description"
                      className="border-2 min-h-28 rounded-md px-3 py-3 w-full text-sm"
                      placeholder="Write Here..."
                    />
                    <div className="w-full mt-4">
                      <Field
                        name="attachment"
                        component={FileInput}
                        label="Upload Screenshots"
                        accept="image/jpeg, image/png"
                        fieldName="attachment"
                        furtherStyles="top-4"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={!isValid}
                      className={`bg-[#0D1A8B] block w-full mt-8 hover:bg-[#0a1dbd] text-white p-3 min-h-12 rounded-md  ${
                        isValid ? "opacity-100" : "opacity-70"
                      }`}
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
                        "Send"
                      )}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
          {seller_type == "private seller" ? (
            ""
          ) : (
            <CompanyInformation
              email={email}
              phone_no={phone_no}
              city={city}
              country={country}
            />
          )}
        </div>
      </Layout>
    </LoadingWrapper>
  );
};

export default ContactUs;
