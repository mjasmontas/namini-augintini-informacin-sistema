import React, { Component } from "react";
import "./header.css";
import UserContext from "../../context/UserContext";
import AuthService from "../../Services/auth.service";

class Header extends Component {
  handleLogOut = () => {
    AuthService.logout().then(() => {
      window.location.href = "/";
    });
    // cb missing
  };

  render() {
    return (
      <UserContext.Consumer>
        {(context) => {
          return (
            <header className="Header">
              <div class="container d-flex align-items-center justify-content-between">
                <h1 class="logo">
                  <a>Augintiniai</a>
                </h1>

                <nav id="navbar" class="navbar">
                  {context.user ? (
                    <>
                      <ul>
                        <button
                          onClick={this.handleLogOut}
                          className="btn btn-link"
                        >
                          Atsijungti
                        </button>
                      </ul>
                    </>
                  ) : (
                    <>
                      <ul>
                        <li>
                          <a class="nav-link scrollto active" href="/">
                            Pagrindinis
                          </a>
                        </li>
                        <li>
                          <a class="nav-link scrollto" href="/#about">
                            Apie mus
                          </a>
                        </li>
                        <li>
                          <a class="nav-link scrollto" href="/#services">
                            Paslaugos
                          </a>
                        </li>
                        <li>
                          <a class="nav-link scrollto" href="/#contact">
                            Kontaktai
                          </a>
                        </li>
                        <li>
                          <a class="nav-link scrollto " href="/login">
                            Prisijungti
                          </a>
                        </li>
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
