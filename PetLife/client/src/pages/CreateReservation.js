import React, {Component} from "react";
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Select from 'react-select'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UserContext from "../context/UserContext";
import axios from "axios";
import e from "cors";

class CreateReservation extends React.Component {
  static contextType = UserContext;

  state = {
    owner: "",
    petOption: [],
    pet: null,
    petName: "",
    arrivalDate: Date,
    departureDate: Date,
    clientNotes: "",
    price: "",
    mounted: false,
    refreshed: false,
  };
  

  componentDidMount() {
    let currentComponent = this;
    axios.get(`/api/user/${this.context.user.id}/petFamily`).then(response => {
      // console.log(response.data.pets);
      currentComponent.setState({
        petOption: response.data.pets,
        mounted: true
      });
      this.getAllPets();
    });
  }
  

  getAllPets(){
    let currentComponent = this;
    axios.get(`/api/user/${this.context.user.id}/petFamily`)
    .then(response => {
      // console.log(response.data.pets);
      const pets = response.data.pets.map(pet => ({
        "value" : pet.name,
        "label" : pet._id
      }));
      currentComponent.setState({
        petOption: pets,
        mounted: true
      });
      console.log(this.state.petOption)
  })
};

  getPetName(petId){
    console.log(petId)
    axios.get(`/api/pet/${petId}/pet`)
    .then(response => {
      this.setState({
        petName: response.data.name
      })
      console.log(response.data.name)
    })
  }

  componentDidUpdate() {
    if (this.state.mounted == false) {
      if (this.state.refreshed == false) {
        let currentComponent = this;
        axios
          .get(`/api/user/${this.context.user.id}/petFamily`)
          .then(response => {
            console.log(response);
            const pets = response.data.pets.map(pet => ({
              "value" : pet.name,
              "label" : pet._id
            }))
            currentComponent.setState({
              petOption: pets,
              refreshed: true
            });
          });
      } else {
        this.setState({
          mounted: true
        });
      }
    }
  }

  submitData = event => {
    event.preventDefault();
    const petNameAdd = this.state.petOption;
    for(var prop in petNameAdd){
      if (petNameAdd[prop].label === this.state.pet){
        this.state.petName = petNameAdd[prop].value;
      }
    }
    const reservationData = {
      owner: this.context.user.id,
      pet: this.state.pet,
      petName: this.state.petName,
      arrivalDate: this.state.arrivalDate,
      departureDate: this.state.departureDate,
      clientNotes: this.state.clientNotes,
      price: this.state.price,
    };
    
    console.log(reservationData);
    let reservationUrl = `/user/${this.context.user.id}/reservations`;
    axios
      .post(`/api/user/${this.context.user.id}/createReservation`, reservationData)
      .then(function() {
        window.location = reservationUrl;
      });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    console.log(this.state.petOption)
    this.setState({ [name]: value });
  };

  handleArrivalDateChange = date => {
    this.setState({
      arrivalDate: date
    });
    console.log(this.state.arrivalDate);
  };

  handleDeaprtureDateChange = date => {
    this.setState({
      departureDate: date
    });
    console.log(this.state.departureDate);
  };

  handleOptionChange = e => {
    console.log(e.target.value);
    this.setState({
      pet: e.target.value
    })
  }

  render() {
    // const {petOption} = this.state;
    // const test = petOption.map(x => {label: x; value: x});
    return (
      <div>
        <h2 className="mb-4">Create A Reservation</h2>
        <form>
          <div className="form-group">
            <select onChange={this.handleOptionChange}>
              <option value="Select a pet"> -- Select a pet -- </option>
              {this.state.petOption.map((pet) => 
                <option key={pet.label} value={pet.label}>{pet.value}</option>
              )}
            </select> 
          </div>
          {/* <div className="form-group">
            <label>Arrival Date</label>
            <DatePicker
              name="arrivalDate"
              className="form-control"
              onSelect={this.handleArrivalDateChange}
              selected={this.state.arrivalDate}
            />
          </div>
          <div className="form-group">
            <label>Departure Date</label>
            <DatePicker
              name="departureDate"
              className="form-control"
              onChange={this.handleDeaprtureDateChange}
              value={this.state.departureDate}
            />
          </div> */}
          <div className="form-group">
            <label>Client Notes</label>
            <input
              name="clientNotes"
              type="text"
              className="form-control"
              onChange={this.handleInputChange}
              value={this.state.clientNotes}
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              name="price"
              type="text"
              className="form-control"
              onChange={this.handleInputChange}
              value={this.state.price}
            />
          </div>
          <button
            onClick={this.submitData}
            type="submit"
            className="btn btn-warning"
          >
            Create A Reservation
          </button>
        </form>
      </div>
    );
  }
}

export default CreateReservation;
