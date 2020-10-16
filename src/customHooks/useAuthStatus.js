import { useEffect, useContext, useState } from "react";

import FirebaseContext from "../context/firebaseContext";

export const useAuthStatus = () => {
  const firebaseContext = useContext(FirebaseContext);
  const [authInfo, setAuthInfo] = useState();
  useEffect(() => {
    const auth = firebaseContext.auth();
    auth.onAuthStateChanged((authUser) => {
      setAuthInfo(authUser);
    });
  }, []);
  return authInfo;
};
