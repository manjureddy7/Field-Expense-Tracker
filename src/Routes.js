import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  LandingPage,
  Navbar,
  Tractor,
  Pesticides,
  Fields,
  NotFound,
  ProtectedRoute,
  AboutLabour
} from "./components";
import * as ROUTES from "./constants/Routes";
import { FieldsContextProvider } from "./context/FieldContext";
import SignIn from "./components/signin/Signin";
import SignUp from "./components/signup";
import { FirebaseProvider } from './context/FirebaseContext';

const RoutesPage = () => {
  return (
    <Router>
      <FirebaseProvider>
        <Navbar />
        <hr />
        <FieldsContextProvider>
              <Switch>
                <Route
                  exact
                  path={ROUTES.LANDING}
                  component={LandingPage}
                />
                <ProtectedRoute path={ROUTES.ADD_FIELD} component={Fields} />
                <ProtectedRoute path={ROUTES.TRACTOR} component={Tractor} />
                <ProtectedRoute path={ROUTES.LABOUR} component={AboutLabour} />
                <ProtectedRoute path={ROUTES.PESTICIDES} component={Pesticides} />
                <Route path={ROUTES.SIGN_IN} component={SignIn} />
                <Route path={ROUTES.SIGN_UP} component={SignUp} />
                <Route component={NotFound} />
              </Switch>
        </FieldsContextProvider>
      </FirebaseProvider>
    </Router>
  );
};

export default RoutesPage;
