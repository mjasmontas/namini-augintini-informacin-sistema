import AddVisits from "../components/AddVisits";
import PastVisits from "../components/PastVisits";
import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/UserContext";
import Visit from "../components/VeterinarianVisits/VeterinarianVisit";
import moment from 'moment'

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
    axios.get(`/api/user/${"6083d0c9dcbd704e24d71ec7"}/trainerVisit`).then(response => {
      this.fixTime();
      // let startTime;
      // let endTime;
      // let visitDate;
      // let s;
      // let e;
      // for (var i = 0; i < response.data.veterinarianVisits.length; i++){
      //   if (i === 0){
      //     startTime = moment('9:00', 'HH:mm')
      //     endTime = moment('10:00', 'HH:mm')
      //   } else if (i == 3){
      //     startTime = moment('13:00', 'HH:mm')
      //     endTime = moment('14:00', 'HH:mm')
      //   } else {
      //     startTime = startTime.add(1,'hours')
      //     endTime = endTime.add(1,'hours')
      //   }
      //   s = startTime.format('HH:mm')
      //   e = endTime.format('HH:mm')
      //   var dateObj = moment(response.data.veterinarianVisits[i].startDate);
      //   visitDate = dateObj.add(1, 'days').format('YYYY-MM-DD');

      //   const visit = {
      //     ownerName: response.data.veterinarianVisits[i].petOwner,
      //     petName: response.data.veterinarianVisits[i].petName,
      //     date: visitDate,
      //     sTime: s,
      //     eTime: e
      //   }
        
      //   this.state.visits.push(visit)
      //   console.log(this.state.visits)
      // }
      this.setState({
        visits: response.data.trainerVisits,
        mounted: true
      });
    })
    // this.fixTime();
    this.state.isLoading = false;
  }

  fixTime (){
    var startTime;
    var endTime;
    var s;
    var e;
    var start = "startTime";
    var end = "endTime";
    for (var i = 0; i < this.state.visits.length; i++){
      var test = this.state.visits[i];
      if (i === 0){
        startTime = moment('9:00', 'H:m')
        endTime = moment('10:00', 'H:m')
      } else if (i == 3){
        startTime = moment('13:00', 'H:m')
        endTime = moment('14:00', 'H:m')
      } else {
        s = startTime.add(1,'hours')
        endTime = endTime.add(1,'hours')
        console.log('a')
      }
      s = startTime.format('H:m')
      e = endTime.format('H:m')
    this.state.visits[i].startTime = '455551'
    }

  }

  componentDidUpdate() {
    if (this.state.mounted === false) {
      if (this.state.refreshed === false) {
        axios.get(`/api/user/${"6083d0c9dcbd704e24d71ec7"}/trainerVisits`).then(response => {
          this.fixTime();
          // let startTime;
          // let endTime;
          // let visitDate;
          // let s;
          // let e;
          // this.state.visits = [];
        
          // for (var i = 0; i < response.data.veterinarianVisits.length; i++){
            // if (i === 0){
            //   startTime = moment('9:00', 'HH:mm')
            //   endTime = moment('10:00', 'HH:mm')
            // } else if (i == 3){
            //   startTime = moment('13:00', 'HH:mm')
            //   endTime = moment('14:00', 'HH:mm')
            // } else {
            //   startTime = startTime.add(1,'hours')
            //   endTime = endTime.add(1,'hours')
            // }
            // s = startTime.format('HH:mm')
            // e = endTime.format('HH:mm')
          //   var dateObj = moment(response.data.veterinarianVisits[i].startDate);
          //   visitDate = dateObj.add(1, 'days').format('YYYY-MM-DD');
          
          //   const visit = {
          //     ownerName: response.data.veterinarianVisits[i].petOwner,
          //     petName: response.data.veterinarianVisits[i].petName,
          //     date: visitDate,
          //     sTime: s,
          //     eTime: e
          //   }
          //   this.state.visits.push(visit)
          // }
          this.setState({
            visits: response.data.trainerVisits,
            refreshed: true
          });
        })
          } else {
            this.setState({
              mounted: true
            });
          }
        }
        this.state.isLoading = false;
  }

  removeVisit(){

  }

  render() {
    const { user } = this.context;

    const { isLoading } = this.state;
 
    if (isLoading) {
      return <p>Loading ...</p>;
    }
    return (
      <div className="PetSitter">
        <div className="row">
          <div className="col-6">
            <h2>Visits </h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {this.state.visits < 0 ? (
              <div className="alert alert-warning mt-4" role="alert">
                You don't have any appointments
              </div>
            ) : null}
            { this.state.visits.map(item => (
              <Visit
                key={item._id}
                id={item._id}
                // ownerName={item.ownerName}
                petName={item.petName}
                date={item.date}
                sTime={item.sTime.toString()}
                eTime={item.eTime.toString()}
                removeVisit={this.removeVisit}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Visits;
