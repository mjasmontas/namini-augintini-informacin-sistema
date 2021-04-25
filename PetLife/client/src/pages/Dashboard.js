import React, { Component } from "react";
// import API from "../utils/API2";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import UserContext from "../context/UserContext";

class Dashboard extends Component {
  static contextType = UserContext;

  state = {
    users: [],
    message: [],
    pets: [],
    messages: '',
    usersNumber: '',
    veterinarianNumber: 0,
    veterinarianVisitNumber: '',
    trainerNumber: 0,
    petNumber: '',
    reservationNumber: '',
    mounted: false,
    perjungta: false,
    isLoading: false
  };

  getVeterinarianNumber() {
    for (var i =0; i < this.state.users.length; i++){
        if (this.state.users[i].veterinarian) {
            this.state.veterinarianNumber =+ 1;
        }
    }
  }

  getTrainerNumber() {
    for (var i =0; i < this.state.users.length; i++){
        if (this.state.users[i].petTrainer) {
            this.state.trainerNumber =+ 1;
        }
    }
  }

componentDidMount() {
    this.setState({ isLoading: true });
    axios.get(`/api/messages`).then(res => {
      this.setState({
        message: res.data,
        messages: res.data.length,
        mounted: true        
      });
    });
    axios.get(`/api/pet`).then(res => {
      this.setState({
        pets: res.data,
        petNumber: res.data.length
      });
    });
    axios.get(`/api/users`).then(res => {
      this.setState({
        users: res.data,
        usersNumber: res.data.length - 1
      });
      this.getVeterinarianNumber();
      this.getTrainerNumber();
    });
    axios.get(`/api/reservations`).then(res => {
      this.setState({
        reservationNumber: res.data.length
      });
    });
    axios.get(`/api/veterinarianVisits`).then(res => {
      this.setState({
        veterinarianVisitNumber: res.data.length
      });
    });
    this.state.isLoading = false;
  }

  componentDidUpdate() {
    if (this.state.mounted === false) {
      if (this.state.perjungta === false) {
        axios.get(`/api/messages`).then(res => {
          this.setState({
            message: res.data,
            messages: res.data.length,
            perjungta: true,
            isLoading: false
          });
        });
        axios.get(`/api/pet`).then(res => {
            this.setState({
                pets: res.data,
                petNumber: res.data.length
              });
          });
        axios.get(`/api/users`).then(res => {
          this.setState({
            users: res.data,
            usersNumber: res.data.length - 1
          });
          this.getVeterinarianNumber();
          this.getTrainerNumber();
        });
        
        axios.get(`/api/reservations`).then(res => {
          this.setState({
            reservationNumber: res.data.length
          });
        });
        axios.get(`/api/veterinarianVisits`).then(res => {
          this.setState({
            veterinarianVisitNumber: res.data.length
          });
        });
      } else {
        this.setState({
          mounted: true
        });   
      }
    }
  }

  render() {
    const { user } = this.context;

    const { isLoading } = this.state;
 
    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <div className="PetSitter">
        <div className="row">
          <div className="col-6">
            <h2>Dashboard </h2>
          </div>
          <div className="col-6 text-right">
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            
          <div className="form-group">
            <label>Messages Number</label>
            <input
              name="messages"
              type="text"
              className="form-control"
              value={this.state.messages}
            />
            </div>
            <div className="form-group">
            <label>Pet Number</label>
            <input
              name="petNumber"
              type="text"
              className="form-control"
              value={this.state.petNumber}
            />
            </div>
            <div className="form-group">
            <label>User Number</label>
            <input
              name="usersNumber"
              type="text"
              className="form-control"
              value={this.state.usersNumber}
            />
            </div>
            <div className="form-group">
            <label>Reservation Number</label>
            <input
              name="reservationNumber"
              type="text"
              className="form-control"
              value={this.state.reservationNumber}
            />
            </div>
            <div className="form-group">
            <label>Employee Number</label>
                <div className="form-group">
                <label>Veterinarian Number</label>
                <input
                name="veterinarianNumber"
                type="text"
                className="form-control"
                value={this.state.veterinarianNumber}
                />
                <div className="form-group">
                <label>Pet Trainer Number</label>
                <input
                name="petTrainerNumber"
                type="text"
                className="form-control"
                value={this.state.trainerNumber}
                />
            </div>
            </div>
            <div className="form-group">
            <label>Veterinarian Visit Number</label>
            <input
              name="veterinarianVisitNumber"
              type="text"
              className="form-control"
              value={this.state.veterinarianVisitNumber}
            />
            </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
