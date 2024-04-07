import React, { useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { deleteIcon } from "../assets";
import { FaSignOutAlt } from "react-icons/fa";
import { GiPowerButton } from "react-icons/gi";

const SignOutModal = ({ onClick, setMenuState }) => {
  const { refresh, dispatch } = useContext(AuthContext);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    dispatch({ type: "LOGOUT" });
    setMenuState(false);
    onClick();
  };

  return (
    <div className="rounded-lg sd">
      <GiPowerButton color="#FC4040" className="mx-auto" size={40} />
      <p className="text-[#FC4040] font-semibold my-3 text-center">
        Logout Account
      </p>
      <p className="text-[#8891B2] w-2/3 mx-auto text-center">
        Are you sure you want to Log Out?{" "}
      </p>
      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={onClick}
          className="rounded-lg text-white bg-[#8891B2] hover:bg-[#a3aac4] py-3 w-full"
        >
          No
        </button>
        <button
          onClick={handleSignOut}
          className="rounded-lg text-white bg-[#FC4040] hover:bg-[#ff2626] py-3 w-full"
        >
          Yes
        </button>
      </div>
    </div>
  );
};

export default SignOutModal;
