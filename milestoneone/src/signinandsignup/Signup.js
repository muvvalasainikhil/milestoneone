import React from "react";
import "./signin.css";
import axios from "axios";
import { Link } from "react-router-dom";
class Signup extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: "",
      confirm_password: "",
      // error variables
      nameError: "",
      emailError: "",
      passwordError: "",
      confirmPasswordError: "",
      buttonStatus: true,
      signSuccess: false,

      usernameExists: false,
      emailExists: false,
      registered: false,
    };
  }
  initialsate = () => {
    setTimeout(() => {
      this.setState({ usernameExists: false });
      this.setState({ emailExists: false });
    }, 2000);
  };
  getblurName = (event) => {
    this.setState({ username: event.target.value });
    console.log(event.target.value);
    this.checkValidation("username");
  };
  getblurEmail = (event) => {
    this.setState({ email: event.target.value });
    this.checkValidation("email");
  };
  getblurPassword = (event) => {
    this.setState({ password: event.target.value });
    this.checkValidation("password");
  };
  getblurconfirmpass = (event) => {
    this.setState({ confirm_password: event.target.value });
    this.checkValidation("confirm_password");
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(e.target.value);
    this.checkValidation(e);
  };
  onSubmitregister = (e) => {
    console.log("onsubmit");
    e.preventDefault();
    axios
      .get("http://localhost:3000/userDetails/?q=" + this.state.username)
      .then((res) => {
        console.log(res.data[0]);
        if (res.data[0]) {
          this.setState({ usernameExists: true });
          console.log("usernameExists");
          this.initialsate();
        } else {
          axios
            .get("http://localhost:3000/userDetails/?q=" + this.state.email)
            .then((res) => {
              console.log(res.data[0]);
              if (res.data[0]) {
                this.setState({ emailExists: true });
                console.log("Email exists");
                this.initialsate();
              } else {
                var userDetails = {
                  username: this.state.username,
                  email: this.state.email,
                  password: this.state.password,
                };
                axios
                  .post("http://localhost:3000/userDetails", userDetails)
                  .then((res) => {
                    console.log(res.data);
                    this.setState({ usernameExists: false });
                    this.setState({ emailExists: false });
                    this.props.history.push("/");
                  });
              }
            });
        }
      });
  };
  checkValidation = (event) => {
    let nameerror = "";
    let passworderror = "";
    let confirmpassworderror = "";
    let emailerror = "";
    if (event === "username" && this.state.username === "") {
      nameerror = "Name is Required";
    }
    if (event === "email" && this.state.email === "") {
      emailerror = "email is required";
    }
    if (event === "password" && this.state.password === "") {
      passworderror = "password is required";
    }
    if (
      event === "confirm_password" &&
      (this.state.confirm_password === "" ||
        this.state.password !== this.state.confirm_password)
    ) {
      confirmpassworderror = "Password Required";
    }
    if (nameerror || passworderror || confirmpassworderror || emailerror) {
      this.setState({
        nameError: nameerror,
        passwordError: passworderror,
        emailError: emailerror,
        confirmPasswordError: confirmpassworderror,
        buttonStatus: true,
      });
      return false;
    }
    this.setState({
      nameError: "",
      passwordError: "",
      emailError: "",
      confirmPasswordError: "",
      buttonStatus: false,
    });
    return true;
  };
  render() {
    return (
      <div className="center">
        <h1>SIGN UP</h1>
        {this.state.usernameExists && (
          <p className="error1">
            <b>Username Already Exists</b>
          </p>
        )}
        {this.state.emailExists && (
          <p className="error1">
            <b>Email Aready exists</b>
          </p>
        )}

        <form onSubmit={this.onSubmitregister}>
          <table>
            <thead></thead>
            <tbody>
              <tr>
                <td>
                  <label>
                    <b>Username</b>
                  </label>
                </td>
                <td>
                  <input
                    type="text"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                    onBlur={this.getblurName}
                  ></input>
                  <span className="error">{this.state.nameError}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    <b>Email</b>
                  </label>
                </td>
                <td>
                  <input
                    type="email"
                    name="email"
                    value={this.state.email}
                    onChange={this.onChange}
                    onBlur={this.getblurEmail}
                  />
                  <span className="error">{this.state.emailError}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    <b>Password</b>
                  </label>
                </td>
                <td>
                  <input
                    type="password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                    onBlur={this.getblurPassword}
                  />
                  <span className="error">{this.state.passwordError}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    <b>Confirm Password</b>
                  </label>
                </td>
                <td>
                  <input
                    type="password"
                    name="confirm_password"
                    value={this.state.confirm_password}
                    onChange={this.onChange}
                    onBlur={this.getblurconfirmpass}
                  />
                  <span className="error">
                    {this.state.confirmPasswordError}
                  </span>
                </td>
              </tr>
              <tr>
                <td>
                  <Link to="/">Already User?</Link>
                </td>
                <td>
                  <button>Register</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}

export default Signup;
