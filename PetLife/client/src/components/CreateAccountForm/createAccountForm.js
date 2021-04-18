import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "./createAccountForm.css";

class CreateAccountForm extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    dateOfBirht: Date,
    password: "",
    confirmPassword: ""
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSubmitEvent = event => {
    event.preventDefault();
    axios
      .post("/api/signup", {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password
      })
      .then(response => {
        console.log(response.data);
        this.props.history.push("/login");
      })
      .catch(err => {
        console.log(err.response);
      });
  };

  render() {
    return (
    <div class="container">
    <div class="row">
      <div class="col-lg-10 col-xl-9 mx-auto">
        <div class="card card-signin flex-row my-5">
          <div class="card-img-left d-none d-md-flex">
          </div>
          <div class="card-body">
            <h5 class="card-title text-center">Register</h5>
            <form class="form-signin">
            <div class="form-label-group">
              <input 
                type="text" 
                placeholder="First Name" 
                required="" 
                class="form-control" 
                id="firstName" 
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleInputChange} />
                <label for="firstName">First Name</label>
              </div>

              <div class="form-label-group">
              <input 
                type="text" 
                placeholder="Last Name" 
                required="" 
                class="form-control" 
                id="lastName" 
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleInputChange} />
                <label for="lastName">Last Name</label>
              </div>

              <div class="form-label-group">
              <input 
                type="email" 
                placeholder="Email" 
                required="" 
                class="form-control" 
                id="email" 
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange} />
                <label for="email">Email</label>
              </div>
              
              <hr/>

              <div class="form-label-group">
              <input 
                type="password" 
                placeholder="Password" 
                required="" 
                class="form-control" 
                id="password" 
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange} />
                <label for="password">Password</label>
              </div>
              
              <div class="form-label-group">
              <input 
                type="password" 
                placeholder="Confirm Password" 
                required="" 
                class="form-control" 
                id="confirmPassword" 
                name="confirmPassword"
                value={this.state.confirmPassword}
                onChange={this.handleInputChange} />
                {this.state.password !== this.state.confirmPassword ||
            this.state.confirmPassword === "" }
                <label for="confirmPassword">Confirm Password</label>
              </div>

              {/* <div class="text-center"><button type="submit">Registruotis</button></div> */}
              <div class="text-center">
              <input 
                type="submit" 
                value="Submit"
                onClick={this.handleSubmitEvent}
                disabled={
                  this.state.password !== this.state.confirmPassword ||
                  this.state.password === ""
                } />
              </div>
              <hr class="my-4"/>
              <div class="row">
						    <p>Already have an account? <a href="/login">Login Here</a></p>
					    </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
    );
  }
}

export default CreateAccountForm;
