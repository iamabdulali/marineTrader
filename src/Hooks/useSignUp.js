import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import axios from "axios";

export const useSignup = () => {
  const { dispatch } = useAuthContext();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const signup = async (
    name,
    email,
    buildingNumber,
    streetName,
    city,
    postcode,
    country,
    phoneNo,
    timeZone,
    password,
    sellerType,
    imageField
  ) => {
    setIsLoading(true);
    setError(null);

    const response = await fetch(
      "https://marine.takhleeqsoft.com/public/api/register",
      {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          buildingNumber,
          streetName,
          city,
          postcode,
          country,
          phoneNo,
          timeZone,
          password,
          sellerType,
          imageField,
        }),
      }
    );

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      localStorage.setItem("user", JSON.stringify(json));
      dispatch({ typeof: "LOGIN", payload: JSON });
    }

    // const response = .....

    // localStorage.setItem('user', JSON.stringify())

    // dispatch({typeof:'LOGIN', payload:JSON})
  };
  return { signup, error };
};
