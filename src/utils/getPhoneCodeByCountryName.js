export function getPhoneCodeByCountryName(countries, countryName) {
  const country = countries.find((country) => country.id == countryName);
  return country ? country?.phone_code : null;
}
