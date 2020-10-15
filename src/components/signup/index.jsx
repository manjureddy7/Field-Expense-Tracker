import React, { useState } from "react";

import { useFirebase } from "../../context/FirebaseContext";
import { checkPassword } from "../../helpers/passwordCheck";
import { USERS } from "../../constants/collections";
import { firestoreDB } from '../../firebase';

const initialSingupFormValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUp = (props) => {
  const { history } = props;
  const [formValues, setFormValues] = useState(initialSingupFormValues);
  const [formStatus, setFormStatus] = useState("");
  const { signUp } = useFirebase();
  const { error, setError } = useState();

  const hadleInputChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    const formStatus = checkPassword(
      formValues.password,
      formValues.confirmPassword
    );
    if (!formStatus) {
      setFormStatus("Passwords do not match");
    } else {
      try {
        const finalUserData = {
          email: formValues.email,
          username: formValues.username,
        };
        const data = await signUp(formValues.email, formValues.password);
         // After user successfully signedup, store user details in other collection
         if (data) {
          await firestoreDB.collection(USERS).doc(data.user.uid).set(finalUserData)
        }
        history.push("/");
      } catch (error) {
        setError(error)
      }
      setFormValues({
        ...formValues,
        email: "",
        password: "",
        confirmPassword: "",
        username: "",
      });
    }
  };

  const isInvalid =
    formValues.email === "" ||
    formValues.username === "" ||
    formValues.password === "";
  return (
    <div className="signup-form">
      <form onSubmit={handleSignUp}>
        <div className="signup-username">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            placeholder="Please enter your username"
            value={formValues.username}
            onChange={hadleInputChange}
          />
        </div>
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
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="Please enter your password"
            value={formValues.confirmPassword}
            onChange={hadleInputChange}
          />
        </div>
        <button className="signup-submit" type="submit" disabled={isInvalid}>
          SignUp
        </button>
        {formStatus}
      </form>
      {error && <p> Something wrong while signing up...</p>}
    </div>
  );
};

export default SignUp;
