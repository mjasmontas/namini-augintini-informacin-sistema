import React, { Component } from "react";
// import API from "../utils/API2";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Reservation from "../components/Rezervacija/rezervacija";
import UserContext from "../context/UserContext";

class ReservationInformation extends Component {
  static contextType = UserContext;

  state = {
    reservations: [],
    mounted: false,
    perjungta: false,
    isLoading: false
  };
  componentDidMount() {
    this.setState({ isLoading: true });
    axios.get(`/api/user/${this.context.user.id}/reservations`).then(res => {
      this.setState({
        reservations: res.data.reservation,
        mounted: true,
        isLoading: false
      });
    });
  }

  componentDidUpdate() {
    if (this.state.mounted === false) {
      if (this.state.perjungta === false) {
        axios.get(`/api/user/${this.context.user.id}/reservations`).then(res => {
          this.setState({
            reservations: res.data.reservation,
            perjungta: true,
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

  cancelReservation = reservationId => {
    axios.delete(`/api/user/${reservationId}/reservation`).then(function(res) {
      console.log("Reservation canceled");
    });
    let currentComponent = this;
    axios
      .get(`/api/user/${this.context.user.id}/reservations`)
      .then(function(res) {
        currentComponent.setState({
          reservations: res.data.reservation
        });
      });
  };

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
            <h2>Reservation </h2>
          </div>
          <div className="col-6 text-right">
            <Link
              to={`/user/${user.id}/createReservation`}
              className="btn btn-warning btn-lg"
            >
              Create A Reservation!
            </Link>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {this.state.reservations < 1 ? (
              <div className="alert alert-warning mt-4" role="alert">
                You have not made any reservations
              </div>
            ) : null}
        {this.state.reservations.map(item => (
          <Reservation
            key={item._id}
            id={item._id}
            pet={item.pet}
            petName={item.petName}
            startDate={item.startDate}
            endDate={item.endDate}
            clientNotes={item.clientNotes}
            veterinarianVisit={item.veterinarianVisit}
            veterinarianNote={item.veterinarianNote}
            trainerVisit={item.trainerVisit}
            trainerNote={item.trainerNote}
            status={item.status}
            price={item.price}
            cancelReservation={this.cancelReservation}
          />
        ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ReservationInformation;