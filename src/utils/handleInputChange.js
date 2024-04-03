export const handleInputChange = (
  e,
  dropdownName,
  dropdownOptions,
  changeFor,
  isEditMode,
  setFieldValue
) => {
  const { name, value } = e.target;
  if (isEditMode) {
    console.log(name, value);
    if (name == dropdownName) {
      const selectedCurrency = dropdownOptions.find(
        (c) => c.id === parseInt(value)
      );
      if (selectedCurrency) {
        setFieldValue(`${changeFor}.${dropdownName}`, selectedCurrency?.id);
      } else {
        console.error(`Selected ${dropdownName} not found`);
      }
    } else {
      setFieldValue(`${changeFor}.${name}`, value);
    }
  } else {
    setFieldValue(`${name}`, value);
  }
  console.log(value, name);
};
