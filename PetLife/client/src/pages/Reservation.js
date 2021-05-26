import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Reservation from "../components/Reservation/reservation";
import UserContext from "../context/UserContext";
import ReservationService from "../Services/reservations.service";
import {
  Container,
  Row,
} from "reactstrap";

class ReservationInformation extends Component {
  static contextType = UserContext;

  state = {
    reservations: [],
    reservationCard: [],
    mounted: false,
    refreshed: false,
    isLoading: false
  };
  componentDidMount() {
    this.setState({ isLoading: true });
    this.state.reservationCard = [];
    if (!this.context.user) return;
    ReservationService.getAllUsersReservations(this.context.user.id)
    .then(res => {
      console.log(res.data)
      this.setState({
        reservations: res.data.reservation,
        mounted: true,
        isLoading: false
      });
    });
  }

  componentDidUpdate() {
    if (this.state.mounted === false) {
      if (this.state.refreshed === false) {
        this.state.reservationCard = [];
        ReservationService.getAllUsersReservations(this.context.user.id)
        .then(res => {
          console.log(res.data.reservation)
          this.setState({
            reservations: res.data.reservation,
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

  cancelReservation = reservationId => {
    ReservationService.deleteReservation(reservationId)
    .then(function(res) {
      console.log("Reservation canceled");
    });
    let currentComponent = this;
    ReservationService.getAllUsersReservations(this.context.user.id)
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
      return <p>Kraunama ...</p>;
    }

    return (
      <div className="content">
      <Container fluid>
        <Container>
          <h2>Rezervacija</h2>
        </Container>
        <Link
              to={`/user/${user.id}/createReservation`}
              className="btn btn-warning btn-lg"
            >
              Sukurti rezervaciją!
            </Link>
        <Row>
        {this.state.reservations < 1 ? (
          <div className="alert alert-warning mt-4" role="alert">
            Jūs neturite padarę jokių rezervacijų
          </div>
        ) : null}

        {this.state.reservations.map(item => (
          <Reservation
          key={item._id}
          id={item._id}
          name={item.petName}
          startDate={item.startDate}
          endDate={item.endDate}
          status={item.status}
          price={item.price}
          cancelReservation={this.cancelReservation}
          />
        ))}
          </Row>
          
          </Container>
      </div>
    );
  }
}

export default ReservationInformation;
