import React, { useContext, useEffect, useState } from "react";
import CheckboxGroup from "../../CheckboxGroup";
import { FaTrash } from "react-icons/fa";
import { AuthContext } from "../../../Context/AuthContext";
import { fetchOptions } from "../../../utils/fetch/fetchData";
import { Field, useFormikContext } from "formik";
import LoadingWrapper from "../../../utils/LoadingWrapper";

const Step1 = ({ showSpotlightSelection, spotlightFor, isEditMode }) => {
  const { user, currencyRates } = useContext(AuthContext);

  const { currency } = Object(user);

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
    console.log(name);
    const isCountrySpotlight = name === `${spotlightFor}_spotlights_countries`;
    const isContinentSpotlight =
      name === `${spotlightFor}_spotlights_continents`;
    const selectedType = isCountrySpotlight
      ? selectedCountries
      : selectedContinents;
    const valueToModify = values?.advert?.[name] || [];

    if (isCountrySpotlight || isContinentSpotlight) {
      const spotlightPrice = Number(
        selectedType[value]?.spotlight_price.match(/\d+\.\d+/)[0]
      );

      console.log(spotlightPrice);

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
          setFieldValue(`advert.${spotlightFor}_spotlights_countries`, []);
          setRefresh(true);
        } else if (isCountrySpotlight) {
          setFieldValue(`advert.${spotlightFor}_spotlights_continents`, []);
          setRefresh(false);
        }
      } else {
        if (isContinentSpotlight) {
          setFieldValue(`${spotlightFor}_spotlights_countries`, []);
          setRefresh(true);
        } else if (isCountrySpotlight) {
          setFieldValue(`${spotlightFor}_spotlights_continents`, []);
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
      values[`${spotlightFor}_spotlights_${tableFor}`];

    const handleRemove = (country) => {
      const valueToModify =
        values?.advert?.[`${spotlightFor}_spotlights_${tableFor}`];

      if (isEditMode) {
        const updatedFeatures = valueToModify.filter(
          (item) =>
            item[`${tableFor == "countries" ? "country" : "continent"}_id`] !=
            country
        );
        setFieldValue(
          `advert.${spotlightFor}_spotlights_${tableFor}`,
          updatedFeatures
        );
        console.log(updatedFeatures);
      } else {
        setFieldValue(
          `${spotlightFor}_spotlights_${tableFor}`,
          values[`${spotlightFor}_spotlights_${tableFor}`].filter(
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
          <p className="uppercase">
            Total:{" "}
            {`${currency?.symbol}${Number(
              totalCount * currencyRates[currency?.currency_code]
            ).toFixed(2)}`}
          </p>
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
              ? advert[`${spotlightFor}_spotlights_${tableFor}`]?.map(
                  (spotlight) => {
                    return (
                      <tr
                        key={
                          ArrayFor[
                            spotlight[
                              `${
                                tableFor == "countries"
                                  ? "country"
                                  : "continent"
                              }_id`
                            ] - 1
                          ]?.name
                        }
                        className=" text-[#11133D]"
                      >
                        <td className="py-2 px-4 font-semibold">
                          {
                            ArrayFor[
                              spotlight[
                                `${
                                  tableFor == "countries"
                                    ? "country"
                                    : "continent"
                                }_id`
                              ] - 1
                            ]?.name
                          }
                        </td>
                        <td className="py-2 px-4 font-semibold">
                          £
                          {
                            ArrayFor[
                              spotlight[
                                `${
                                  tableFor == "countries"
                                    ? "country"
                                    : "continent"
                                }_id`
                              ] - 1
                            ]?.spotlight_price
                          }
                        </td>
                        <td className="py-2 px-4 font-semibold">
                          <button
                            className=" text-[#FC4040] flex items-center gap-3 px-3 py-1 rounded"
                            onClick={() =>
                              handleRemove(
                                ArrayFor[
                                  spotlight[
                                    `${
                                      tableFor == "countries"
                                        ? "country"
                                        : "continent"
                                    }_id`
                                  ] - 1
                                ]?.id
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
              : values[`${spotlightFor}_spotlights_${tableFor}`]?.map(
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
                          {`${currency?.symbol}${Number(
                            ArrayFor[country - 1]?.spotlight_price *
                              currencyRates[currency?.currency_code]
                          ).toFixed(2)}`}
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
        advert[`${spotlightFor}_spotlights_countries`]?.length;

      const lengthOfContinentArray =
        advert[`${spotlightFor}_spotlights_continents`]?.length;

      setTotalCount(
        lengthOfCountryArray * 6.99 + lengthOfContinentArray * 89.99
      );
    } else {
      let lengthOfCountryArray =
        values[`${spotlightFor}_spotlights_countries`]?.length;
      let lengthOfContinentArray =
        values[`${spotlightFor}_spotlights_continents`]?.length;
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
              ? renderSelectedCountriesTable("continents", selectedContinents)
              : renderSelectedCountriesTable("countries", selectedCountries)}
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
                  <span className="sm:inline-block hidden">Total:</span>
                  {`${currency?.symbol}${Number(
                    totalCount * currencyRates[currency?.currency_code]
                  ).toFixed(2)}`}
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
                          name={`${spotlightFor}_spotlights_countries`}
                          value={`${id}`}
                          {...(isEditMode && {
                            checked: advert[
                              `${spotlightFor}_spotlights_countries`
                            ].some((item) => item.country_id == id),
                          })}
                          onChange={(e) => handleInputChange(e)}
                        />
                        {name} (+{" "}
                        {`${currency?.symbol}${Number(
                          spotlight_price *
                            currencyRates[currency?.currency_code]
                        ).toFixed(2)}`}
                        )
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
                          name={`${spotlightFor}_spotlights_continents`}
                          value={`${id}`}
                          onChange={(e) => handleInputChange(e)}
                          {...(isEditMode && {
                            checked: advert[
                              `${spotlightFor}_spotlights_continents`
                            ].some((item) => item.continent_id == id),
                          })}
                        />
                        {name} (+{" "}
                        {`${currency?.symbol}${Number(
                          spotlight_price *
                            currencyRates[currency?.currency_code]
                        ).toFixed(2)}`}
                        )
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
