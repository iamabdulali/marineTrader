import React, { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";

const PaymentSummary = ({
  advert,
  subscription,
  id,
  isSubscriptionPage,
  packages,
  isBundleSelected,
  bundles,
  spotlights,
}) => {
  const { user, currencyRates } = useContext(AuthContext);
  const { currency } = Object(user);

  const { advert_package_id } = Object(advert);

  console.log(advert_package_id);

  const filteredSubscriptions = subscription
    ? subscription.filter((sub) => sub?.id == id)
    : [];

  const filteredPackages = packages
    ? packages.filter((ad) => ad?.id == advert_package_id)
    : [];

  const filteredBundles = bundles
    ? bundles.filter((bundle) => bundle?.id == isBundleSelected)
    : [];

  const { name, amount } = Object(filteredSubscriptions[0] || {});

  const { name: packageName, amount: packageAmount } = Object(
    filteredPackages[0] || {}
  );

  const { name: bundleName, amount: bundleAmount } = Object(
    filteredBundles[0] || {}
  );

  console.log(spotlights);

  const subtotal =
    (Number(amount) || 0) +
    (Number(bundleAmount) || 0) +
    (Number(packageAmount) || 0) +
    (Number(spotlights) || 0);

  const tax = subtotal * 0.2;

  const totalAmount = subtotal + tax;

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

        {isSubscriptionPage != "subscription" ? (
          <>
            <p className="text-[#0D1A8B] font-semibold mt-2">Ad</p>
            <div className=" flex items-center justify-between mt-2">
              <p className="text-[#696E9D]">{packageName}:</p>
              <p className="text-[#11133D] font-semibold">
                {`${currency?.symbol}${Number(
                  packageAmount * currencyRates[currency?.currency_code]
                ).toFixed(2)}`}
              </p>
            </div>
            {spotlights ? (
              <div className=" flex items-center justify-between mt-2">
                <p className="text-[#696E9D]">Spotlights:</p>
                <p className="text-[#11133D] font-semibold">
                  {`${currency?.symbol}${Number(
                    spotlights * currencyRates[currency?.currency_code]
                  ).toFixed(2)}`}
                </p>
              </div>
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

        {console.log(isBundleSelected)}

        <div className="mt-6 relative">
          <input
            type="text"
            className="uppercase w-full border-[#8891B2] text-[#8891b2] border-2 py-4 rounded-md px-3"
            placeholder="Promo Code"
          />
          <button className="text-white bg-[#0D1A8B] hover:bg-[#0a1dbd] py-2 rounded-md px-6 font-semibold top-1/2 -translate-y-1/2 absolute right-3">
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
