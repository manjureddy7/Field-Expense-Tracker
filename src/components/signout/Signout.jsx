import React from "react";
import { useFirebase } from "../../context/FirebaseContext";

const SignOut = () => {
  const { signOut } = useFirebase();
  return (
    <div>
      <button onClick={signOut}>SignOut</button>
    </div>
  );
};

export default SignOut;
