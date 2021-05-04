import React from "react";
import "./rezervacija.css";
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
    // <div className="PetInfoCard card">
    //   <div className="row">
    //     <div className="col-12 col-sm-12 col-md-6 col-lg-3 text-center">
    //     </div>
    //     <div className="col-lg-7 text-start">
    //       {props.petName ? (
    //         <p>
    //           <strong>Name: </strong>
    //           {props.petName}
    //         </p>
    //       ) : null}
    //       {props.startDate ? (
    //         <p>
    //           <strong>Start Date: </strong>
    //           {props.startDate.slice(0, -14)}
    //         </p>
    //       ) : null}
    //       {props.endDate ? (
    //         <p>
    //           <strong>End Date: </strong>
    //           {props.endDate.slice(0, -14)}
    //         </p>
    //       ) : null}
    //       {props.clientNotes ? (
    //         <p>
    //           <strong>Client Notes: </strong>
    //           {props.clientNotes}
    //         </p>
    //       ) : null}
    //       {props.veterinarianVisit ? (
    //         <p>
    //           <strong>Veterianarian Visit is Activated  </strong>
    //         </p>
    //       ) : null}
    //       {props.veterinarianNote ? (
    //         <p>
    //           <strong>Note For The Veterinarian Visit: </strong>
    //           {props.veterinarianNote}
    //         </p>
    //       ) : null}
          
    //       {props.trainerVisit ? (
    //         <p>
    //           <strong>Trainer Visit is Activated </strong>
    //         </p>
    //       ) : null}
    //       {props.trainerNote ? (
    //         <p>
    //           <strong>Note For The Trainer Visit: </strong>
    //           {props.trainerNote}
    //         </p>
    //       ) : null}
    //       {props.price ? (
    //         <p>
    //           <strong>Price: </strong>
    //           {props.price}
    //         </p>
    //       ) : null}
    //     </div>
    //     <div className="col-md-2 text-center buttons">
    //     <button
    //           className="btn btn-secondary"
    //           onClick={() => props.cancelReservation(props.id)}
    //         >
    //           Remove
    //         </button>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Reservation;
