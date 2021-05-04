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
    veterinarian: false,
    petTrainer: "",
    simpleUser: "",
    role: "",
    loading: ''
  };

  
  componentDidMount() {
    UserService.getUser(this.props.match.params.id).then(res => {
        if (res.data.roles[0] === '6086c27f1c84567930705b43'){
          this.setState({
            simpleUser: true,
            veterinarian: false,
            petTrainer: false
          })
          // this.state.simpleUser = true;
          // this.state.veterinarian = false;
          // this.state.petTrainer = false;
        } else if (res.data.roles[0] === '6086c27f1c84567930705b44'){
          this.setState({
            simpleUser: false,
            veterinarian: false,
            petTrainer: true
          })
          // this.state.simpleUser = false;
          // this.state.veterinarian = false;
          // this.state.petTrainer = true;
        } else if (res.data.roles[0] === '6086c27f1c84567930705b45'){
          this.setState({
            simpleUser: false,
            veterinarian: true,
            petTrainer: false
          })
          // this.state.simpleUser = false;
          // this.state.veterinarian = true;
          // this.state.petTrainer = false;
        }

        this.setState({
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            email: res.data.email,
            role: res.data.roles[0],
            mounted: true,
            isLoading: false
          }, this.fillData());
    });   
  }

  componentDidUpdate() {
    if (this.state.mounted === false) {
      if (this.state.refreshed === false) {
        UserService.getUser(this.props.match.params.id).then(res => {
          console.log(res.data);
          this.setState({
            refreshed: true,
            isLoading: false
          }, this.fillData());
        });
      } else {
        this.setState({
          mounted: true
        });
      }
    }
  }

  fillData(){
    if (this.state.role === '6086c27f1c84567930705b43'){
      this.setState({
        simpleUser: false,
        veterinarian: false,
        petTrainer: true
      })
    } else if (this.state.role === '6086c27f1c84567930705b44'){
      this.setState({
        simpleUser: false,
        veterinarian: false,
        petTrainer: true
      })
    } else if (this.state.role === '6086c27f1c84567930705b45'){
      this.setState({
        simpleUser: false,
        veterinarian: true,
        petTrainer: false
      })
    }
  }

  handleVetChange = e => {
      this.setState({
          veterinarian: e.target.checked,
          petTrainer: false,
          simpleUser: false
      })
  }
  
  handleTrainerChange = e => {
    this.setState({
        petTrainer: e.target.checked,
        veterinarian: false,
        simpleUser: false
    })
  }

  handleSimpleChange = e => {
    this.setState({
        simpleUser: e.target.checked,
        petTrainer: false,
        veterinarian: false
    })
  }

  submitData = e => {
    e.preventDefault();
    let roles;
    console.log(this.state.veterinarian || this.state.petTrainer || this.state.simpleUser)
    const user = {
      veterinarian: this.state.veterinarian,
      petTrainer: this.state.petTrainer,
      simpleUser: this.state.simpleUser
    };
    if (this.state.veterinarian){
      roles = ['6086c27f1c84567930705b45']
    } else if (this.state.petTrainer){
      roles = ['6086c27f1c84567930705b44']
    } else if (this.state.simpleUser){
      roles = ['6086c27f1c84567930705b43']
    }

    if (this.state.veterinarian || this.state.petTrainer || this.state.simpleUser){
       
      let userUrl = `/admin/users`;
      console.log(roles)
      UserService.updateUser(this.props.match.params.id, roles)
      .then(function() {
        window.location = userUrl;
      });
    } 
  };

  deleteUser = e => {
    let userUrl = `/admin/users`;
    UserService.deleteUser(this.props.match.params.id)
      .then(function() {
        window.location = userUrl;
      });
  }

  render() {

    const {errors} = this.state;

    const { isLoading } = this.state;
 
    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
        <div>
        <h2 className="mb-4">User Information</h2>
        <form>
          <div className="form-group">
            <label>First Name</label>
            <p>{this.state.firstName}</p>
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <p>{this.state.lastName}</p>
          </div>
          <div className="form-group">
            <label>Email</label>
            <p>{this.state.email}</p>
          </div>
          <div className="form-group">
            <label>Is Veterinarian</label>
            <input
              name="veterinarianVisit"
              type="checkbox"
              onChange={this.handleVetChange}
              checked={this.state.veterinarian}
            />
          </div>
          <div className="form-group">
            <label>Is Pet Trainer</label>
            <input
              name="petTrainer"
              type="checkbox"
              onChange={this.handleTrainerChange}
              checked={this.state.petTrainer}
            />
          </div>
          <div className="form-group">
            <label>Is Simple User</label>
            <input
              name="simplerUser"
              type="checkbox"
              onChange={this.handleSimpleChange}
              checked={this.state.simpleUser}
            />
          </div>
          <div>
          <input 
                type="submit" 
                value="Update"
                onClick={this.submitData}  />
          </div>
          <div>
          <input 
                type="submit" 
                value="Delete"
                onClick={this.deleteUser}  />
          </div>
        </form>
      </div>
    );
  }
}

export default UserUpdateForm;
