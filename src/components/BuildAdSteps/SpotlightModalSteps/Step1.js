import React, { useContext, useEffect, useState } from "react";
import CheckboxGroup from "../../CheckboxGroup";
import { FaTrash } from "react-icons/fa";
import { AuthContext } from "../../../Context/AuthContext";
import { fetchOptions } from "../../../utils/fetch/fetchData";
import { Field, useFormikContext } from "formik";
import LoadingWrapper from "../../../utils/LoadingWrapper";

const Step1 = ({ showSpotlightSelection, spotlightFor, isEditMode }) => {
  const { bundleName } = useContext(AuthContext);

  const [selectedCountries, setSelectedCountries] = useState([]);
  const [selectedContinents, setSelectedContinents] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  const { values, setFieldValue } = useFormikContext();
  const { advert } = Object(values);

  useEffect(() => {
    fetchOptions("countries", setSelectedCountries, setLoading);
    fetchOptions("continents", setSelectedContinents, setLoading);
  }, []);

  function generateUniqueId(maxId) {
    return maxId + 1;
  }

  const handleInputChange = (e) => {
    const { name, value, checked } = e.target;
    const isCountrySpotlight = name === `country${spotlightFor}Spotlights`;
    const isContinentSpotlight = name === `continent${spotlightFor}Spotlights`;
    const selectedType = isCountrySpotlight
      ? selectedCountries
      : selectedContinents;
    const valueToModify = values?.advert?.[name] || [];

    if (isCountrySpotlight || isContinentSpotlight) {
      const spotlightPrice = Number(
        selectedType[value]?.spotlight_price.match(/\d+\.\d+/)[0]
      );

      const updatedFeatures = checked
        ? [
            ...valueToModify,
            {
              id: generateUniqueId(
                valueToModify.reduce((max, item) => Math.max(max, item.id), 0)
              ),
              [isCountrySpotlight ? "country_id" : "continent_id"]: value,
              advert_id: advert?.id,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            },
          ]
        : valueToModify.filter(
            (item) =>
              item[isCountrySpotlight ? "country_id" : "continent_id"] !== value
          );

      if (checked && !isNaN(spotlightPrice)) {
        setTotalCount((prevTotalCount) => prevTotalCount + spotlightPrice);
      } else if (!checked && !isNaN(spotlightPrice)) {
        setTotalCount((prevTotalCount) => prevTotalCount - spotlightPrice);
      }

      if (isEditMode) {
        setFieldValue(`advert.${name}`, updatedFeatures);
        if (isContinentSpotlight) {
          setFieldValue(`advert.country${spotlightFor}Spotlights`, []);
          setRefresh(true);
        } else if (isCountrySpotlight) {
          setFieldValue(`advert.continent${spotlightFor}Spotlights`, []);
          setRefresh(false);
        }
      } else {
        if (isContinentSpotlight) {
          setFieldValue(`country${spotlightFor}Spotlights`, []);
          setRefresh(true);
        } else if (isCountrySpotlight) {
          setFieldValue(`continent${spotlightFor}Spotlights`, []);
          setRefresh(false);
        }
        setFieldValue(
          name,
          checked
            ? [...values[name], value]
            : values[name].filter((item) => item !== value)
        );
      }
    } else {
      setFieldValue(name, value);
    }
  };

  const renderSelectedCountriesTable = (tableFor, ArrayFor) => {
    const selectedCountriesArray =
      values[`${tableFor}${spotlightFor}Spotlights`];

    const handleRemove = (country) => {
      const valueToModify =
        values?.advert?.[`${tableFor}${spotlightFor}Spotlights`];

      if (isEditMode) {
        const updatedFeatures = valueToModify.filter(
          (item) => item[`${tableFor}_id`] != country
        );
        setFieldValue(
          `advert.${tableFor}${spotlightFor}Spotlights`,
          updatedFeatures
        );
        console.log(updatedFeatures);
      } else {
        setFieldValue(
          `${tableFor}${spotlightFor}Spotlights`,
          values[`${tableFor}${spotlightFor}Spotlights`].filter(
            (item) => item != country - 1
          )
        );
        setTotalCount(
          (prevTotalCount) => prevTotalCount - ArrayFor[country].spotlight_price
        );
      }
    };

    if (selectedCountriesArray?.length === 0) {
      return <p className="px-8">No {tableFor} selected.</p>;
    }

    return (
      <div className="sm:px-8 px-5">
        <div className="text-[#0D1A8B] smallLg:text-xl text-base font-bold flex justify-between ">
          <p>Your SpotLight Selections</p>
          <p className="uppercase">Total: £{totalCount.toFixed(2)}</p>
        </div>
        <table className="w-full sm:text-base text-sm text-left bg-[#f9f9f9] border-collapse border border-[#D8D8D8] mt-4">
          <thead>
            <tr className="text-[#8891B2] border-b-2">
              <th className="py-2 px-4 font-medium capitalize">{tableFor}</th>
              <th className="py-2 px-4 font-medium">Price</th>
              <th className="py-2 px-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            {isEditMode
              ? advert[`${tableFor}${spotlightFor}Spotlights`]?.map(
                  (spotlight) => {
                    console.log(`${tableFor}_id`);
                    console.log(spotlight[`${tableFor}_id`]);
                    return (
                      <tr
                        key={ArrayFor[spotlight[`${tableFor}_id`] - 1]?.name}
                        className=" text-[#11133D]"
                      >
                        <td className="py-2 px-4 font-semibold">
                          {ArrayFor[spotlight[`${tableFor}_id`] - 1]?.name}
                        </td>
                        <td className="py-2 px-4 font-semibold">
                          £
                          {
                            ArrayFor[spotlight[`${tableFor}_id`] - 1]
                              ?.spotlight_price
                          }
                        </td>
                        <td className="py-2 px-4 font-semibold">
                          <button
                            className=" text-[#FC4040] flex items-center gap-3 px-3 py-1 rounded"
                            onClick={() =>
                              handleRemove(
                                ArrayFor[spotlight[`${tableFor}_id`] - 1]?.id
                              )
                            }
                          >
                            <FaTrash /> Remove
                          </button>
                        </td>
                      </tr>
                    );
                  }
                )
              : values[`${tableFor}${spotlightFor}Spotlights`]?.map(
                  (country) => {
                    return (
                      <tr
                        key={ArrayFor[country - 1]?.name}
                        className=" text-[#11133D]"
                      >
                        <td className="py-2 px-4 font-semibold">
                          {ArrayFor[country - 1]?.name}
                        </td>
                        <td className="py-2 px-4 font-semibold">
                          £{ArrayFor[country - 1]?.spotlight_price}
                        </td>
                        <td className="py-2 px-4 font-semibold">
                          <button
                            className=" text-[#FC4040] flex items-center gap-3 px-3 py-1 rounded"
                            onClick={() => handleRemove(ArrayFor[country]?.id)}
                          >
                            <FaTrash /> Remove
                          </button>
                        </td>
                      </tr>
                    );
                  }
                )}
          </tbody>
        </table>
      </div>
    );
  };

  useEffect(() => {
    if (isEditMode) {
      const lengthOfCountryArray =
        advert[`country${spotlightFor}Spotlights`]?.length;

      const lengthOfContinentArray =
        advert[`continent${spotlightFor}Spotlights`]?.length;

      const totalSpotlights = lengthOfContinentArray + lengthOfCountryArray;
      setTotalCount(
        lengthOfCountryArray * 6.99 + lengthOfContinentArray * 89.99
      );
    }
  });

  return (
    <>
      <div className="py-5 min-h-[40vh]">
        {showSpotlightSelection ? (
          <>
            {refresh
              ? renderSelectedCountriesTable("continent", selectedContinents)
              : renderSelectedCountriesTable("country", selectedCountries)}
          </>
        ) : (
          <div className="py-5">
            <LoadingWrapper
              loading={loading}
              className="sm:top-1/2 top-1/3 -translate-y-1/2  -translate-x-1/2"
            >
              <div className="text-[#0D1A8B] smallLg:text-xl text-base font-bold flex justify-between sm:px-8 px-5">
                <p className="pr-3">Select Countries From The List:</p>
                <p className="uppercase">
                  <span className="sm:inline-block hidden">Total:</span> £
                  {totalCount.toFixed(2)}
                </p>
              </div>
              <div className="sm:px-8 px-5">
                <div
                  className={`grid smallLg:grid-cols-4 sm:grid-cols-2 gap-5 text-sm font-medium text-[#11133D] mt-7`}
                >
                  {selectedCountries?.map(({ name, id, spotlight_price }) => (
                    <div key={id}>
                      <label className="flex text-[#11133D]">
                        <Field
                          className="min-w-[20px] min-h-[20px] text-blue-600 bg-gray-100 border-gray-300 rounded mr-3"
                          type="checkbox"
                          name={`country${spotlightFor}Spotlights`}
                          value={`${id}`}
                          {...(isEditMode && {
                            checked: advert[
                              `country${spotlightFor}Spotlights`
                            ].some((item) => item.country_id == id),
                          })}
                          onChange={(e) => handleInputChange(e)}
                        />
                        {name} (+ {spotlight_price})
                      </label>
                    </div>
                  ))}
                </div>

                <div className="text-[#0D1A8B] smallLg:text-xl text-base font-bold mt-12">
                  <p>Select Continents From The List:</p>
                </div>
                <div
                  className={`grid smallLg:grid-cols-4 sm:grid-cols-2 gap-5 text-sm font-medium text-[#11133D] mt-7`}
                >
                  {selectedContinents?.map(({ name, id, spotlight_price }) => (
                    <div key={id}>
                      <label className="flex text-[#11133D]">
                        <Field
                          className="min-w-[20px] min-h-[20px] text-blue-600 bg-gray-100 border-gray-300 rounded mr-3"
                          type="checkbox"
                          name={`continent${spotlightFor}Spotlights`}
                          value={`${id}`}
                          onChange={(e) => handleInputChange(e)}
                          {...(isEditMode && {
                            checked: advert[
                              `continent${spotlightFor}Spotlights`
                            ].some((item) => item.continent_id == id),
                          })}
                        />
                        {name} (+ £{spotlight_price})
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </LoadingWrapper>
          </div>
        )}
      </div>
    </>
  );
};

export default Step1;
