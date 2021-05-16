import React, { Component } from "react";
import "./loginForm.css";
import AuthService from "../../Services/auth.service";
import UserContext from "../../context/UserContext";

class LoginForm extends Component {
  static contextType = UserContext;
  state = {
    email: "",
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
    const email = this.state.email;
    const password = this.state.password;
    if (email && password) {
      AuthService.login(email, password)
        .then(response => {
          this.props.history.push("/");
          console.log(response);
          this.context.setUser(response);
          console.log(this.context.user.id)
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
    <div class="container test">
      {this.state.err ? (
          <div class="alert alert-danger" role="alert">
            El. paštas arba slaptažodis yra neteisingi
          </div>
        ) : null}
        {
    <div class="row">
      <div class="col-lg-10 col-xl-9 mx-auto">
        <div class="card card-signin flex-row my-5">
          <div class="card-img-left d-none d-md-flex">
          </div>
          <div class="card-body">
            <h5 class="card-title text-center">Prisijungti</h5>
            <form class="form-signin">
            <div class="form-label-group">
              <input 
                type="text" 
                placeholder="Elektroninis paštas" 
                required="" 
                class="form-control" 
                id="email" 
                name="email"
                value={this.state.email}
                onChange={this.handleInputChange} />
                <label for="email">Elektroninis paštas</label>
              </div>

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
              </div>

              <div class="text-center"><button className="buttonLogin" type="submit" onClick={this.handleSubmitEvent}>Prisijungti</button></div>
              <hr class="my-4"/>
              <a class="d-block text-center mt-2 small" href="/createAccount">Registruotis</a>
            </form>
          </div>
        </div>
      </div>
    </div>}
  </div>

    );
  }
}

export default LoginForm;
