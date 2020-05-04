import React from "react";
import { Link } from "react-router-dom";
import * as ROUTES from "../../constants/Routes";

const Navbar = () => {
  return (
    <div className="navbar">
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
          <Link to={ROUTES.PESTICIDES}>Pesticides</Link>
        </li>
        <li>
          <Link to={ROUTES.LABOUR}>Labour</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
