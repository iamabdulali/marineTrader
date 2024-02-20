import React, { useContext, useState } from "react";
import CheckboxGroup from "../../CheckboxGroup";
import { FaTrash } from "react-icons/fa";
import { AuthContext } from "../../../Context/AuthContext";

const Step1 = ({ showSpotlightSelection, setFieldValue, values }) => {
  const { bundleName } = useContext(AuthContext);

  const initialData = {
    countries: {
      "United Kingdom ( + £9.99)": { selected: false, price: 9.99 },
      "Netherlands ( + £6.99)": { selected: false, price: 6.99 },
      "Switzerland ( + £6.99)": { selected: false, price: 6.99 },
      "Russia ( + £6.99)": { selected: false, price: 6.99 },
      "France ( + £6.99)": { selected: false, price: 6.99 },
      "Poland ( + £6.99)": { selected: false, price: 6.99 },
      "Luxembourg ( + £6.99)": { selected: false, price: 6.99 },
      "Brazil ( + £6.99)": { selected: false, price: 6.99 },
      "Germany ( + £6.99)": { selected: false, price: 6.99 },
      "Austria ( + £6.99)": { selected: false, price: 6.99 },
      "Canada ( + £6.99)": { selected: false, price: 6.99 },
      "Portugal ( + £6.99)": { selected: false, price: 6.99 },
      "Spain ( + £6.99)": { selected: false, price: 6.99 },
      "New Zealand ( + £6.99)": { selected: false, price: 6.99 },
      "America ( + £6.99)": { selected: false, price: 6.99 },
      "Mexico ( + £6.99)": { selected: false, price: 6.99 },
      "Belgium ( + £6.99)": { selected: false, price: 6.99 },
      "Hungary ( + £6.99)": { selected: false, price: 6.99 },
      "Australia ( + £6.99)": { selected: false, price: 6.99 },
      "China ( + £6.99)": { selected: false, price: 6.99 },
      "Sweden ( + £6.99)": { selected: false, price: 6.99 },
      "Norway ( + £6.99)": { selected: false, price: 6.99 },
      // Add more countries with their respective prices as needed
    },
    continents: {
      "North America ( + £89.99)": { selected: false, price: 89.99 },
      "South America ( + £89.99)": { selected: false, price: 89.99 },
      "Europe ( + £89.99)": { selected: false, price: 89.99 },
      "Antarctica ( + £89.99)": { selected: false, price: 89.99 },
      "Australia ( + £89.99)": { selected: false, price: 89.99 },
      "Africa ( + £89.99)": { selected: false, price: 89.99 },
      "Asia ( + £89.99)": { selected: false, price: 89.99 },
    },
  };

  const [selectedCountries, setSelectedCountries] = useState(
    initialData.countries
  );
  const [selectedContinents, setSelectedContinents] = useState(
    initialData.continents
  );

  const calculateTotal = (selectedItems) => {
    let total = 0;
    for (const item in selectedItems) {
      if (selectedItems[item].selected) {
        total += selectedItems[item].price;
      }
    }
    return total;
  };

  const handleCountryChange = (item) => {
    setSelectedCountries((prevCountries) => ({
      ...prevCountries,
      [item]: {
        ...prevCountries[item],
        selected: !prevCountries[item].selected,
      },
    }));
  };

  const handleContinentChange = (item) => {
    setSelectedContinents((prevContinents) => ({
      ...prevContinents,
      [item]: {
        ...prevContinents[item],
        selected: !prevContinents[item].selected,
      },
    }));
  };

  const removeCountry = (item) => {
    setSelectedCountries((prevCountries) => ({
      ...prevCountries,
      [item]: {
        ...prevCountries[item],
        selected: !prevCountries[item].selected,
      },
    }));
  };

  const renderSelectedCountriesTable = () => {
    const selectedCountriesArray = Object.entries(selectedCountries)
      .filter(([_, data]) => data.selected)
      .map(([country, data]) => (
        <tr key={country} className=" text-[#11133D]">
          <td className="py-2 px-4 font-semibold">{country}</td>
          <td className="py-2 px-4 font-semibold">£{data.price.toFixed(2)}</td>
          <td className="py-2 px-4 font-semibold">
            <button
              className=" text-[#FC4040] flex items-center gap-3 px-3 py-1 rounded"
              onClick={() => removeCountry(country)}
            >
              <FaTrash /> Remove
            </button>
          </td>
        </tr>
      ));

    if (selectedCountriesArray.length === 0) {
      return <p className="px-8">No countries selected.</p>;
    }

    return (
      <div className="sm:px-8 px-5">
        <div className="text-[#0D1A8B] smallLg:text-xl text-base font-bold flex justify-between ">
          <p>Your SpotLight Selections</p>
          <p className="uppercase">
            Total: £{calculateTotal(selectedCountries).toFixed(2)}
          </p>
        </div>
        <table className="w-full sm:text-base text-sm text-left bg-[#f9f9f9] border-collapse border border-[#D8D8D8] mt-4">
          <thead>
            <tr className="text-[#8891B2] border-b-2">
              <th className="py-2 px-4 font-medium">Countries</th>
              <th className="py-2 px-4 font-medium">Price</th>
              <th className="py-2 px-4 font-medium">Action</th>
            </tr>
          </thead>
          <tbody>{selectedCountriesArray}</tbody>
        </table>
      </div>
    );
  };
  return (
    <>
      <div className="py-5 ">
        {showSpotlightSelection ? (
          renderSelectedCountriesTable()
        ) : (
          <div className="py-5">
            {}
            <div className="text-[#0D1A8B] smallLg:text-xl text-base font-bold flex justify-between sm:px-8 px-5">
              <p className="pr-3">Select Countries From The List:</p>
              <p className="uppercase">
                <span className="sm:inline-block hidden">Total:</span> £
                {calculateTotal(selectedCountries).toFixed(2)}
              </p>
            </div>
            <div className="sm:px-8 px-5">
              <CheckboxGroup
                setFieldValue={setFieldValue}
                values={values}
                className="grid smallLg:grid-cols-4 sm:grid-cols-2 gap-5"
                facilities={selectedCountries}
                name="countries"
                checkedProp={true}
                onChangeProp={handleCountryChange}
              />

              <div className="text-[#0D1A8B] smallLg:text-xl text-base font-bold mt-12">
                <p>Select Continents From The List:</p>
              </div>
              <CheckboxGroup
                className="grid smallLg:grid-cols-4 sm:grid-cols-2 gap-5"
                facilities={selectedContinents}
                name="continents"
                onChange={handleContinentChange}
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Step1;
