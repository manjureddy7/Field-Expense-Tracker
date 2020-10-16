import React from "react";
import { useFirebase } from "../../context/FirebaseContext";

const SignOut = () => {
  const { signOut } = useFirebase();
  const handleSignout = () => {
    localStorage.removeItem("uid");
    signOut();
  }
  return (
    <div>
      <button className="signout-btn" onClick={handleSignout}>SignOut</button>
    </div>
  );
};

export default SignOut;
