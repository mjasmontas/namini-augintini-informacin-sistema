import React, { Component } from "react";
import axios from "axios";
import "./createAccountForm.css";
import DatePicker from "react-datepicker";
import moment from 'moment'


const validEmailRegex = 
      RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);

const validateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    // if we have an error string set valid to false
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
}

class CreateAccountForm extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    errors: {
      firstName: '',
      lastName: '',
      email: '',
      dateOfBirht: '',
      password: ''
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    let errors = this.state.errors;
    

    // this.setState({
    //   [name]: value
    // });

    switch (name) {
      case 'firstName': 
        errors.firstName = 
          value.length < 5
            ? 'First Name must be 5 characters long!'
            : '';
        break;
      case 'lastName': 
      errors.lastName = 
        value.length < 5
          ? 'Last Name must be 5 characters long!'
          : '';
      break;
      case 'email': 
        errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Email is not valid!';
        break;
      case 'password': 
        errors.password = 
          value.length < 8
            ? 'Password must be 8 characters long!'
            : '';
        break;
      default:
        break;
    }

    this.setState({errors, [name]: value}, ()=> {
      console.log(errors)
      console.log(this.state.phoneNumber)
  })
  };
  
  handleSubmitEvent = event => {
    event.preventDefault();
    if(validateForm(this.state.errors)) {
      axios
      .post("/api/signup", {
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email,
        password: this.state.password,
        veterinarian: false,
        petTrainer: false,
        simpleUser: true
      })
      .then(response => {
        console.log(response.data);
        this.props.history.push("/login");
      })
      .catch(err => {
        console.log(err.response);
      });
    }else{
      console.error('Invalid Form')
    }
  };

  render() {

    const {errors} = this.state;

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
                  {errors.firstName.length > 0 && 
                    <span className='error'>{errors.firstName}</span>}
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
                {errors.lastName.length > 0 && 
                    <span className='error'>{errors.lastName}</span>}
              </div>
              <div class="form-label-group">
              <input 
                type="text" 
                placeholder="Phone Number" 
                required="" 
                class="form-control" 
                id="phoneNumber" 
                name="phoneNumber"
                value={this.state.phoneNumber}
                onChange={this.handleInputChange} />
                <label for="phoneNumber">Phone Number</label>
                {/* {errors.email.length > 0 && 
                    <span className='error'>{errors.email}</span>} */}
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
                {errors.email.length > 0 && 
                    <span className='error'>{errors.email}</span>}
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
                {errors.password.length > 0 && 
                    <span className='error'>{errors.password}</span>}
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
