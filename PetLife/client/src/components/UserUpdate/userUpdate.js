import React, { Component } from "react";
import axios from "axios";
import "./userUpdate.css";
import UserContext from "../../context/UserContext";
import DatePicker from "react-datepicker";
import moment from 'moment'
import { ThemeConsumer } from "react-bootstrap/esm/ThemeProvider";


class UserUpdateForm extends Component {
  static contextType = UserContext;

  state = {
    firstName: "",
    lastName: "",
    email: "",
    veterinarian: false,
    petTrainer: "",
    simpleUser: "",
    loading: ''
  };

  
  componentDidMount() {
    axios.get(`/api/admin/${this.props.match.params.id}`).then(res => {
        this.state.veterinarian = res.data.veterinarian;
        this.state.petTrainer = res.data.petTrainer;
        this.state.simpleUser = res.data.simpleUser;
        this.state.firstName = res.data.firstName
        this.setState({
            // firstName: res.data.firstName,
            lastName: res.data.lastName,
            email: res.data.email
          }, this.fillData());
    });   
  }

  fillData(){
      if (this.state.veterinarian !== true ){
        this.state.veterinarian = false;
      }
      if (this.state.petTrainer !== true ){
        this.state.petTrainer = false;
      }
      if (this.state.simpleUser !== true ){
        this.state.simpleUser = false;
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
      console.log(this.state.veterinarian || this.state.petTrainer || this.state.simpleUser)
    const user = {
      veterinarian: this.state.veterinarian,
      petTrainer: this.state.petTrainer,
      simpleUser: this.state.simpleUser
    };
    if (this.state.veterinarian || this.state.petTrainer || this.state.simpleUser){
        let userUrl = `/admin/users`;
       axios
      .put(`/api/admin/${this.props.match.params.id}`, user)
      .then(function() {
        window.location = userUrl;
      });
    } 
  };

  deleteUser = e => {
    let userUrl = `/admin/users`;
    axios
      .delete(`/api/admin/${this.props.match.params.id}`)
      .then(function() {
        window.location = userUrl;
      });
  }

  render() {

    const {errors} = this.state;

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
