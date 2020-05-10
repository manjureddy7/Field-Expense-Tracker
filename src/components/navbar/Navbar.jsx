import React, { useContext } from "react";
import UnProtectedNavbar from "./UnProtectedNavbar";
import ProtectedNavbar from "./ProtectedNavbar";

import AuthUserContext from "../../context/userContext";

const Navbar = () => {
  const authUser = useContext(AuthUserContext);
  console.log("FROM NAVBAR AUTH USER IS", authUser);

  const uid = localStorage.getItem("uid");
  return (
    <div className="navbar">
      {authUser ? <ProtectedNavbar /> : <UnProtectedNavbar />}
    </div>
  );
};

export default Navbar;
