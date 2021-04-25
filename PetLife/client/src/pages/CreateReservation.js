import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import UserContext from "../context/UserContext";
const { RangePicker } = DatePicker;

class CreateReservation extends React.Component {
  static contextType = UserContext;

  state = {
    owner: "",
    petOption: [],
    veterinarians: [],
    ownerFistName: "",
    ownerLastName: "",
    vet: null,
    pet: null,
    petName: "",
    clientNotes: "",
    price: "",
    mounted: false,
    refreshed: false,
    veterinarianVisit: false,
    selectVeterinarian: false,
    veterinarianNote: "",
    trainerVisit: false,
    trainerNote: "",
    startDate: new Date(),
    endDate: new Date(),
    today: new Date()
  };

  

  componentDidMount() {
    let currentComponent = this;
    let test;
    this.state.veterinarians = [];
    axios.get(`/api/user/${this.context.user.id}/petFamily`).then(response => {
      this.getAllPets();
    });
    axios.get(`/api/users`)
    .then(response => {
      console.log(response.data.length)
      for (var i = 0; i < response.data.length;i++){
        if (response.data[i].veterinarian){
          console.log("sfafsdfbsdbjhsfdbjhsdbjhs")
          test = {
            "value": response.data[i].firstName + " " + response.data[i].lastName,
            "label": response.data[i]._id
          }
          this.state.veterinarians.push(test)
        }
      }
    });
    axios.get(`/api/users/${this.context.user.id}`)
      .then(response => {
        this.setState({
          ownerFistName: response.data.firstName,
          ownerLastName: response.data.lastName
        })
      });
    console.log(this.state.veterinarians)
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

  componentDidUpdate() {
    if (this.state.mounted == false) {
      if (this.state.refreshed == false) {
        let currentComponent = this;
        this.state.veterinarians = [];
        let test;
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
        
        axios.get(`/api/users`)
        .then(response => {
          console.log(response.data.length)
          for (var i = 0; i < response.data.length;i++){
            if (response.data[i].veterinarian){
              test = {
                "value": response.data[i].firstName + " " + response.data[i].lastName,
                "label": response.data[i]._id
              }
              this.state.veterinarians.push(test)
            }
          }
        });
        axios.get(`/api/users/${this.context.user.id}`)
          .then(response => {
            this.setState({
              ownerFistName: response.data.firstName,
              ownerLastName: response.data.lastName
            })
          })
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
      startDate: this.state.startDate,
      endDate: this.state.endDate,
      clientNotes: this.state.clientNotes,
      veterinarianVisit: this.state.veterinarianVisit,
      veterinarianNote: this.state.veterinarianNote,
      trainerVisit: this.state.trainerVisit,
      trainerNote: this.state.trainerNote,
      price: this.state.price,
    };

    if (this.state.veterinarianVisit){
      if (!this.state.selectVeterinarian){
        if (this.state.veterinarians.length === 1){
          this.state.vet = this.state.veterinarians[0].label
        } 
        else {
          let size = Math.floor(Math.random() * this.state.veterinarians.length)
          this.state.vet = this.state.veterinarians[size].label
        }
      }

      const veterinarianVisit = {
        veterinarianId: this.state.vet,
        pet: this.state.pet,
        ownerName: this.state.ownerFistName + " " + this.state.ownerLastName,
        petName: this.state.petName,
        veterinarianNote: this.state.veterinarianNote,
        startDate: this.state.startDate,
        endDate: this.state.endDate,
      }

      axios
      .post(`/api/user/${this.state.vet}/veterinarian`, veterinarianVisit)
    }
    
    let reservationUrl = `/user/${this.context.user.id}/reservations`;
    axios
      .post(`/api/user/${this.context.user.id}/createReservation`, reservationData)
      .then(function() {
        window.location = reservationUrl;
      });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log(this.state.selectVeterinarian)
  };

  handleOptionChange = e => {
    console.log(e.target.value);
    this.setState({
      pet: e.target.value
    })
  }

  handleVeterinarianCheckChange = e => {
    this.setState({
      veterinarianVisit: e.target.checked
    })
  }
  handleSelectVetChange = e => {
    this.setState({
      selectVeterinarian: e.target.checked
    })
  }

  handleTrainerCheckChange = e => {
    console.log(e.target.checked);
    this.setState({
      trainerVisit: e.target.checked
    })
  }

  handleVetOptionChange = e => {
    this.setState({
      vet: e.target.value
    })
  }

  setStartDate = date => {
    this.setState({
      startDate: date
    })
  }

  setEndDate = date => {
    this.setState({
      endDate: date
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
          <div>
            <DatePicker
             selected={this.state.startDate}
             selectsStart
             startDate={this.state.startDate}
             minDate={this.state.today}
             endDate={this.state.endDate}
             name="startDate"
             onSelect={this.setStartDate}
            />
            <DatePicker
             selected={this.state.endDate}
             selectsEnd
             startDate={this.state.startDate}
             endDate={this.state.endDate}
             minDate={this.state.startDate}
             name="endDate"
             onSelect={this.setEndDate}
            />
          </div>
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
            <label>Veterinarian Visit</label>
            <input
              name="veterinarianVisit"
              type="checkbox"
              onChange={this.handleVeterinarianCheckChange}
              checked={this.state.veterinarianVisit}
            />
          </div>
          {this.state.veterinarianVisit ? (
            <div className="form-group">
            <label>Do you want to select a veterinarian</label>
            <input
              name="veterinarianVisit"
              type="checkbox"
              onChange={this.handleSelectVetChange}
              checked={this.state.selectVeterinarian}
            />
          </div>
          ) : null }
          {(this.state.selectVeterinarian && this.state.veterinarianVisit) ? (
            <div className="form-group">
              <select onChange={this.handleVetOptionChange}>
                <option value="Select a pet"> -- Select a Veterinarian -- </option>
                {this.state.veterinarians.map((veterinarian) => 
                  <option key={veterinarian.label} value={veterinarian.label}>{veterinarian.value}</option>
                )}
              </select> 
            </div>
          ) : null }
          {this.state.veterinarianVisit ? (
            <div className="form-group">
            <label>Veterinarian Note</label>
            <input
              name="veterinarianNote"
              className="form-control"
              type="text"
              onChange={this.handleInputChange}
              value={this.state.veterinarianNote}
            />
          </div>
          ) : null }
          <div className="form-group">
            <label>Trainer Visit</label>
            <input
              name="trainerVisit"
              type="checkbox"
              onChange={this.handleTrainerCheckChange}
              checked={this.state.trainerVisit}
            />
          </div>
          {this.state.trainerVisit ? (
            <div className="form-group">
            <label>Trainer note</label>
            <input
              name="trainerNote"
              className="form-control"
              type="text"
              onChange={this.handleInputChange}
              value={this.state.trainerNote}
            />
          </div>
          ) : null }
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
