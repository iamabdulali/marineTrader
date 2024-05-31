import { Form } from "formik";
import React, { useState } from "react";
import ImageSection from "./ImageSection";
import Tabs from "../../../components/Tabs";
import CompanyInfo from "./CompanyInfo";
import BusinessDetails from "./BusinessDetails";
import ContactPersonDetails from "./ContactPersonDetails";
import { Oval } from "react-loader-spinner";

function MainForm({
  setFieldValue,
  values,
  spinner,
  editing,
  user,
  isPrivateSeller,
}) {
  const [selectedTab, setSelectedTab] = useState("companyInfo");

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const tabs = [
    { id: "companyInfo", label: "Company Info" },
    { id: "businessDetails", label: "Business Details" },
    { id: "contactPersonDetails", label: "Contact Person Details" },
  ];
  return (
    <>
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
    </>
  );
}

export default MainForm;
