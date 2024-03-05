import axios from "axios";
import { SERVER_BASE_URL } from "..";

const token = localStorage.getItem("token");

export const getUserData = async (user, dispatch) => {
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
