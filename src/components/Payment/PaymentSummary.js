import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import axios from "axios";
import { SERVER_BASE_URL, advertPackages } from "../..";
import { toast } from "react-toastify";
import { fetchOptions } from "../../utils/fetch/fetchData";

const PaymentSummary = ({
  advert,
  subscription,
  id,
  isSubscriptionPage,
  packages,
  isBundleSelected,
  bundles,
  spotlights,
  hasSubscription,
  hasBundle,
  isAdvertUpgrade,
  categoryCountrySpotlights,
  categoryContinentSpotlights,
  homeCountrySpotlights,
  homeContinentSpotlights,
}) => {
  const { user, currencyRates } = useContext(AuthContext);
  const [hasFeaturedBundle, setHasFeaturedBundle] = useState(0);
  const [hasPremiumBundle, setHasPremiumBundle] = useState(0);
  const { currency } = Object(user);
  const [coupenCode, setCoupenCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const { advert_package_id } = Object(advert);

  useEffect(() => {
    fetchOptions(`bundle/advert/remains?type=featured`, setHasFeaturedBundle);
    fetchOptions(`bundle/advert/remains?type=premium`, setHasPremiumBundle);
  }, []);

  const filteredSubscriptions = subscription
    ? subscription.filter((sub) => sub?.id == id)
    : [];

  const { name, amount } = Object(filteredSubscriptions[0] || {});

  let upgradedPackage = 0;

  if (isAdvertUpgrade) {
    upgradedPackage = 1;
  }

  const filteredPackages = packages
    ? packages.filter(
        (ad) =>
          ad?.specificity_order == Number(advert_package_id) + upgradedPackage
      )
    : [];

  let { name: packageName, amount: packageAmount } = Object(
    filteredPackages[0] || {}
  );

  const currentPackage = packages
    ? packages.filter(
        (ad) => ad?.specificity_order == Number(advert_package_id)
      )
    : [];

  let { name: currentPackageName, amount: currentPackageAmount } = Object(
    currentPackage[0] || {}
  );

  const filteredBundles = bundles
    ? bundles?.filter((bundle) => bundle?.id == isBundleSelected)
    : [];

  const { name: bundleName, amount: bundleAmount } = Object(
    filteredBundles[0] || {}
  );

  const [totalAmount, setTotalAmount] = useState(0);

  if (isAdvertUpgrade) {
    if (advertPackages[advert_package_id] == "Premium") {
      if (hasSubscription != 0) packageAmount = 0;
    } else if (advertPackages[advert_package_id] == "Standard") {
      if (hasSubscription != 0) packageAmount = 0;
    }
  }

  let subtotal =
    (Number(amount) || 0) +
    (Number(bundleAmount) || 0) +
    (Number(packageAmount) || 0) +
    (Number(spotlights) || 0);

  if (!isSubscriptionPage) {
    if (
      isAdvertUpgrade &&
      subtotal != 0 &&
      hasBundle == 0 &&
      !isBundleSelected
    ) {
      subtotal = subtotal - currentPackageAmount;
    }

    if (isBundleSelected) {
      subtotal = subtotal - Number(packageAmount);
    }
  }

  let tax = subtotal * 0.2;

  useEffect(() => {
    setTotalAmount(subtotal + tax);
  }, [subtotal]);

  const handleCoupenDiscount = async () => {
    try {
      if (couponApplied) {
        toast.error("Coupon already applied");
        return;
      }

      const { data } = await axios.get(
        `${SERVER_BASE_URL}/coupon-discount?coupon_code=${coupenCode}&apply_on=${
          isSubscriptionPage ? "subscription" : "advert"
        }`
      );
      if (data.data.length === 0) {
        toast.error("Invalid Coupon Code");
      } else {
        toast.success(`Total Discount ${data.data.total_discount}%`);
        const discountPercentage = Number(data.data.total_discount);
        const discountAmount = totalAmount * (discountPercentage / 100);
        const amountAfterDiscount = totalAmount - discountAmount;
        setTotalAmount(amountAfterDiscount);
        setCouponApplied(true); // Mark coupon as applied
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderItems = (items, heading) => {
    if (items?.length === 0 || !spotlights) return null;

    return (
      <div>
        <p className="text-[#0D1A8B] font-semibold mt-2">{heading}</p>
        {items?.map(({ name, spotlight_price, country, id }) => (
          <div key={id} className="flex items-center justify-between mt-2">
            <p className="text-[#696E9D]">{name}:</p>
            <p className="text-[#11133D] font-semibold">{`${
              currency?.symbol
            }${Number(
              spotlight_price * currencyRates[currency?.currency_code]
            ).toFixed(2)}`}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white shadow-[7px] rounded-md p-6 mt-6 w-full">
      <p className="text-[#11133D] font-semibold text-xl">Summary</p>
      <div className="mt-4 sm:text-base text-sm">
        {isSubscriptionPage == "subscription" ? (
          <>
            {" "}
            <div className=" flex items-center justify-between">
              <p className="text-[#696E9D]">Subscription:</p>
              <p className="text-[#11133D] font-semibold">{name}</p>
            </div>
            <div className=" flex items-center justify-between mt-2">
              <p className="text-[#696E9D]">Price:</p>
              <p className="text-[#11133D] font-semibold">
                {`${currency?.symbol}${Number(
                  amount * currencyRates[currency?.currency_code]
                ).toFixed(2)}`}
              </p>
            </div>
            {isBundleSelected ? (
              <>
                {" "}
                <p className="text-[#0D1A8B] font-semibold mt-2">Bundle</p>
                <div className=" flex items-center justify-between mt-2">
                  <p className="text-[#696E9D]"> {bundleName}:</p>
                  <p className="text-[#11133D] font-semibold">
                    {" "}
                    {`${currency?.symbol}${Number(
                      bundleAmount * currencyRates[currency?.currency_code]
                    ).toFixed(2)}`}
                  </p>
                </div>
              </>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}

        {isSubscriptionPage !== "subscription" ? (
          <>
            {hasBundle == 0 && hasSubscription == 0 && !isAdvertUpgrade ? (
              <>
                <div className=" flex items-center justify-between mt-2">
                  <p className="text-[#696E9D]">{packageName}:</p>
                  <p className="text-[#11133D] font-semibold">
                    {`${currency?.symbol}${Number(
                      packageAmount * currencyRates[currency?.currency_code]
                    ).toFixed(2)}`}
                  </p>
                </div>
              </>
            ) : hasBundle == 0 && hasSubscription == 0 && isAdvertUpgrade ? (
              <>
                <div className=" flex items-center justify-between mt-2">
                  <p className="text-[#696E9D]">
                    Current Package: {currentPackageName}
                  </p>
                  <p className="text-[#11133D] font-semibold">
                    {`${currency?.symbol}${Number(
                      currentPackageAmount *
                        currencyRates[currency?.currency_code]
                    ).toFixed(2)}`}
                  </p>
                </div>
                <div className=" flex items-center justify-between mt-2">
                  <p className="text-[#696E9D]">Upgrading To: {packageName}</p>
                  <p className="text-[#11133D] font-semibold">
                    {`${currency?.symbol}${Number(
                      packageAmount * currencyRates[currency?.currency_code]
                    ).toFixed(2)}`}
                  </p>
                </div>
              </>
            ) : isAdvertUpgrade ? (
              <>
                <div className=" flex items-center justify-between mt-2">
                  <p className="text-[#696E9D]">
                    Current Package: {currentPackageName}
                  </p>
                  {advertPackages[advert_package_id] == "Standard" ? (
                    <p className="text-[#11133D] font-semibold">
                      {`${currency?.symbol}${Number(
                        currentPackageAmount *
                          currencyRates[currency?.currency_code]
                      ).toFixed(2)}`}
                    </p>
                  ) : (
                    <p className="text-[#11133D] font-semibold">
                      Bundle/Subscription
                    </p>
                  )}
                </div>
                <div className=" flex items-center justify-between mt-2">
                  <p className="text-[#696E9D]">Upgrading To: {packageName}</p>
                  {hasFeaturedBundle == 0 &&
                  advertPackages[advert_package_id] == "Premium" ? (
                    <p className="text-[#11133D] font-semibold">
                      {`${currency?.symbol}${Number(
                        packageAmount * currencyRates[currency?.currency_code]
                      ).toFixed(2)}`}
                    </p>
                  ) : (
                    <p className="text-[#11133D] font-semibold">
                      Bundle/Subscription
                    </p>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className=" flex items-center justify-between mt-2">
                  <p className="text-[#696E9D]">{packageName}:</p>
                  <p className="text-[#11133D] font-semibold">
                    {advertPackages[advert_package_id] == "Premium"
                      ? "Bundle/Subscription"
                      : `${currency?.symbol}${Number(
                          packageAmount * currencyRates[currency?.currency_code]
                        ).toFixed(2)}`}
                  </p>
                </div>
              </>
            )}

            {renderItems(homeCountrySpotlights, "Home Country Spotlights")}
            {renderItems(homeContinentSpotlights, "Home Continent Spotlights")}
            {renderItems(
              categoryCountrySpotlights,
              "Category Country Spotlights"
            )}
            {renderItems(
              categoryContinentSpotlights,
              "Category Continent Spotlights"
            )}

            {spotlights ? (
              <>
                <p className="text-[#0D1A8B] font-semibold mt-2">
                  Total Spotlight Amount
                </p>
                <div className=" flex items-center justify-between mt-2">
                  <p className="text-[#696E9D]">Spotlights:</p>
                  <p className="text-[#11133D] font-semibold">
                    {`${currency?.symbol}${Number(
                      spotlights * currencyRates[currency?.currency_code]
                    ).toFixed(2)}`}
                  </p>
                </div>
              </>
            ) : (
              ""
            )}
          </>
        ) : (
          ""
        )}

        {isBundleSelected && isSubscriptionPage != "subscription" ? (
          <>
            <p className="text-[#0D1A8B] font-semibold mt-2">Bundle</p>
            <div className=" flex items-center justify-between mt-2">
              <p className="text-[#696E9D]"> {bundleName}:</p>
              <p className="text-[#11133D] font-semibold">
                {" "}
                {`${currency?.symbol}${Number(
                  bundleAmount * currencyRates[currency?.currency_code]
                ).toFixed(2)}`}
              </p>
            </div>
          </>
        ) : (
          ""
        )}

        <div className="mt-6 relative">
          <input
            type="text"
            className="uppercase w-full border-[#8891B2] text-[#8891b2] border-2 py-4 rounded-md px-3"
            placeholder="Promo Code"
            value={coupenCode}
            onChange={(e) => setCoupenCode(e.target.value)}
          />
          <button
            onClick={handleCoupenDiscount}
            className="text-white bg-[#0D1A8B] hover:bg-[#0a1dbd] py-2 rounded-md px-6 font-semibold top-1/2 -translate-y-1/2 absolute right-3"
          >
            Apply
          </button>
        </div>
        <div className="border-[#E8E8E8] border-y-2 py-3 mt-7">
          <div className=" flex items-center justify-between mt-2">
            <p className="text-[#696E9D]">SubTotal:</p>
            <p className="text-[#11133D] font-semibold">{`${
              currency?.symbol
            }${Number(
              subtotal * currencyRates[currency?.currency_code]
            ).toFixed(2)}`}</p>
          </div>
          <div className=" flex items-center justify-between mt-2">
            <p className="text-[#696E9D]">Tax:</p>
            <p className="text-[#11133D] font-semibold">{`${
              currency?.symbol
            }${Number(tax * currencyRates[currency?.currency_code]).toFixed(
              2
            )}`}</p>
          </div>
        </div>
        <div className=" flex items-center justify-between mt-4">
          <p className="text-[#11133D] font-semibold">Total:</p>
          <p className="text-[#11133D] font-semibold">{`${
            currency?.symbol
          }${Number(
            totalAmount * currencyRates[currency?.currency_code]
          ).toFixed(2)}`}</p>
        </div>
      </div>
    </div>
  );
};

export default PaymentSummary;
