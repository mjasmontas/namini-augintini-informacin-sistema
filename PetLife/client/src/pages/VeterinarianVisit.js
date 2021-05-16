import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/UserContext";
import Visit from "../components/VeterinarianVisits/VeterinarianVisit";
import VeterinarService from "../Services/veterinar.service";
import {
  Container,
  Row
} from "reactstrap"

class Visits extends Component {
  static contextType = UserContext;
  state = {
    mounted: false,
    refreshed: false,
    visits: [],
    test: "",
    isLoading: false
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    VeterinarService.getAllVetVisits(this.context.user.id)
    .then(response => {
      this.setState({
        visits: response.data.veterinarianVisits,
        mounted: true,
        isLoading: false
      });
    })
  }

  componentDidUpdate() {
    if (this.state.mounted === false) {
      if (this.state.refreshed === false) {
        VeterinarService.getAllVetVisits(this.context.user.id)
        .then(response => {
          this.setState({
            visits: response.data.veterinarianVisits,
            refreshed: true,
            isLoading: false
          });
        })
          } else {
            this.setState({
              mounted: true
            });
          }
        }
  }

  removeVisit = visitId =>{
    VeterinarService.deleteVetVisit(visitId)
    .then(function(res) {
      console.log("Visit canceled");
    });
    let currentComponent = this;
    VeterinarService.getAllVetVisits(this.context.user.id)
      .then(function(res) {
        currentComponent.setState({
          visits: res.data.veterinarianVisits
        });
      });
  }

  render() {
    const { isLoading } = this.state;
 
    if (isLoading) {
      return <p>Krauanama ...</p>;
    }
    return (
      <div className="content">
      <Container fluid>
        <Container>
          <h2>Veterinaro vizitai</h2>
        </Container>
        <Row>
        {this.state.visits < 1 ? (
          <div className="alert alert-warning mt-4" role="alert">
            Jūs neturite jokių užsakymų
          </div>
        ) : null}

        {this.state.visits.map(item => (
          <Visit
          key={item._id}
          id={item._id}
          ownerName={item.petOwnerName}
          petName={item.petName}
          petOwnerPhoneNumber={item.petOwnerPhoneNumber}
          petType={item.petType}
          petSize={item.petSize}
          trainersNote={item.trainersNote}
          date={item.startDate}
          removeVisit={this.removeVisit}
          />
        ))}
          </Row>
          
          </Container>
      </div>
    );
  }
}

export default Visits;
