import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const logout = () => {
    const { dispatch } = useAuthContext();
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
