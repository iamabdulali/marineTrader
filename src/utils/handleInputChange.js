export const handleInputChange = (
  e,
  dropdownName,
  dropdownOptions,
  changeFor,
  isEditMode,
  setFieldValue,
  useName
) => {
  const { name, value } = e.target;

  console.log({ name, value });
  if (isEditMode) {
    if (name == dropdownName) {
      const selectedCurrency = dropdownOptions.find((c) =>
        useName ? c.name == value : c.id == parseInt(value)
      );
      if (selectedCurrency) {
        setFieldValue(
          `${changeFor}.${dropdownName}`,
          useName ? selectedCurrency?.name : selectedCurrency?.id
        );
      } else {
        console.error(`Selected ${dropdownName} not found`);
      }
    } else {
      console.log("OK");
      setFieldValue(`${changeFor}.${name}`, value);
    }
  } else {
    setFieldValue(`${name}`, value);
  }
};
