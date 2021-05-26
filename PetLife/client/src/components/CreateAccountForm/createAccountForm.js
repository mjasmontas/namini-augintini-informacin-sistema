import React, { Component } from "react";
import "./createAccountForm.css";
import AuthService from "../../Services/auth.service";

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
    userRoles: ["user"],
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
          value.length < 1
            ? 'Vardas neturi būti tuščias'
            : '';
        break;
      case 'lastName': 
      errors.lastName = 
        value.length < 5
          ? 'Pavardė neturi būti tuščia'
          : '';
      break;
      case 'email': 
        errors.email = 
          validEmailRegex.test(value)
            ? ''
            : 'Elektroninis paštas yra netinkamas!';
        break;
      case 'password': 
        errors.password = 
          value.length < 8
            ? 'Slaptaždis turi būti didesnis nei 8 simboliai!'
            : '';
        break;
      default:
        break;
    }

    this.setState({errors, [name]: value}, ()=> {
      console.log(errors)
  })
  };
  
  handleSubmitEvent = event => {
    event.preventDefault();
    if(validateForm(this.state.errors)) {
      AuthService.register (
        this.state.firstName,
        this.state.lastName,
        this.state.email,
        this.state.phoneNumber,
        this.state.password,
        this.state.userRoles
      )
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
            <h5 class="card-title text-center">Registruotis</h5>
            <form class="form-signin">
            <div class="form-label-group">
              <input 
                type="text" 
                placeholder="Vardas" 
                required="" 
                class="form-control" 
                id="firstName" 
                name="firstName"
                value={this.state.firstName}
                onChange={this.handleInputChange} />
                <label for="firstName">Vardas</label>
                  {errors.firstName.length > 0 && 
                    <span className='error'>{errors.firstName}</span>}
              </div>

              <div class="form-label-group">
              <input 
                type="text" 
                placeholder="Pavardė" 
                required="" 
                class="form-control" 
                id="lastName" 
                name="lastName"
                value={this.state.lastName}
                onChange={this.handleInputChange} />
                <label for="lastName">Pavardė</label>
                {errors.lastName.length > 0 && 
                    <span className='error'>{errors.lastName}</span>}
              </div>
              <div class="form-label-group">
              <input 
                type="text" 
                placeholder="Telefono numeris" 
                required="" 
                class="form-control" 
                id="phoneNumber" 
                name="phoneNumber"
                value={this.state.phoneNumber}
                onChange={this.handleInputChange} />
                <label for="phoneNumber">Telefono numeris</label>
                {/* {errors.email.length > 0 && 
                    <span className='error'>{errors.email}</span>} */}
              </div>
              <div class="form-label-group">
              <input 
                type="email" 
                placeholder="Elektroninis paštas" 
                required="" 
                class="form-control" 
                id="email" 
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange} />
                <label for="email">Elektroninis paštas</label>
                {errors.email.length > 0 && 
                    <span className='error'>{errors.email}</span>}
              </div>
              
              <hr/>

              <div class="form-label-group">
              <input 
                type="password" 
                placeholder="Slaptažodis" 
                required="" 
                class="form-control" 
                id="password" 
                name="password"
                value={this.state.password}
                onChange={this.handleInputChange} />
                <label for="password">Slaptažodis</label>
                {errors.password.length > 0 && 
                    <span className='error'>{errors.password}</span>}
              </div>
              
              <div class="form-label-group">
              <input 
                type="password" 
                placeholder="Pakartoti slaptažodį" 
                required="" 
                class="form-control" 
                id="confirmPassword" 
                name="confirmPassword"
                value={this.state.confirmPassword}
                onChange={this.handleInputChange} />
                {this.state.password !== this.state.confirmPassword ||
            this.state.confirmPassword === "" }
                <label for="confirmPassword">Pakartoti slaptažodį</label>
              </div>

              {/* <div class="text-center"><button type="submit">Registruotis</button></div> */}
              <div class="text-center">
                <div class="text-center"><button className="buttonRegistration" type="submit" onClick={this.handleSubmitEvent}>Registruotis</button></div>
              </div>
              <hr class="my-4"/>
              <div class="row">
						    <p>Jau turite paskyrą? <a href="/login">Prisijungti</a></p>
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
