import React, { useState } from "react";

import { useFirebase } from "../../context/FirebaseContext";
import Loader from "../loader";

const initialSigninFormValues = {
  email: "",
  password: "",
};

const SignIn = (props) => {
  const { history } = props;
  const [formValues, setFormValues] = useState(initialSigninFormValues);
  const [formStatus, setFormStatus] = useState("");
  const { login, setUIDInLocalStorage } = useFirebase();
  const [loading, setLoading] = useState(false);

  const hadleInputChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSingin = async (e) => {
    setLoading(true);
    e.preventDefault();
    login(formValues.email, formValues.password)
      .then((data) => {
        if (!data) return setFormStatus("Something wrong");
        const {
          user: { uid },
        } = data;
        setUIDInLocalStorage(uid);
        setLoading(false);
        history.push("/");
      })
      .catch((error) => {
        setLoading(false);
        setFormStatus(error.message);
        console.log("error is", error);
      });
  };

  const isInvalid = formValues.email === "" || formValues.password === "";

  return (
    <>
      <div className="auth-form">
        <form onSubmit={handleSingin}>
          <div>
            <label id="email">Email:</label>
            <input
              type="email"
              name="email"
              htmlFor="email"
              placeholder="Please enter your email"
              value={formValues.email}
              onChange={hadleInputChange}
            />
          </div>
          <div>
            <label id="password">Password:</label>
            <input
              type="password"
              name="password"
              htmlFor="password"
              placeholder="Please enter your password"
              value={formValues.password}
              onChange={hadleInputChange}
            />
          </div>
          <div style={{ width: "100%" }}>
            <button type="submit" disabled={isInvalid}>
              Login
            </button>
          </div>
        </form>
      </div>
      {loading && <Loader />}
      {formStatus && <div className="signin-error">{formStatus}</div>}
    </>
  );
};

export default SignIn;
