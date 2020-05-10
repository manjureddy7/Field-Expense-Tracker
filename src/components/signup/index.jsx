import React, { useState, useContext } from "react";

import FirebaseContext from "../../context/firebaseContext";
import { checkPassword } from "../../helpers/passwordCheck";
import { USERS } from "../../constants/collections";

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
  const firebaseContext = useContext(FirebaseContext);

  const hadleInputChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    const formStatus = checkPassword(
      formValues.password,
      formValues.confirmPassword
    );
    if (!formStatus) {
      setFormStatus("Passwords do not match");
    } else {
      const auth = firebaseContext.auth();
      const db = firebaseContext.firestore();
      auth
        .createUserWithEmailAndPassword(formValues.email, formValues.password)
        .then((data) => {
          const finalUserData = {
            email: formValues.email,
            username: formValues.username,
          };
          if (data) {
            history.push("/");
            localStorage.setItem("uid", data.uid);
            db.collection(USERS)
              .doc(data.user.uid)
              .set(finalUserData)
              .then((userData) => console.log("user data", userData))
              .catch((error) =>
                console.log("error while creating user is", error)
              );
          }
        })
        .catch((error) => console.log("error is", error));
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
    <div>
      <form onSubmit={handleSignUp}>
        <div>
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
        <div>
          <button type="submit" disabled={isInvalid}>
            SignUp
          </button>
        </div>
        {formStatus}
      </form>
    </div>
  );
};

export default SignUp;
