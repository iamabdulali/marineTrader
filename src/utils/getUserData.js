import axios from "axios";
import { SERVER_BASE_URL } from "..";

export const getUserData = async (user, dispatch, token) => {
  if (token) {
    try {
      const { data } = await axios.get(`${SERVER_BASE_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      dispatch({ type: "SET_USER", payload: data.data });
    } catch (error) {
      console.error("An unexpected error occurred:", error);
    }
  } else {
    console.error("Token Not Found");
  }
};
