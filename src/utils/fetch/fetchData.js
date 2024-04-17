import axios from "axios";
import { SERVER_BASE_URL } from "../..";
import { displayErrorMessages } from "../displayErrors";

export const getAdvert = async (setData, setLoading) => {
  try {
    const { data } = await axios.get(`${SERVER_BASE_URL}/advert`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setData(data.data);
  } catch (error) {
    console.log(error);
  } finally {
    if (setLoading) {
      setLoading(false);
    } else {
      return;
    }
  }
};

export const getOneAdvert = async (setData, id, url, setLoading) => {
  try {
    const { data } = await axios.get(`${SERVER_BASE_URL}/${url}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setData(data.data);
  } catch (error) {
    console.log(error);
  } finally {
    if (setLoading) {
      setLoading(false);
    } else {
      return;
    }
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
  } catch (error) {
    console.log(error);
  } finally {
    if (setLoading) {
      setLoading(false);
    } else {
      return;
    }
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
  } catch (error) {
    console.log(error);
  } finally {
    if (setLoading) {
      setLoading(false);
    } else {
      return;
    }
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

export const getPackages = async (setPackages, seller_type, setLoading) => {
  try {
    const { data } = await axios.get(
      `${SERVER_BASE_URL}/advert-packages?advert_for=${seller_type}`
    );

    setPackages(data.data);
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    if (error.response && error.response.data && error.response.data.errors) {
      displayErrorMessages(error.response.data.errors);
    } else {
      console.error("Error response structure is unexpected:", error.response);
    }
  } finally {
    if (setLoading) {
      setLoading(false);
    } else {
      return;
    }
  }
};
