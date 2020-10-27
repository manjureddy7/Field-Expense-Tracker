import React, { Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar, NotFound, ProtectedRoute, Loader } from "./components";
import * as ROUTES from "./constants/Routes";
import { FieldsContextProvider } from "./context/FieldContext";
import SignIn from "./components/signin/Signin";
import SignUp from "./components/signup";
import { FirebaseProvider } from "./context/FirebaseContext";

// Lets Lazy Load comps
const LandingPage = React.lazy(() => import("./components/landing"));
const Fields = React.lazy(() => import("./components/fields"));
const Tractor = React.lazy(() => import("./components/tractor"));
const Labour = React.lazy(() => import("./components/labour"));
const Pesticides = React.lazy(() => import("./components/pesticides"));

const RoutesPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <Router>
        <FirebaseProvider>
          <Navbar />
          <hr />
          <FieldsContextProvider>
            <Switch>
              <Route exact path={ROUTES.LANDING} component={LandingPage} />
              <ProtectedRoute path={ROUTES.ADD_FIELD} component={Fields} />
              <ProtectedRoute path={ROUTES.TRACTOR} component={Tractor} />
              <ProtectedRoute path={ROUTES.LABOUR} component={Labour} />
              <ProtectedRoute path={ROUTES.PESTICIDES} component={Pesticides} />
              <Route path={ROUTES.SIGN_IN} component={SignIn} />
              <Route path={ROUTES.SIGN_UP} component={SignUp} />
              <Route component={NotFound} />
            </Switch>
          </FieldsContextProvider>
        </FirebaseProvider>
      </Router>
    </Suspense>
  );
};

export default RoutesPage;
