import React from "react";
import UnProtectedNavbar from "./UnProtectedNavbar";
import ProtectedNavbar from "./ProtectedNavbar";
import { useFirebase } from '../../context/FirebaseContext';


const Navbar = (props) => {
 const { user } = useFirebase();
  
  // Toggle navbar based on auth state
  return (
    <div className="navbar">
      {user ? <ProtectedNavbar /> : <UnProtectedNavbar />}
    </div>
  );
};

export default Navbar;
