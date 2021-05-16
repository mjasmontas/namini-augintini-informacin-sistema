import React from "react";
import "./reservation.css";
import {
  Card,
  CardBody,
  CardLink,
  CardTitle,
  Col
} from "reactstrap";
import moment from 'moment'

function Reservation(props) {
  // let bday = props.birthday.splice(0, -12)
  const sDate = moment(props.startDate).format('YYYY-MM-DD')
  const eDate = moment(props.endDate).format('YYYY-MM-DD')

  return (
    <Col key={props.id} md={4}>
    <Card className="text-center">
      <CardBody>
      <CardTitle tag="p">Data: {sDate} - {eDate}</CardTitle>
        <div className="data">
          <hr />
          <p className="card-category">Augintinio Vardas: {props.name}</p>
          <p className="card-category">Gimimo Data: {props.birthday}</p>
          <p className="card-category">Dydis: {props.size}</p>
          <p className="card-category">Kaina: {props.price}$</p>
          <p />
          <hr />
        </div>
        <CardLink to="" onClick={() => props.cancelReservation(props.id)}
        className="btn btn-primary">Ištrinti</CardLink>
      </CardBody>
    </Card>
  </Col>
  );
}

export default Reservation;
