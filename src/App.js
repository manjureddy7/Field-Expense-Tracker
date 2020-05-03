import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import {
  LandingPage,
  Navbar,
  Tractor,
  Pesticides,
  Labour,
  AddField,
  NotFound,
} from "./components";
import * as ROUTES from "./constants/Routes";
import FirebaseContext from "./context/firebaseContext";
import Firebase from "./firebase/Firebase";
import { FieldsContextProvider } from "./context/fieldsContext";

function App() {
  return (
    <Router>
      <FirebaseContext.Provider value={Firebase}>
        <FieldsContextProvider>
          <div>
            <Navbar />
            <hr />
            <Switch>
              <Route exact path={ROUTES.LANDING} component={LandingPage} />
              <Route exact path={ROUTES.ADD_FIELD} component={AddField} />
              <Route path={ROUTES.TRACTOR} component={Tractor} />
              <Route path={ROUTES.PESTICIDES} component={Pesticides} />
              <Route path={ROUTES.LABOUR} component={Labour} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </FieldsContextProvider>
      </FirebaseContext.Provider>
    </Router>
  );
}

export default App;
