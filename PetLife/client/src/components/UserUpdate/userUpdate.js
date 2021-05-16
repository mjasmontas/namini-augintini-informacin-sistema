import React, { Component } from "react";
import "./userUpdate.css";
import UserContext from "../../context/UserContext";
import UserService from "../../Services/user.service";

class UserUpdateForm extends Component {
  static contextType = UserContext;

  state = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    isVeterinarian: false,
    isPetTrainer: false,
    isUser: false,
    role: "",
    loading: "",
  };

  componentDidMount() {
    UserService.getUser(this.props.match.params.id).then((res) => {
      if (res.data.roles) {
        if (res.data.roles[0] === "6086c27f1c84567930705b43") {
          this.setState({
            isUser: true,
          });
          console.log('v')
        } else if (res.data.roles[0] === "6086c27f1c84567930705b44") {
          this.setState({
            isPetTrainer: true,
          });
          console.log('b')
        } else if (res.data.roles[0] === "6086c27f1c84567930705b45") {
          this.setState({
            isVeterinarian: true,
          });
          console.log('a')
        }
        console.log(res.data);
        this.setState({
          firstName: res.data.firstName,
          lastName: res.data.lastName,
          email: res.data.email,
          phoneNumber: res.data.phoneNumber,
          role: res.data.roles[0],
          mounted: true,
          isLoading: false,
        });
      }
    });
  }

  componentDidUpdate() {
    if (this.state.mounted === false) {
      if (this.state.refreshed === false) {
        UserService.getUser(this.props.match.params.id).then((res) => {
          this.setState({
            refreshed: true,
            isLoading: false,
          });
          if (res.data.roles[0] === "6086c27f1c84567930705b43") {
            this.setState({
              isUser: true,
            });
          } else if (res.data.roles[0] === "6086c27f1c84567930705b44") {
            this.setState({
              isPetTrainer: true,
            });
          } else if (res.data.roles[0] === "6086c27f1c84567930705b45") {
            this.setState({
              isVeterinarian: true,
            });
          }
        });
      } else {
        this.setState({
          mounted: true,
        });
      }
    }
  }

  

  submitData = (e) => {
    e.preventDefault();
    let roles;
    console.log(
      this.state.isVeterinarian || this.state.petTrainer || this.state.isUser
    );
    const user = {
      veterinarian: this.state.isVeterinarian,
      petTrainer: this.state.isPetTrainer,
      simpleUser: this.state.isUser,
    };
    if (this.state.isVeterinarian) {
      roles = ["6086c27f1c84567930705b45"];
    } else if (this.state.isPetTrainer) {
      roles = ["6086c27f1c84567930705b44"];
    } else if (this.state.isUser) {
      roles = ["6086c27f1c84567930705b43"];
    }

    if (
      this.state.isVeterinarian ||
      this.state.isPetTrainer ||
      this.state.isUser
    ) {
      let userUrl = `/admin/users`;
      console.log(roles);
      UserService.updateUser(this.props.match.params.id, roles).then(
        function () {
          window.location = userUrl;
        }
      );
    }
  };

  deleteUser = (e) => {
    let userUrl = `/admin/users`;
    UserService.deleteUser(this.props.match.params.id).then(function () {
      window.location = userUrl;
    });
  };

  handleVetChange = (e) => {
    this.setState({
      isVeterinarian: e.target.checked,
      isPetTrainer: false,
      isUser: false,
    });
  };

  handleTrainerChange = (e) => {
    this.setState({
      isPetTrainer: e.target.checked,
      isVeterinarian: false,
      isUser: false,
    });
  };

  handleSimpleUserChange = (e) => {
    this.setState({
      isUser: e.target.checked,
      isPetTrainer: false,
      isVeterinarian: false,
    });
  };

  render() {
    const { errors } = this.state;

    const { isLoading } = this.state;

    if (isLoading) {
      return <p>Kraunama ...</p>;
    }

    return (
      <div className="container">
        <div class="row gutters">
          <h4 class="text-right">Rolės pakeitimas/ vartotojo ištrinimas</h4>
        </div>
        <div className="row gutters">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h4 className="mb-2 text-primary">Vartotojo informacija</h4>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Vartotojo vardas</label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        readonly="readonly"
                        defaultValue={this.state.firstName}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Vartotojo pavardė</label>
                      <input
                        type="text"
                        class="form-control"
                        readonly="readonly"
                        defaultValue={this.state.lastName}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Vartotojo elektroninis paštas</label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        readonly="readonly"
                        defaultValue={this.state.email}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Vartotojo telefono numeris</label>
                      <input
                        type="text"
                        class="form-control"
                        readonly="readonly"
                        defaultValue={this.state.phoneNumber}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <hr />

              <div className="spacing">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    onChange={this.handleSimpleUserChange}
                    checked={this.state.isUser}
                  />
                  <label class="form-check-label" for="inlineRadio1">
                    Klientas
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    onChange={this.handleVetChange}
                    checked={this.state.isVeterinarian}
                  />
                  <label class="form-check-label" for="isPetTrainer">
                    Veterinaras
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    onClick={this.handleTrainerChange}
                    checked={this.state.isPetTrainer}
                  />
                  <label class="form-check-label" for="isPetTrainer">
                    Augintinio treneris
                  </label>
                </div>
              </div>
              <div class="row gutters buttons">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div class="text-right">
                    <button
                      type="button"
                      onClick={this.submitData}
                      id="submit"
                      name="submit"
                      class="btn btn-primary"
                    >
                      Atnaujinti
                    </button>
                  </div><div class="text-right">
                    <button
                      type="button"
                      onClick={this.deleteUser}
                      id="submit"
                      name="submit"
                      class="btn btn-primary"
                    >
                      Ištrinti
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default UserUpdateForm;
