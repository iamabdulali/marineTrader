import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useSignup = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const signup = async (
    username,
    companyInfo,
    buildingNumber,
    streetName,
    city,
    postcode,
    country,
    region,
    phoneNo,
    currency,
    email,
    confirmEmail,
    password,
    confirmPassword,
    timeZone,
    daysAvailable,
    openPublicHolidays,
    companyLogo,
    mainPicture,
    firstName,
    lastName,
    jobTitle
  ) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      "https://marine.takhleeqsoft.com/public/api/register",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          companyInfo,
          buildingNumber,
          streetName,
          city,
          postcode,
          country,
          region,
          phoneNo,
          currency,
          email,
          confirmEmail,
          password,
          confirmPassword,
          timeZone,
          // daysAvailable,
          openPublicHolidays,
          companyLogo,
          mainPicture,
          firstName,
          lastName,
          jobTitle,
        }),
      }
    );

    const json = await response.json();
    console.log(json);

    if (!response.ok) {
      setError(json.error);
      console.log("ErrriE");
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ typeof: "LOGIN", payload: JSON });
      console.log("HEHHE");
    }

    // const response = .....

    // localStorage.setItem('user', JSON.stringify())

    // dispatch({typeof:'LOGIN', payload:JSON})
  };
  return { signup, error };
};
