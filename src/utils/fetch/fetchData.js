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

export const getOneAdvert = async (setData, setLoading, id, url) => {
  try {
    const { data } = await axios.get(`${SERVER_BASE_URL}/${url}/${id}`, {
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
    const { data } = await axios.get(`${SERVER_BASE_URL}/${url}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
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

export const checkCategorySubscription = async (
  subscription,
  categoryToCheck,
  setHasActiveSubscription,
  setHasActiveSubscriptionData
) => {
  const userSubscriptions = await subscription;
  // Check if the user has an active subscription in the specified category
  const foundSubscription = userSubscriptions.find((subscription) => {
    return subscription.subscription_plan?.category_id == categoryToCheck;
  });
  if (setHasActiveSubscriptionData) {
    setHasActiveSubscriptionData(foundSubscription);
  }
  setHasActiveSubscription(foundSubscription !== undefined);
};
