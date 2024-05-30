export function getPhoneCodeByCountryName(countries, countryName) {
  const country = countries.find((country) => country.id == countryName);
  console.log(countryName);
  return country ? country?.phone_code : null;
}
