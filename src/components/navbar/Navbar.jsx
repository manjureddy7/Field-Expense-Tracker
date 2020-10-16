import React, {useState} from "react";
import UnProtectedNavbar from "./UnProtectedNavbar";
import ProtectedNavbar from "./ProtectedNavbar";
import { useFirebase } from '../../context/FirebaseContext';


const Navbar = () => {
 const { authState } = useFirebase();
 console.log("FROM NAVBAR AUTH STATE IS----", authState)

  // Toggle navbar based on auth state
  return (
    <div className="navbar">
      {authState ? <ProtectedNavbar /> : <UnProtectedNavbar />}
    </div>
  );
};

export default Navbar;
