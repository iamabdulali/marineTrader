import axios from "axios";
import { SERVER_BASE_URL } from "../..";

export const getAdvert = async (setData, setLoading) => {
  try {
    const { data } = await axios.get(`${SERVER_BASE_URL}/advert`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(data.data);
    setData(data.data);
    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(true);
  }
};

export const fetchOptions = async (url, setData) => {
  try {
    const { data } = await axios.get(`${SERVER_BASE_URL}/${url}`);
    setData(data.data);
  } catch (error) {
    console.log(error);
  }
};
