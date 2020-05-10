import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  LandingPage,
  Navbar,
  Tractor,
  Pesticides,
  Labour,
  Fields,
  NotFound,
} from "./components";
import * as ROUTES from "./constants/Routes";
import FirebaseContext from "./context/firebaseContext";
import Firebase from "./firebase/Firebase";
import { FieldsContextProvider } from "./context/fieldsContext";
import { TractorContextProvider } from "./context/tractorContext";
import { LabourContextProvider } from "./context/labourContext";
import SignIn from "./components/signin/Signin";
import SignUp from "./components/signup";
import AuthUserContext from "./context/userContext";

const RoutesPage = (props) => {
  const { authUser } = props;
  return (
    <Router>
      <FirebaseContext.Provider value={Firebase}>
        <AuthUserContext.Provider value={authUser}>
          <FieldsContextProvider>
            <TractorContextProvider>
              <LabourContextProvider>
                <div>
                  <Navbar />
                  <hr />
                  <Switch>
                    <Route
                      exact
                      path={ROUTES.LANDING}
                      component={LandingPage}
                    />
                    <Route exact path={ROUTES.ADD_FIELD} component={Fields} />
                    <Route path={ROUTES.TRACTOR} component={Tractor} />
                    <Route path={ROUTES.PESTICIDES} component={Pesticides} />
                    <Route path={ROUTES.LABOUR} component={Labour} />
                    <Route path={ROUTES.SIGN_IN} component={SignIn} />
                    <Route path={ROUTES.SIGN_UP} component={SignUp} />
                    <Route component={NotFound} />
                  </Switch>
                </div>
              </LabourContextProvider>
            </TractorContextProvider>
          </FieldsContextProvider>
        </AuthUserContext.Provider>
      </FirebaseContext.Provider>
    </Router>
  );
};

export default RoutesPage;
