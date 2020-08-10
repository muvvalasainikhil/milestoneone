import React from "react";
import { Link } from "react-router-dom";
import "./signin.css";
import axios from "axios";
class Signin extends React.Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      loginStatus: false,

      //error
      usernameError: "",
      passwordError: "",
    };
  }
  componentWillMount() {
    if (localStorage.getItem("loggedIn")) {
      localStorage.removeItem("loggedIn");
    }
  }
  initialsate = () => {
    setTimeout(() => {
      this.setState({ loginStatus: false });
    }, 2000);
  };
  initialsateregisterd = () => {
    setTimeout(() => {
      this.setState({ isregistered: false });
    }, 2000);
  };
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log(this.state.username);
    console.log(this.state.password);
  };
  onSubmitLogin = (e) => {
    e.preventDefault();
    console.log("loggedIn");
    axios
      .get("http://localhost:3000/userDetails/?q=" + this.state.username)
      .then((res) => {
        console.log(res.data[0]);
        if (res.data[0]) {
          if (
            (res.data[0].username === this.state.username &&
              res.data[0].password === this.state.password) ||
            (res.data[0].email === this.state.username &&
              res.data[0].password === this.state.password)
          ) {
            localStorage.setItem("loggedIn", true);
            localStorage.setItem("username", this.state.username);
            this.props.history.push("/home");
          } else {
            this.setState({ loginStatus: true });
            this.initialsate();
          }
        } else {
          this.setState({ loginStatus: true });
          this.initialsate();
        }
      });
  };
  getBlurPassword = (event) => {
    this.setState({ password: event.target.value });
    this.checkValidation("password");
  };
  gerBlurUsername = (event) => {
    this.setState({ username: event.target.value });
    this.checkValidation("username");
  };
  checkValidation = (event) => {
    let usernameerror = "";
    let passworderror = "";
    if (event === "username" && this.state.username === "") {
      usernameerror = "Username is required";
    }
    if (event === "password" && this.state.password === "") {
      passworderror = "password is required";
    }
    if (usernameerror || passworderror) {
      this.setState({
        usernameError: usernameerror,
        passwordError: passworderror,
      });
      return false;
    }
    this.setState({
      usernameError: "",
      passwordError: "",
    });
    return true;
  };
  render() {
    return (
      <div className="center">
        <h1>SIGN IN</h1>
        {this.state.loginStatus && (
          <p className="error1">
            <b>Invalid Login Credentials</b>
          </p>
        )}

        <form onSubmit={this.onSubmitLogin}>
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
                    required
                    onBlur={this.gerBlurUsername}
                  />
                  <span className="error">{this.state.usernameError}</span>
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
                    required
                    onBlur={this.getBlurPassword}
                  />
                  <span className="error">{this.state.passwordError}</span>
                </td>
              </tr>
              <tr>
                <td>
                  <Link to="/signup">forgot Username/password?</Link>
                </td>
                <td>
                  <button type="submit">Login</button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}

export default Signin;
