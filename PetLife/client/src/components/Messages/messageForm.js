import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./messageForm.css";

function Message(props) {
  // let bday = props.birthday.splice(0, -12)

  return (
      
    <div className="PetInfoCard card">
      <div className="row">
        <div className="col-12 col-sm-12 col-md-6 col-lg-3 text-center">
        </div>
        <div className="col-lg-7 text-start">
          {props.name ? (
            <p>
              <strong>Name: </strong>
              {props.name}
            </p>
          ) : null}
          {props.email ? (
            <p>
              <strong>Email: </strong>
              {props.email}
            </p>
          ) : null}
          {props.subject ? (
            <p>
              <strong>Subject: </strong>
              {props.subject}
            </p>
          ) : null}
          {props.message ? (
            <p>
              <strong>Message: </strong>
              {props.message}
            </p>
          ) : null}
        </div>
        <div className="col-md-2 text-center buttons">
        <button
              className="btn btn-secondary"
              onClick={() => props.removeMessage(props.id)}
            >
              Remove
            </button>
        </div>
      </div>
    </div>
  );
}

export default Message;
