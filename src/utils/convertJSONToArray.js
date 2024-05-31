export function convertJSONToArray(arrayOfObjects, propertyName) {
  if (
    arrayOfObjects.hasOwnProperty(propertyName) &&
    Array.isArray(arrayOfObjects[propertyName])
  ) {
    arrayOfObjects[propertyName] =
      propertyName === "service_hours"
        ? JSON.stringify(arrayOfObjects[propertyName])
        : arrayOfObjects[propertyName].map((property) => property.name);
  }
}
