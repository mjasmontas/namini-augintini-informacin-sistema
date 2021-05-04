import React, { Component } from "react";
// import API from "../utils/API2";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Reservation from "../components/Reservation/reservation";
import UserContext from "../context/UserContext";
import ReservationService from "../Services/reservations.service";
import {
  Card,
  CardHeader,
  CardBody,
  CardLink,
  Container,
  CardFooter,
  CardTitle,
  Row,
  Table,
  Button,
  Col,
  CardImg
} from "reactstrap";
import moment from 'moment'

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
      }, this.ReservationData());
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
          }, this.ReservationData());
        });
      } else {
        this.setState({
          mounted: true
        });
        
      }
    }
  }

  ReservationData = () =>{
    var reservation;
    for( var i = 0; i < this.state.reservations.length; i++){
      reservation = {
        startDate: moment(this.state.reservations[i].startDate).format('YYYY-MM-DD'),
        endDate: moment(this.state.reservations[i].endDate).format('YYYY-MM-DD'),
        petName: this.state.reservations[i].petName,
        clientNotes: this.state.reservations[i].clientNotes,
        veterinarianVisit: this.state.reservations[i].vaterinarianVisit,
        trainerVisit: this.state.reservations[i].trainerVisit,
        price: this.state.reservations[i].price
      }
      console.log(typeof(moment(this.state.reservations[i].startDate).format('YYYY-MM-DD')));
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
      return <p>Loading ...</p>;
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
              Create A Reservation!
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
          clientNotes={item.clientNotes}
          veterinarianVisit={item.veterinarianVisit}
          trainerVisit={item.trainerVisit}
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
