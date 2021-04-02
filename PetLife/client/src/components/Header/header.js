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
              <div className="row">
                <div className="col-3 logo">
                  <div className="row">
                    <img src="/logoImage.png" alt="Pet Boarding System" />
                    <h1 className="name">Pet Boarding System</h1>
                  </div>
                </div>
                <div className="col-9 navbar">
                  {context.user ? (
                    <>
                      <span>
                        Username:<strong> {context.user.username}</strong>
                      </span>
                      <button
                        onClick={this.handleLogOut}
                        className="btn btn-link"
                      >
                        Log Out
                      </button>
                    </>
                  ) : (
                    <>
                      <span>
                        <Link className="btn btn-link" to="/login">
                          Log In
                        </Link>
                      </span>
                      <Link className="btn btn-link" to="/createAccount">
                        Create New Account
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </header>
          );
        }}
      </UserContext.Consumer>
    );
  }
}

export default Header;
