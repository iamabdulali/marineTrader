import { toast } from "react-toastify";

export const handlePackageUpgrade = (values, setFieldValue) => {
  const currentPackage = values.advert_package || 0; // Default to 0 if advert_package is not set
  const updatedPackage = currentPackage + 1;
  const nextPackage = updatedPackage >= 3 ? 3 : updatedPackage;
  const upgradedFrom1To2 = currentPackage === 1 && nextPackage === 2;
  const upgradedFrom2To3 = currentPackage === 2 && nextPackage === 3;
  setFieldValue("advert_package", nextPackage);
  if (upgradedFrom1To2 || upgradedFrom2To3) {
    toast.success("Advert Upgraded");
  }
};
