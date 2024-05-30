import { ErrorMessage, useFormikContext } from "formik";
import React, { useEffect, useRef, useState } from "react";

let autoComplete;

const PlaceApi = () => {
  const { values, setFieldValue } = useFormikContext();
  const [query, setQuery] = useState("");
  const autoCompleteRef = useRef(null);

  const handleScriptLoad = (updateQuery, autoCompleteRef) => {
    autoComplete = new window.google.maps.places.Autocomplete(
      autoCompleteRef.current
    );

    autoComplete.addListener("place_changed", () => {
      handlePlaceSelect(updateQuery);
    });
  };

  const handlePlaceSelect = async (updateQuery) => {
    try {
      const addressObject = await autoComplete.getPlace();

      const query = addressObject.formatted_address;
      updateQuery(query);
      setFieldValue("city", query);
      console.log({ query });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleScriptLoad(setQuery, autoCompleteRef);
  }, []);

  return (
    <div className="search-location-input">
      <input
        ref={autoCompleteRef}
        className="w-full border-2 p-[.75em] rounded-md border-[#CECED7]"
        onChange={(event) => {
          setQuery(event.target.value);
          setFieldValue("city", event.target.value);
        }}
        placeholder="Search Places ..."
        value={query}
      />
      <ErrorMessage component="span" name="city" className="text-red-500" />
    </div>
  );
};

export default PlaceApi;
