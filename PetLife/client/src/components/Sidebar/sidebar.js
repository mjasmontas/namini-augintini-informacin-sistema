import React, { Component } from "react";
import "./sidebar.css";
import {
  faUser,
  faEnvelope,
  faPaw,
  faHome,
  faClinicMedical,
  faClipboardCheck,
  faInfoCircle,
  faRunning,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { NavLink } from "react-router-dom";
import { NavItem, NavLink, Nav } from "reactstrap";
import { Link } from "react-router-dom";
import { Consumer } from "../../context/UserContext";
import UserContext from "../../context/UserContext";
import UserService from "../../Services/user.service";

class Sidebar extends Component {
  static contextType = UserContext;

  state = {
    user: [],
    isAdmin: false,
    isUser: false,
    isPetTrainer: false,
    isVeterinarian: false,
    mounted: false,
    refreshed: false,
    isLoading: false
  }

  
  componentDidMount() {
    this.setState({ isLoading: true });
      this.setState({
        mounted: true,
        isLoading: false
      });
  }

  componentDidUpdate() {
    if (this.state.mounted === false) {
      if (this.state.refreshed === false) {
          this.setState({
            refreshed: true,
            isLoading: false
          });
      } else {
        this.setState({
          mounted: true
        });
        
      }
    }
  }

  userHomePage = user => {
    if (user){
      UserService.getUser(user)
      .then(res => {
        if(res.data.roles[0] === '6086c27f1c84567930705b43') {
          this.setState({
            isUser: true
          })
        } else if (res.data.roles[0] === '6086c27f1c84567930705b44') {
          this.setState({
            isPetTrainer: true
          })
        } else if (res.data.roles[0] === '6086c27f1c84567930705b45') {
          this.setState({
            isVeterinarian: true
          })
        } else if (res.data.roles[0] === '6086c27f1c84567930705b46') {
          this.setState({
            isAdmin: true
          })
        } 
      })
    }
  }


  render () {
    this.userHomePage(this.context.user.id)
  return (
    <div id="sidebar" className="col-3">
      <Consumer>
        {/*  */}
        {context => (
          <div className="side-menu">
          <Nav vertical className="list-unstyled pb-3">
          {this.state.isUser ? (
            <NavItem>
              <NavLink tag={Link} to={`/user/${context.user.id}/petfamily`}>
                <FontAwesomeIcon icon={faPaw} className="mr-2" />
                Augintiniai
              </NavLink>
            </NavItem>
            ): null }
            {this.state.isUser ? (
            <NavItem>
              <NavLink tag={Link} to={`/user/${context.user.id}/pets`}>
                <FontAwesomeIcon icon={faInfoCircle} className="mr-2" />
                Informacija
              </NavLink>
            </NavItem>
            ): null }
            {this.state.isUser ? (
            <NavItem>
              <NavLink tag={Link} to={`/user/${context.user.id}/reservations`}>
                <FontAwesomeIcon icon={faClipboardCheck} className="mr-2" />
                Rezervacija
              </NavLink>
            </NavItem>
            ): null }
            {this.state.isPetTrainer ? (
            <NavItem>
              <NavLink tag={Link} to={`/trainer/${context.user.id}`}>
                <FontAwesomeIcon icon={faRunning} className="mr-2" />
                Trenerio vizitai
              </NavLink>
            </NavItem>
            ): null }
            {this.state.isVeterinarian ? (
            <NavItem>
              <NavLink tag={Link} to={`/veterinarian/${context.user.id}`}>
                <FontAwesomeIcon icon={faClinicMedical} className="mr-2" />
                Veterinaro Visitai
              </NavLink>
            </NavItem>
            ): null }
            {this.state.isAdmin ? (
            <NavItem>
              <NavLink tag={Link} to={`/admin/dashboard`}>
                <FontAwesomeIcon icon={faHome} className="mr-2" />
                Augintiniai
              </NavLink>
            </NavItem>
            ): null }
            {this.state.isAdmin ? (
            <NavItem>
              <NavLink tag={Link} to={`/admin/users`}>
                <FontAwesomeIcon icon={faUser} className="mr-2" />
                Vartotojai
              </NavLink>
            </NavItem>
            ): null }
            {this.state.isAdmin ? (
            <NavItem>
              <NavLink tag={Link} to={`/admin/messages`}>
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                Pranešimai
              </NavLink>
            </NavItem>
            ): null }
            {this.state.isUser || this.state.isPetTrainer || this.state.isVeterinarian? (
            <NavItem>
              <NavLink tag={Link} to={`/user/profile/${context.user.id}`}>
                <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                Profilis
              </NavLink>
            </NavItem>
            ): null }
          </Nav>
            </div>
        )}
      </Consumer>
    </div>
  );
  }
}

export default Sidebar;
