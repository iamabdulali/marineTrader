import React, { useEffect, useState } from "react";
import {
  APILoader,
  PlacePicker,
} from "@googlemaps/extended-component-library/react";
import { ErrorMessage, Field, useFormikContext } from "formik";

const handlePlaceChange = (e, setFieldValue) => {
  e.srcElement.autocomplete.promise
    .then((result) => {
      let formattedPrediction;
      if (result.gm_accessors_.place.Fs) {
        formattedPrediction = result.gm_accessors_.place.Fs.formattedPrediction;
      } else if (result.gm_accessors_.place.Gs) {
        formattedPrediction = result.gm_accessors_.place.Gs.formattedPrediction;
      }

      if (formattedPrediction) {
        setFieldValue("city", formattedPrediction);
        setFieldValue("user.city", formattedPrediction);
      } else {
        console.error("No formatted prediction found.");
      }
    })
    .catch((error) => {
      console.error("Promise Error:", error);
    });
};

const PlaceApi = ({ isEditProfile, existingCityValue }) => {
  const { values, setFieldValue } = useFormikContext();
  const [place, setPlace] = useState("");

  const handleRequestError = (e) => {
    console.log(e);
  };

  useEffect(() => {
    try {
      const placeInput =
        document.querySelector("gmpx-place-picker").shadowRoot?.children[1]
          ?.children[0];

      const removePlaceBtn =
        document.querySelector("gmpx-place-picker").shadowRoot?.children[1]
          ?.children[1].children[1];

      const handleInputBlur = () => {
        if (placeInput.value.trim() === "") {
          setFieldValue("city", "");
        }
      };

      if (isEditProfile) {
        placeInput.value = existingCityValue;
      }

      removePlaceBtn?.addEventListener("click", () => {
        setFieldValue("city", "");
      });

      placeInput?.addEventListener("change", (e) => {
        setFieldValue("city", e.target.value);
        setFieldValue("user.city", e.target.value);

        setPlace(e.target.value);
      });

      if (placeInput) {
        placeInput.style.border = "none";
        placeInput.style.fontFamily = "Poppins";

        placeInput.addEventListener("blur", handleInputBlur);

        // return () => {
        //   placeInput.removeEventListener("blur", handleInputBlur);
        // };
      }
    } catch (error) {
      console.log(error);
    }
  }, [values]);

  return (
    <>
      <APILoader apiKey="AIzaSyDpZkgmNpUUE_AfU7-3WM-ExBSH7yb39AI" />
      <PlacePicker
        className="border-[#CECED7] border-2 rounded-md  w-full"
        onPlaceChange={(e) => handlePlaceChange(e, setFieldValue)}
        onRequestError={handleRequestError}
        placeholder="Enter Your City"
        id="place-input"
      />
      <Field className="hidden" name="city" type="text" value={place} />
      <ErrorMessage className="text-red-500" name="city" component="span" />
    </>
  );
};

export default PlaceApi;
