import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./VeterinarianVisit.css";

function Visit(props) {
  // let bday = props.birthday.splice(0, -12)

  return (
      
    <div className="Visit card">
      <div className="row">
        <div className="col-12 col-sm-12 col-md-6 col-lg-3 text-center">
        </div>
        <div className="col-lg-7 text-start">
          {props.ownerName ? (
            <p>
              <strong>Pet Owner: </strong>
              {props.ownerName}
            </p>
          ) : null}
          {props.petName ? (
            <p>
              <strong>Pet Name: </strong>
              {props.petName}
            </p>
          ) : null}
          {props.date ? (
            <p>
              <strong>Date: </strong>
              {props.date}
            </p>
          ) : null}
          {props.startTime ? (
            <p>
              <strong>Start Time: </strong>
              {props.startTime}
            </p>
          ) : null}
          {props.eTime ? (
            <p>
              <strong>End Time: </strong>
              {props.eTime}
            </p>
          ) : null}
        </div>
        <div className="col-md-2 text-center buttons">
            <button
              className="btn btn-secondary"
              onClick={() => props.removeVisit(props.id)}
            >
              Remove
            </button>
        </div>
      </div>
    </div>
  );
}

export default Visit;
