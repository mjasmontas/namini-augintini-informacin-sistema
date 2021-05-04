import React from "react";
import "./TrainerVisit.css";
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

function TrainerVisit(props) {

  const test = moment(props.date).format('YYYY-MM-DD')
  return (
    <Col key={props.id} md={4}>
    <Card className="text-center">
      <CardBody>
      <CardTitle tag="p">Data: {test}</CardTitle>
        <div className="data">
          <hr />
          <p className="card-category">Šeimininko Vardas: {props.ownerName}</p>
          <p className="card-category">Augintinio Vardas: {props.petName}</p>
          <p className="card-category">Šeimininko Numeris: {props.petOwnerPhoneNumber}</p>
          <p className="card-category">Augintinio Tipas: {props.petType}</p>
          <p className="card-category">Augintinio Dydis: {props.petSize}</p>
          
          {props.trainersNote ? (
            <p className="card-category">Šeimininko komentaras: {props.trainersNote}</p>
          ) : null}
          <p />
          <hr />
        </div>
        <CardLink to="" onClick={() => props.removeVisit(props.id)}
        className="btn btn-primary">Ištrinti</CardLink>
      </CardBody>
    </Card>
  </Col>
      
    // <div className="Visit card">
    //   <div className="row">
    //     <div className="col-12 col-sm-12 col-md-6 col-lg-3 text-center">
    //     </div>
    //     <div className="col-lg-7 text-start">
          // {props.ownerName ? (
          //   <p>
          //     <strong>Pet Owner: </strong>
          //     {props.ownerName}
          //   </p>
          // ) : null}
    //       {props.petName ? (
    //         <p>
    //           <strong>Pet Name: </strong>
    //           {props.petName}
    //         </p>
    //       ) : null}
    //       {props.petOwnerPhoneNumber ? (
    //         <p>
    //           <strong>Pet Owner Phone Name: </strong>
    //           {props.petOwnerPhoneNumber}
    //         </p>
    //       ) : null}
    //       {props.date ? (
    //         <p>
    //           <strong>Date: </strong>
    //           {props.date}
    //         </p>
    //       ) : null}
    //       {props.startTime ? (
    //         <p>
    //           <strong>Start Time: </strong>
    //           {props.startTime}
    //         </p>
    //       ) : null}
    //       {props.eTime ? (
    //         <p>
    //           <strong>End Time: </strong>
    //           {props.eTime}
    //         </p>
    //       ) : null}
    //     </div>
    //     <div className="col-md-2 text-center buttons">
    //         <button
    //           className="btn btn-secondary"
    //           onClick={() => props.removeVisit(props.id)}
    //         >
    //           Remove
    //         </button>
    //     </div>
    //   </div>
    // </div>
  );
}

export default TrainerVisit;
