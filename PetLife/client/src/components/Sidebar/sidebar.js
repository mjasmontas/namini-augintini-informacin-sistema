import React, { Component } from "react";
import "./sidebar.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { Consumer } from "../../context/UserContext";
import UserContext from "../../context/UserContext";

class Sidebar extends Component {
  static contextType = UserContext;

  state = {
    admin: false,
    veterinarian: false,
    petTrainer: false,
    simpleUser: false,
    mounted: false,
    refreshed: false,
    isLoading: false
  }

  
  componentDidMount() {
    this.setState({ isLoading: true });
    axios.get(`/api/user/${this.context.user.id}`).then(res => {
      // this.setState({
      //   admin: res.data.admin,
      //   veterinarian: res.data.veterinarian,
      //   petTrainer: res.data.petTrainer,
      //   simpleUser: res.data.simpleUser
      // });
      console.log(res.data)
      this.state.admin = res.data.Admin;
      this.state.veterinarian = res.data.veterinarian;
      this.state.petTrainer = res.data.petTrainer;
      this.state.petTrainer = res.data.simpleUser
      this.setState({
        mounted: true,
        isLoading: false
      });
    });
    console.log(this.state.petTrainer)
    console.log('sadsadasvsfjhksfd')
  }

  componentDidUpdate() {
    if (this.state.mounted === false) {
      if (this.state.refreshed === false) {
        axios.get(`/api/messages`).then(res => {
          this.setState({
            messages: res.data,
            refreshed: true,
            isLoading: false
          });
        });
      } else {
        this.setState({
          mounted: true
        });
        
      }
    }
  }


  render () {
  return (
    <div id="sidebar" className="col-3">
      <Consumer>
        {context => (
          <ul className="nav flex-column">
            {this.state.simpleUser ? (
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={`/user/${context.user.id}/petfamily`}
              >
                Pet Family
              </NavLink>
            </li>
            ): null }
            {this.state.simpleUser ? (
              <li className="nav-item">
              <NavLink
                className="nav-link"
                to={`/user/${context.user.id}/pets`}
              >
                Pet Info
              </NavLink>
            </li>
            ): null }
            {this.state.simpleUser ? (
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={`/user/${context.user.id}/reservations`}
              >
                Reservation
              </NavLink>
            </li>
            ): null }
            {/* <li className="nav-item">
              <NavLink
                className="nav-link"
                to={`/user/${context.user.id}/prescription`}
              >
                Prescription
              </NavLink>
            </li> */}
            {this.state.petTrainer ? (
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={`/user/${context.user.id}/visits`}
              >
                Trainer Visits
              </NavLink>
            </li>
            ): null }
            {/* <li className="nav-item">
              <NavLink
                className="nav-link"
                to={`/user/${context.user.id}/petSitters`}
              >
                Pet Sitter
              </NavLink>
            </li> */}
            {this.state.veterinarian ? (
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={`/user/${context.user.id}/veterinarian`}
              >
                Veterinar Visits
              </NavLink>
            </li>
            ): null }
            {this.state.admin ? (
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={`/admin/dashboard`}
              >
                Dashboard
              </NavLink>
            </li>
            ): null }
            {this.state.admin ? (
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={`/admin/users`}
              >
                Users
              </NavLink>
            </li>
            ): null }
            {this.state.admin ? (
            <li className="nav-item">
              <NavLink
                className="nav-link"
                to={`/admin/messages`}
              >
                Messages
              </NavLink>
            </li>
            ): null }
          </ul>
        )}
      </Consumer>
    </div>
  );
  }
}

export default Sidebar;
