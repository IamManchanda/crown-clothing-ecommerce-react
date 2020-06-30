import React, { Component } from "react";

import "./styles.scss";
import FormInput from "../form-input";
import CustomButton from "../custom-button";
import { auth, createUserProfileDocument } from "../../firebase/utils";

class SignUp extends Component {
  state = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  methods = {
    handleFormSubmit: async (event) => {
      event.preventDefault();
      const { displayName, email, password, confirmPassword } = this.state;
      if (password !== confirmPassword) {
        alert("Password don't match.");
        return;
      }
      try {
        const { user } = await auth.createUserWithEmailAndPassword(
          email,
          password,
        );
        await createUserProfileDocument(user, { displayName });
        this.setState({
          displayName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
      } catch (error) {
        console.error(error);
      }
    },
    handleFormInputChange: (event) => {
      const { value, name } = event.target;
      this.setState({ [name]: value });
    },
  };

  render() {
    const {
      state: { displayName, email, password, confirmPassword } = {},
      methods: { handleFormSubmit, handleFormInputChange } = {},
    } = this;
    return (
      <div className="sign-up">
        <h2 className="title">I do not have an account.</h2>
        <span>Sign up with your name, email and password.</span>
        <form className="sign-up-form" onSubmit={handleFormSubmit}>
          <FormInput
            label="Your Name"
            name="displayName"
            type="text"
            value={displayName}
            onChange={handleFormInputChange}
            required
          />
          <FormInput
            label="Email"
            name="email"
            type="email"
            value={email}
            onChange={handleFormInputChange}
            required
          />
          <FormInput
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={handleFormInputChange}
            required
          />
          <FormInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={handleFormInputChange}
            required
          />
          <CustomButton type="submit">Sign Up</CustomButton>
        </form>
      </div>
    );
  }
}

export default SignUp;
