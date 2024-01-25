import React, { useState } from "react";
import CheckboxGroup from "../../CheckboxGroup";

const Step1 = () => {
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

  return (
    <>
      <div className="py-5">
        <div className="text-[#0D1A8B] text-xl font-bold flex justify-between px-8">
          <p>Select Countries From The List:</p>
          <p className="uppercase">
            Total: £{calculateTotal(selectedCountries).toFixed(2)}
          </p>
        </div>
        <div className="px-8">
          <CheckboxGroup
            className="grid grid-cols-4 gap-5"
            facilities={selectedCountries}
            name="countries"
            checkedProp={true}
            onChangeProp={handleCountryChange}
          />

          <div className="text-[#0D1A8B] text-xl font-bold mt-12">
            <p>Select Continents From The List:</p>
          </div>
          <CheckboxGroup
            className="grid grid-cols-4 gap-5"
            facilities={selectedContinents}
            name="continents"
            onChange={handleContinentChange}
          />
        </div>
      </div>
    </>
  );
};

export default Step1;
