import React from "react";
import "./VeterinarianVisit.css";
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
} from "reactstrap"
import moment from 'moment'

function Visit(props) {
  // let bday = props.birthday.splice(0, -12)
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
          
          {props.veterinarianNotes ? (
            <p className="card-category">Šeimininko komentaras: {props.veterinarianNotes}</p>
          ) : null}
          <p />
          <hr />
        </div>
        <CardLink to="" onClick={() => props.removeVisit(props.id)}
        className="btn btn-primary">Ištrinti</CardLink>
      </CardBody>
    </Card>
  </Col>
  );
}

export default Visit;
