import React from "react";
import "./messageForm.css";
import {
  Card,
  CardBody,
  CardLink,
  CardTitle,
  Col
} from "reactstrap"
import CardSubtitle from "reactstrap/lib/CardSubtitle";
import CardText from "reactstrap/lib/CardText";

function Message(props) {
  // let bday = props.birthday.splice(0, -12)

  return (
    <Col key={props.id} md={4}>
    <Card style={{width: '18rem'}}>
    <CardBody>
      <CardTitle>{props.subject}</CardTitle>
      <CardSubtitle className="mb-2 text-muted">{props.name}</CardSubtitle>
      <CardSubtitle className="mb-2 text-muted">{props.email}</CardSubtitle>
      <CardText>{props.message}</CardText>
        <CardLink to="" onClick={() => props.removeMessage(props.id)}
        className="btn btn-primary">Ištrinti</CardLink>
        <CardLink to="" onClick={() => props.answerMessage(props.id)}
        className="btn btn-primary">Atskayti</CardLink>
      </CardBody>
    </Card>
  </Col>
  );
}

export default Message;
