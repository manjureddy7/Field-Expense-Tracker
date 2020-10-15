import React, { useState, useContext } from "react";

import FirebaseContext from "../../context/firebaseContext";

const initialSigninFormValues = {
  email: "",
  password: "",
};

const SignIn = (props) => {
  const { history } = props;
  const [formValues, setFormValues] = useState(initialSigninFormValues);
  const [formStatus, setFormStatus] = useState("");
  const firebaseContext = useContext(FirebaseContext);

  const hadleInputChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSingin = (e) => {
    e.preventDefault();
    const auth = firebaseContext.auth();
    auth
      .signInWithEmailAndPassword(formValues.email, formValues.password)
      .then((data) => {
        if (!data) return setFormStatus("Something wrong");
        history.push("/");
      })
      .catch((error) => {
        setFormStatus(error.message);
        console.log("error is", error);
      });
  };

  const isInvalid = formValues.email === "" || formValues.password === "";

  return (
    <>
      <div className="signup-form">
        <form onSubmit={handleSingin}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Please enter your email"
              value={formValues.email}
              onChange={hadleInputChange}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Please enter your password"
              value={formValues.password}
              onChange={hadleInputChange}
            />
          </div>
          <div>
            <button
              className="signup-submit"
              type="submit"
              disabled={isInvalid}
            >
              Login
            </button>
          </div>
        </form>
      </div>
      {formStatus && <div className="signin-error">{formStatus}</div>}
    </>
  );
};

export default SignIn;
