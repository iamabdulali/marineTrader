import { toast } from "react-toastify";

export const handlePackageUpgrade = (values, setFieldValue) => {
  const currentPackage = values.advert_package || 0; // Default to 0 if advert_package is not set
  const maxPackage = 7; // Maximum package set to 3

  const updatedPackage = Number(currentPackage) + 1;
  const nextPackage = updatedPackage > maxPackage ? maxPackage : updatedPackage;

  setFieldValue("advert_package", updatedPackage);

  console.log(values.advert_package);
  // Show toast notification for every upgrade
  if (currentPackage < maxPackage && nextPackage <= maxPackage) {
    toast.success(`Advert Upgraded`);
  }
};
