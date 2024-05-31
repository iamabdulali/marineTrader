import React, { useContext, useEffect, useState } from "react";
import Layout from "../../components/Layout/Layout";
import { FaPencilAlt } from "react-icons/fa";
import { AuthContext } from "../../Context/AuthContext";
import LoadingWrapper from "../../utils/LoadingWrapper";
import { Formik } from "formik";
import { deepEqual } from "../../utils/deepEqual";
import MainForm from "./components/MainForm";
import { useSignUp } from "../../Hooks";

const UserInfo = () => {
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const { seller_type } = Object(user);
  const isPrivateSeller = seller_type == "private seller";

  const { signUp, spinner, editing, setEditing } = useSignUp();

  const handleEditClick = () => {
    setEditing(true);
  };

  useEffect(() => {
    if (user) {
      setLoading(false);
    }
  }, [user]);

  const initialValues = {
    user,
  };

  let updatedValues = {};

  function convertJSONToArray(propertyName) {
    if (
      updatedValues.hasOwnProperty(propertyName) &&
      Array.isArray(updatedValues[propertyName])
    ) {
      updatedValues[propertyName] =
        propertyName === "service_hours"
          ? JSON.stringify(updatedValues[propertyName])
          : updatedValues[propertyName].map((property) => property.name);
    }
  }

  const onSubmit = async (values) => {
    for (const fieldName in values.user) {
      if (
        values.user.hasOwnProperty(fieldName) &&
        !deepEqual(values.user[fieldName], user[fieldName])
      ) {
        updatedValues[fieldName] = values.user[fieldName];
      }
    }
    convertJSONToArray("facilities");
    convertJSONToArray("working_days");
    convertJSONToArray("service_hours");
    signUp(
      isPrivateSeller ? "private/update" : "trade-seller/update",
      updatedValues,
      "",
      true
    );
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
            <MainForm
              setFieldValue={setFieldValue}
              values={values}
              spinner={spinner}
              editing={editing}
              user={user}
              isPrivateSeller={isPrivateSeller}
            />
          )}
        </Formik>
      </LoadingWrapper>
    </Layout>
  );
};

export default UserInfo;
