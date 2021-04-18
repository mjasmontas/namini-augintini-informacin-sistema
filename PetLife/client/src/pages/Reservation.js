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
    isLoading: false,
    petName: "legoo"
  };
  componentDidMount() {
    this.setState({ isLoading: true });
    console.log('a');
    // if (!this.context.user) return;
    axios.get(`/api/user/${this.context.user.id}/reservations`).then(res => {
      console.log(res.data);
      this.setState({
        reservations: res.data.reservation,
        mounted: true,
        isLoading: false
      });
      console.log(this.state.reservations);
    });
  }

  componentDidUpdate() {
    if (this.state.mounted === false) {
      if (this.state.perjungta === false) {
        axios.get(`/api/user/${this.context.user.id}/reservations`).then(res => {
          // console.log(res.data);
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
      console.log(this.state.reservations);
    }
  }

  cancelReservation = reservationId => {
    axios.delete(`/api/user/${reservationId}/reservation`).then(function(res) {
      console.log("Reservation canceled");
      console.log(reservationId);
    });
    let currentComponent = this;
    axios
      .get(`/api/user/${this.context.user.id}/reservations`)
      .then(function(res) {
        console.log(res.data);
        currentComponent.setState({
          reservations: res.data.reservation
        });
      });
    console.log(reservationId);
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
            petName={this.state.petName}
            arrivalDate={item.arrivalDate}
            departureDate={item.departureDate}
            clientNotes={item.clientNotes}
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
