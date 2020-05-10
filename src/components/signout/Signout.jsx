import React from "react";
import firebase from "../../firebase/Firebase";

const SignOut = () => {
  const handleSubmit = () => {
    const auth = firebase.auth();
    auth.signOut();
    localStorage.removeItem("uid");
  };
  return (
    <div>
      <button onClick={handleSubmit}>SignOut</button>
    </div>
  );
};

export default SignOut;
