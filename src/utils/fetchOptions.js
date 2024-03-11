import axios from "axios";
import { SERVER_BASE_URL } from "..";

export const fetchOptions = async (url, setData) => {
  try {
    const { data } = await axios.get(`${SERVER_BASE_URL}/${url}`);
    setData(data.data);
  } catch (error) {
    console.log(error);
  }
};
