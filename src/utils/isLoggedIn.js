export function isUserLoggedIn() {
  return localStorage.getItem("token");
}
