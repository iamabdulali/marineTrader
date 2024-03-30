import { toast } from "react-toastify";

export const handlePackageUpgrade = (values, setFieldValue, sellerType) => {
  const currentPackage = values.advert_package || 0; // Default to 0 if advert_package is not set
  let maxPackage;
  if (sellerType === "private seller") {
    maxPackage = 3;
  } else if (sellerType === "trade seller") {
    maxPackage = 6;
  } else {
    // Default max package if sellerType is not recognized
    maxPackage = 3;
  }

  const updatedPackage = currentPackage + 1;
  const nextPackage = updatedPackage > maxPackage ? maxPackage : updatedPackage;

  setFieldValue("advert_package", nextPackage);

  // Show toast notification for every upgrade
  if (currentPackage < maxPackage && nextPackage <= maxPackage) {
    toast.success(`Advert Upgraded`);
  }
};
