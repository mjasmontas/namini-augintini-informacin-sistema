import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import "./userInfoCard.css";

function UserInfoCard(props) {
  // let bday = props.birthday.splice(0, -12)
  const placeholderImg =
    "https://www.missingdogsuk.co.uk/wp-content/plugins/wp-job-manager-resumes/assets/images/candidate.png";
  return (
    <div className="PetInfoCard card">
      <div className="row">
        <div className="col-lg-7 text-start">
          {props.firstName ? (
            <p>
              <strong>First Name: </strong>
              {props.firstName}
            </p>
          ) : null}
          {props.lastName ? (
            <p>
              <strong>Last Name: </strong>
              {props.lastName}
            </p>
          ) : null}
          {props.email ? (
            <p>
              <strong>Email: </strong>
              {props.email}
            </p>
          ) : null}
          {props.veterinarian ? (
            <p>
              <strong>Is User a Veterinarian: </strong>
              {props.veterinarian}
            </p>
          ) : null}
          {props.petTrainer ? (
            <p>
              <strong>Is User a Pet Trainer: </strong>
              {props.petTrainer}
            </p>
          ) : null}
          {props.simpleUser ? (
            <p>
              <strong>Is User Simple: </strong>
              {props.simpleUser}
            </p>
          ) : null}
        </div>
        <div className="col-md-2 text-center buttons">
          <Link
            to={`/admin/users/${props.id}`}
            className="btn btn-secondary btn-sm"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}

export default UserInfoCard;
