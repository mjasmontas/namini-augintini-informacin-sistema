import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import "./createAccountForm.css";

class CreateAccountForm extends Component {
  state = {
    username: "",
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
    console.log("Submited");
    axios
      .post("/api/signup", {
        username: this.state.username,
        password: this.state.password
      })
      .then(response => {
        console.log(response.data);
        this.props.history.push("/login");
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      // <div className="CreateAccountForm">
      //   <form>
      //     <div className="form-group">
      //       <label for="exampleInputEmail1">Username</label>
      //       <input
      //         type="text"
      //         name="username"
      //         className="form-control"
      //         placeholder="Username"
      //         value={this.state.username}
      //         onChange={this.handleInputChange}
      //       />
      //     </div>
      //     <div className="form-group">
      //       <label for="exampleInputPassword1">Password</label>
      //       <input
      //         type="password"
      //         name="password"
      //         className="form-control"
      //         placeholder="Password"
      //         value={this.state.password}
      //         onChange={this.handleInputChange}
      //       />
      //     </div>
      //     <div className="form-group">
      //       <label for="exampleInputPassword1">Confirm Password</label>
      //       <input
      //         type="password"
      //         name="Confirm Password"
      //         className="form-control"
      //         placeholder="Password"
      //         value={this.state.confirmPassword}
      //         onChange={this.handleInputChange}
      //       />
      //       {this.state.password !== this.state.confirmPassword ||
      //       this.state.confirmPassword === "" ? (
      //         <small id="emailHelp" className="form-text text-muted">
      //           The passwords should match
      //         </small>
      //       ) : null}
      //     </div>
      //     <button
      //       onClick={this.handleSubmitEvent}
      //       type="submit"
      //       className="btn btn-primary"
      //       disabled={
      //         this.state.password !== this.state.confirmPassword ||
      //         this.state.password === ""
      //       }
      //     >
      //       Submit
      //     </button>
      //   </form>
      // </div>
      <div className="CreateAccountForm">
        {<section id="content">
         <form action="">
      <h1>Create Account</h1>
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
          type="password" 
          placeholder="Confirm Password" 
          required="" 
          id="password" 
          name="confirmPassword"
          value={this.state.confirmPassword}
          onChange={this.handleInputChange} />
          {this.state.password !== this.state.confirmPassword ||
            this.state.confirmPassword === "" }
      </div>
      <div>
        <input 
        type="submit" 
        value="Submit"
        onClick={this.handleSubmitEvent}
        disabled={
          this.state.password !== this.state.confirmPassword ||
          this.state.password === ""
        } />
        
        <div>
          <a href="/login">Already have an account press here</a>
        </div>
      </div>
    </form>
    </section>}
      </div>
    );
  }
}

export default CreateAccountForm;
