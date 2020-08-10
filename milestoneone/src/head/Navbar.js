import React from "react";
import { Link, Switch, Route, withRouter } from "react-router-dom";
import "./navbar.css";
import Signin from "../signinandsignup/Signin";
import SignUp from "../signinandsignup/Signup";
import Home from "../content/Home";
import AddUpComponent from "../content/AddUpComponent";
import UpdateComponent from "../content/UpdateComponent";
//import Dashboard from '../content/Dasboard';
import ParentDashboard from "../content/ParentDashboard";
// import About from "../content/About";
class Nav extends React.Component {
  logOut(e) {
    e.preventDefault();
    console.log("loggedout");
    localStorage.removeItem("loggedIn");
    this.props.history.push("/");
  }

  render() {
    const loginreglink = (
      <div className="custom-nav">
        <Link>
          <b> Product Inventory System</b>
        </Link>
        <Link to="/Signup">SignUp</Link>
        <Link to="/">Signin</Link>
        {/* <Link to="/About">About</Link> */}
      </div>
    );
    const userLink = (
      <div className="custom-nav">
        <Link>
          <b> Product Inventory System</b>
        </Link>
        <Link onClick={this.logOut.bind(this)}>Logout</Link>
        <Link to="/addproduct">Add Product</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/home">Home</Link>

        {/* <Link to="/About">About</Link> */}
      </div>
    );
    return (
      <div>
        {localStorage.loggedIn ? userLink : loginreglink}
        <Switch>
          <Route exact path="/" component={Signin}></Route>
          <Route path="/signup" component={SignUp}></Route>
          <Route path="/home" component={Home}></Route>
          <Route path="/addproduct" component={AddUpComponent}></Route>
          <Route path="/editproduct/:id" component={UpdateComponent}></Route>
          <Route path="/dashboard" component={ParentDashboard}></Route>
          {/* <Route path="/about" component={About}></Route> */}
        </Switch>
      </div>
    );
  }
}

export default withRouter(Nav);
