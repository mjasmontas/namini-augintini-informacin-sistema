import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./petInfoCard.css";
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

const imgStyle = {
  maxHeight: 180,
  maxWidth: 400
}

function PetInfoCard(props) {
  // let bday = props.birthday.splice(0, -12)
  const date = moment(props.birthday).format('YYYY-MM-DD')
  const placeholderImg =
    "https://www.missingdogsuk.co.uk/wp-content/plugins/wp-job-manager-resumes/assets/images/candidate.png";
    return (
      <Col key={props.id} md={4} style={{padding: 10}}>
        <Card className="text-center" >
        <CardImg top width="20%" top heigth="10%" src={props.image || placeholderImg} style={imgStyle} alt="Card image cap" />
          <CardBody>
          <CardTitle tag="p">Vardas: {props.name}</CardTitle>
            <div className="data">
              <p className="card-category">Tipas: {props.type}</p>
              <p className="card-category">Gimimo Data: {date}</p>
              <p className="card-category">Dydis: {props.size}</p>
              <p />
              <hr />
            </div>
            <Link to={`/pet/${props.id}`} className="btn btn-primary">Atnaujinti</Link>
            <CardLink to="" onClick={props.deletePet.bind(this, props.id)}
            className="btn btn-primary">Ištrinti</CardLink>
          </CardBody>
        </Card>
      </Col>
    )
}

export default PetInfoCard;
