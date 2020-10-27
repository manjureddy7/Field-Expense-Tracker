import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/Routes";

const UnProtectedNavbar = () => {
  return (
    <ul>
      <li>
        <Link to={ROUTES.SIGN_IN}>Signin</Link>
      </li>
      {/* <li>
        <Link to={ROUTES.SIGN_UP}>Signup</Link>
      </li> */}
    </ul>
  );
};

export default UnProtectedNavbar;
