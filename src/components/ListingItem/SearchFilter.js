import React, { useContext, useEffect, useState } from "react";
import SelectDropdown from "../SelectDropdown";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { useWindowSize } from "../../Hooks/windowResize";
import { AuthContext } from "../../Context/AuthContext";
import { yearsArray } from "../../utils/DummyData";
import { Field, Form, Formik } from "formik";
import { SERVER_BASE_URL } from "../..";
import axios from "axios";
import { Oval } from "react-loader-spinner";

const SearchFilter = ({ setSearchedListings, setLoading }) => {
  const [width] = useWindowSize();
  const [showFilterMenu, setShowFilterMenu] = useState(width > 900);
  const [spinner, setSpinner] = useState(false);

  useEffect(() => {
    setShowFilterMenu(width > 900);
  }, [width]);
  const { selectedCategory, conditions, makes, types, modals } =
    useContext(AuthContext);

  const initialValues = {
    make: "",
    model: "",
    year: "",
    type: "",
    condition: "",
  };

  const handleSubmit = async (values) => {
    setSpinner(true);
    const filterParams = {};
    Object.keys(values).forEach((key) => {
      if (values[key]) {
        filterParams[key] = values[key];
      }
    });
    const queryString = new URLSearchParams(filterParams).toString();
    const searchUrl = `${SERVER_BASE_URL}?${queryString}`;

    try {
      const { data } = await axios.get(searchUrl);
      setSearchedListings(data.data);
      setLoading(false);
      setSpinner(false);
    } catch (error) {
      console.log(error);
      setSpinner(false);
    }
  };

  return (
    <>
      <div
        onClick={() => setShowFilterMenu(!showFilterMenu)}
        className={`smallLg:hidden border-t-2  cursor-pointer flex items-center justify-between p-4 w-full bg-[#FAFAFA] text-[#11133D] font-semibold ${
          showFilterMenu ? "mb-0 " : "mb-10 border-b-2"
        }`}
      >
        <p>Filter</p>
        {showFilterMenu ? <FaChevronUp /> : <FaChevronDown />}
      </div>
      {showFilterMenu ? (
        <Formik initialValues={initialValues} onSubmit={handleSubmit}>
          <Form
            className={`flex smallLg:flex-row flex-col gap-3 smallLg:items-end w-full border-t-2 border-b-2 py-6 mb-10 `}
          >
            <SelectDropdown options={makes} label="Make" name="make" />
            <SelectDropdown options={modals} label="Model" name="model" />
            <SelectDropdown options={types} label="Type" name="type" />
            <SelectDropdown
              options={conditions}
              label="Condition"
              name="condition"
            />
            <SelectDropdown options={yearsArray} label="Year" name="year" />
            <SelectDropdown
              options={["priceOptions"]}
              options2={[""]}
              label="Price"
              name="Price"
            />
            <button
              type="submit"
              className="bg-[#0D1A8B] min-w-[104px] min-h-[48px] hover:bg-[#0a1dbd] text-white py-3 px-6 font-medium rounded-lg smallLg:mt-0 mt-4"
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
                "Search"
              )}
            </button>
          </Form>
        </Formik>
      ) : (
        ""
      )}
    </>
  );
};

export default SearchFilter;
