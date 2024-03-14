import axios from "axios";
import { SERVER_BASE_URL } from "../..";

export const getAdvert = async (setData, setLoading) => {
  try {
    const { data } = await axios.get(`${SERVER_BASE_URL}/advert`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setData(data.data);
    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(true);
  }
};

export const getOneAdvert = async (setData, setLoading, id) => {
  try {
    const { data } = await axios.get(`${SERVER_BASE_URL}/advert/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setData(data.data);
    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(true);
  }
};

export const fetchOptions = async (url, setData, setLoading) => {
  try {
    const { data } = await axios.get(`${SERVER_BASE_URL}/${url}`);
    setData(data.data);
    if (setLoading) {
      setLoading(false);
    }
  } catch (error) {
    console.log(error);
  }
};

export const fetchOffers = async (setData, setLoading) => {
  try {
    const { data } = await axios.get(`${SERVER_BASE_URL}/offer`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setData(data.data);
    console.log(data.data);
    setLoading(false);
  } catch (error) {
    console.log(error);
  }
};
