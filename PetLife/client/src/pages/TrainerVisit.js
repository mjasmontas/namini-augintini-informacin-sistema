import React, { Component } from "react";
import UserContext from "../context/UserContext";
import Visit from "../components/petTrainer/TrainerVisit";
import moment from 'moment'
import TrainerService from "../Services/petTrainer.service";
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
    TrainerService.getAllTrainersVisits(this.context.user.id)
    .then(response => {
      this.setState({
        visits: response.data.trainerVisits,
        mounted: true,
        isLoading: false
      });
    })
  }

  // fixTime (){
  //   var startTime;
  //   var endTime;
  //   var s;
  //   var e;
  //   var start = "startTime";
  //   var end = "endTime";
  //   for (var i = 0; i < this.state.visits.length; i++){
  //     var test = this.state.visits[i];
  //     if (i === 0){
  //       startTime = moment('9:00', 'H:m')
  //       endTime = moment('10:00', 'H:m')
  //     } else if (i == 3){
  //       startTime = moment('13:00', 'H:m')
  //       endTime = moment('14:00', 'H:m')
  //     } else {
  //       s = startTime.add(1,'hours')
  //       endTime = endTime.add(1,'hours')
  //       console.log('a')
  //     }
  //     s = startTime.format('H:m')
  //     e = endTime.format('H:m')
  //   this.state.visits[i].startTime = '455551'
  //   }

  // }

  componentDidUpdate() {
    if (this.state.mounted === false) {
      if (this.state.refreshed === false) {
        TrainerService.getAllTrainersVisits(this.context.user.id)
        .then(response => {
          this.setState({
            visits: response.data.trainerVisits,
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
    TrainerService.deleteTrainerVisit(visitId)
    .then(function(res) {
      console.log("Visit canceled");
    });
    let currentComponent = this;
    TrainerService.getAllTrainersVisits(this.context.user.id)
      .then(function(res) {
        currentComponent.setState({
          visits: res.data.trainerVisits
        });
      });
  }

  render() {

    const { isLoading } = this.state;
 
    if (isLoading) {
      return <p>Loading ...</p>;
    }
    return (
      <div className="content">
      <Container fluid>
        <Container>
          <h2>Trenerio visitai</h2>
        </Container>
        <Row>
        {this.state.visits < 1 ? (
          <div className="alert alert-warning mt-4" role="alert">
            Jūs neturite jokių treneravimo užsakymų
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
