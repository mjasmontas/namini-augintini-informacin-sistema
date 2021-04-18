import React, { Component } from "react";
import "./header.css";
import UserContext from "../../context/UserContext";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Auth from "../../utils/Auth";

class Header extends Component {
  handleLogOut = () => {
    Auth.logOut().then(() => {
      window.location.href = "/";
    });
    // cb missing
  };

  render() {
    return (
      <UserContext.Consumer>
        {context => {
          return (
            <header className="Header">
              <div class="container d-flex align-items-center justify-content-between">

<h1 class="logo"><a>Tempo</a></h1>

<nav id="navbar" class="navbar">
{context.user ? (
  <>
    <ul>
    <span>
      Email:<strong> {context.user.email}</strong>
      </span>
      <button
        onClick={this.handleLogOut}
        className="btn btn-link"
        >
          Log Out
        </button>
        </ul>
        </>
        ) : (
          <>
            <ul>
              <li><a class="nav-link scrollto active" href="/">Home</a></li>
              <li><a class="nav-link scrollto" href="/#about">About</a></li>
              <li><a class="nav-link scrollto" href="/#services">Services</a></li>
              <li><a class="nav-link scrollto" href="/#contact">Contact</a></li>
              <li><a class="nav-link scrollto " href="/login">Sign In</a></li>
            </ul>
            <i class="bi bi-list mobile-nav-toggle"></i>
          </>
          )}
</nav>

</div>
            </header>
          );
        }}
      </UserContext.Consumer>
    );
  }
}

export default Header;
