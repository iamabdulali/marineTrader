import React, { useState, useEffect } from "react";
import axios from "axios";
import { ErrorMessage, Field, useFormikContext } from "formik";

const GooglePlaces = () => {
  const { values, setFieldValue } = useFormikContext();
  const [input, setInput] = useState("");
  const [places, setPlaces] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  let debounceTimer;

  useEffect(() => {
    const fetchPlaces = async () => {
      const response = await axios.get(
        `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&key=AIzaSyDpZkgmNpUUE_AfU7-3WM-ExBSH7yb39AI`
      );
      setPlaces(response.data.predictions);
    };

    clearTimeout(debounceTimer);
    if (input !== "") {
      debounceTimer = setTimeout(() => {
        fetchPlaces();
        setIsOpen(true);
      }, 1000);
    } else {
      setIsOpen(false); // Close the menu if input is empty
    }

    return () => clearTimeout(debounceTimer);
  }, [input, isOpen]);

  const handleChange = (event) => {
    setInput(event.target.value);
    setFieldValue(`city`, event.target.value);
  };

  const handleItemClick = (placeName) => {
    setInput(placeName);
    setIsOpen(false); // Close the menu when an item is clicked
    setFieldValue(`city`, placeName);
  };

  return (
    <div className="relative">
      <Field
        type="text"
        name="city"
        value={input}
        onChange={handleChange}
        placeholder="City/Town"
        className="border-[#CECED7] border-2 rounded-md p-3 w-full"
      />
      <ErrorMessage
        name="city"
        component="p"
        className="text-red-500 mt-1 ml-2"
      />
      {isOpen && (
        <ul className="absolute z-10 bg-white shadow-md rounded-md w-full">
          {places.map((place, index) => (
            <li
              key={index}
              onClick={() => handleItemClick(place.description)}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100"
            >
              {place.description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default GooglePlaces;
