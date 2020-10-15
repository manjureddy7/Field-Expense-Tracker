import React, { useContext, useState, useEffect } from "react";
import UnProtectedNavbar from "./UnProtectedNavbar";
import ProtectedNavbar from "./ProtectedNavbar";

import AuthUserContext from "../../context/userContext";

const Navbar = () => {
  const [uid, setUid] = useState("");
  const userId = localStorage.getItem("uid");
  useEffect(() => {
    setUid(userId);
  }, [userId]);
  const authUser = useContext(AuthUserContext);
  console.log("FROM NAVBAR AUTH USER IS", authUser);

  console.log("uid from navbar is", uid);
  return (
    <div className="navbar">
      {uid || authUser ? <ProtectedNavbar /> : <UnProtectedNavbar />}
    </div>
  );
};

export default Navbar;
