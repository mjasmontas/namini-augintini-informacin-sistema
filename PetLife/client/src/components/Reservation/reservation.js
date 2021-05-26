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
  const sDate = moment(props.startDate).format('DD-MM-YYYY')
  const eDate = moment(props.endDate).format('DD-MM-YYYY')

  return (
    <Col key={props.id} md={4} style={{padding: 10}}>
    <Card className="text-center">
      <CardBody>
      <CardTitle tag="p">Data: {sDate} - {eDate}</CardTitle>
        <div className="data">
          <hr />
          <p className="card-category">Augintinio Vardas: {props.name}</p>
          {props.status === 'laukiamas'? <p className="card-category" style={{color:'black', fontWeight: "bold"}}>Statusas: {props.status}</p> : null}
          {props.status === 'atšauktas'? <p className="card-category" style={{color:'red', fontWeight: "bold"}}>Statusas: {props.status}</p> : null}
          {props.status === 'patvirtintas'? <p className="card-category" style={{color:'green', fontWeight: "bold"}}>Statusas: {props.status}</p> : null}
          <p className="card-category">Kaina: {props.price}$</p>
          <p />
          <hr />
        </div>
        <CardLink to="" onClick={() => props.cancelReservation(props.id)}
        className="btn btn-primary">Atšaukti</CardLink>
      </CardBody>
    </Card>
  </Col>
  );
}

export default Reservation;
