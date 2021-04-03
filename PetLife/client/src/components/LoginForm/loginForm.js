import React, { Component } from "react";
import "./loginForm.css";
import { withRouter } from "react-router-dom";
import { BrowserRouter as Link } from "react-router-dom";
import UserContext from "../../context/UserContext";
import Auth from "../../utils/Auth";

class LoginForm extends Component {
  static contextType = UserContext;
  state = {
    username: "",
    password: "",
    err: false
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmitEvent = event => {
    event.preventDefault();
    console.log("Submited");
    const username = this.state.username;
    const password = this.state.password;
    if (username && password) {
      Auth.logIn(username, password)
        .then(response => {
          console.log(response);
          this.context.setUser(response);
          this.props.history.push("/");
        })
        .catch(err => {
          this.setState({ err: true });
        });
    } else {
      this.setState({
        err: true
      });
    }
  };

  render() {
    return (
      <div className="LoginForm">
        {this.state.err ? (
          <div class="alert alert-danger" role="alert">
            Username and or password is incorrect
          </div>
        ) : null}
        {<section id="content">
         <form action="">
      <h1>Login Form</h1>
      <div>
        <input 
          type="text" 
          name="username" 
          placeholder="Username" 
          id="username" 
          value={this.state.username}
          onChange={this.handleInputChange} />
      </div>
      <div>
        <input 
          type="password" 
          placeholder="Password" 
          required="" 
          id="password" 
          name="password"
          value={this.state.password}
          onChange={this.handleInputChange} />
      </div>
      <div>
        <input 
        type="submit" 
        value="Log in"
        onClick={this.handleSubmitEvent} />
        <div>
          <a href="/createAccount">Register</a>
        </div>
      </div>
    </form>
    </section>}
      </div>
    );
  }
}

export default LoginForm;
