import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./rezervacija.css";

function Reservation(props) {
  // let bday = props.birthday.splice(0, -12)

  return (
      
    <div className="PetInfoCard card">
      <div className="row">
        <div className="col-12 col-sm-12 col-md-6 col-lg-3 text-center">
        </div>
        <div className="col-lg-7 text-start">
          {props.petName ? (
            <p>
              <strong>Nickname: </strong>
              {props.petName}
            </p>
          ) : null}
          {props.arrivalDate ? (
            <p>
              <strong>Arrival Date: </strong>
              {props.arrivalDate}
            </p>
          ) : null}
          {props.departureDate ? (
            <p>
              <strong>Departure Date: </strong>
              {props.departureDate.slice(0, -14)}
            </p>
          ) : null}
          {props.clientNotes ? (
            <p>
              <strong>Client Notes: </strong>
              {props.clientNotes}
            </p>
          ) : null}
          {props.price ? (
            <p>
              <strong>Price: </strong>
              {props.price}
            </p>
          ) : null}
        </div>
        <div className="col-md-2 text-center buttons">
        <button
              className="btn btn-secondary"
              onClick={() => props.cancelReservation(props.id)}
            >
              Remove
            </button>
          <Link
            // to={`/user/${user.id}/pets/updatePet`}
            className="btn btn-secondary btn-sm"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Reservation;
