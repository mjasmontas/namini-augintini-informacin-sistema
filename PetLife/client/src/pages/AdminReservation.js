import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import ReservationService from "../Services/reservations.service";
import {
    Card,
    CardHeader,
    CardBody,
    Container,
    Row,
    Table,
    Button,
    Col,
  } from "reactstrap"
  import {
    faEdit,
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import moment from 'moment'

  const allReservations = (reservation, index) => {
    return (
      <tr key={index}>
        <td>{index}</td>
        <td>{reservation.ownerName}</td>
        <td>{reservation.price}</td>
        <td>{moment(reservation.startDate).format('DD-MM-YYYY')}</td>
        <td>{moment(reservation.endDate).format('DD-MM-YYYY')}</td>
        {reservation.status === 'laukiamas' ? <td style={{color:'black', fontWeight: "bold"}}>{reservation.status}</td> : null}
        {reservation.status === 'atšauktas' ? <td style={{color:'red', fontWeight: "bold"}}>{reservation.status}</td> : null}
        {reservation.status === 'patvirtintas' ? <td style={{color:'green', fontWeight: "bold"}}>{reservation.status}</td> : null}
        <td><Button onClick={event => window.location.href='/admin/reservation/' + reservation._id}><FontAwesomeIcon icon={faEdit} className="mr-1" /></Button></td>
      </tr>
    )
  }

class ReservationInformation extends Component {
  static contextType = UserContext;

  state = {
    reservations: [],
    mounted: false,
    refreshed: false,
    isLoading: false
  };
  componentDidMount() {
    this.setState({ isLoading: true });
    if (!this.context.user) return;
    ReservationService.getAllReservations()
    
    .then(res => {
        console.log(res.data)
      this.setState({
        reservations: res.data,
        mounted: true,
        isLoading: false
      });
    });
  }

  componentDidUpdate() {
    if (this.state.mounted === false) {
      if (this.state.refreshed === false) {
        ReservationService.getAllReservations()
        .then(res => {
            console.log(res.data)
          this.setState({
            reservations: res.data,
            refreshed: true,
            isLoading: false
          });
        })
      } else {
        this.setState({
          mounted: true
        });
        
      }
    }
  }


  render() {
    const { isLoading } = this.state;
 
    if (isLoading) {
      return <p>Kraunama ...</p>;
    }

    return (
        <Container>
        <Row>
              <Col style={{padding: 30}}>
                <Card small className="mb-4" >
                  <CardHeader className="border-bottom">
                    <h6 className="m-0">Rezervacijos</h6>
                  </CardHeader>
                    <CardBody className="p-0 pb-3">
                      <Table striped bordered hover variant>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Savininko vardas</th>
                            <th>Kaina</th>
                            <th>Atvykimo data</th>
                            <th>Išvykimo data</th>
                            <th>Statusas</th>
                            <th>Redaguoti</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.reservations.map(allReservations)}
                        </tbody>
                      </Table>
                    </CardBody>
                  </Card>
              </Col>
            </Row>
            </Container>
    );
  }
}

export default ReservationInformation;
