import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/Routes";
import SignOut from "../signout/Signout";

const ProtectedNavbar = () => {
  return (
    <ul>
      <li>
        <Link to={ROUTES.LANDING}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.ADD_FIELD}>Add Field</Link>
      </li>
      <li>
        <Link to={ROUTES.TRACTOR}>Tractor</Link>
      </li>
      <li>
        <Link to={ROUTES.LABOUR}>Labour</Link>
      </li>
      <li>
        <SignOut />
      </li>
    </ul>
  );
};

export default ProtectedNavbar;
