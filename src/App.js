import React, { useEffect, useState } from "react";
import "./App.css";
import RoutesPage from "./Routes";
import Firebase from "./firebase/Firebase";

const App = () => {
  const [authUser, setAuthUser] = useState();
  useEffect(() => {
    Firebase.auth().onAuthStateChanged((user) => {
      setAuthUser(user);
      localStorage.setItem("uid", user.uid);
      console.log("from app.js", user);
    });
  }, []);
  return <RoutesPage authUser={authUser} />;
};

export default App;
