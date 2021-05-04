import React, {useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UserContext from "../context/UserContext";
import ReservationService from "../Services/reservations.service";
import PetService from "../Services/pet.service";
import UserService from "../Services/user.service";
import VeterinarService from "../Services/veterinar.service";
import petTrainerService from "../Services/petTrainer.service";
import "../components/Reservation/reservation.css";

class CreateReservation extends React.Component {
  static contextType = UserContext;

  state = {
    owner: "",
    petOption: [],
    veterinarians: [],
    petTrainers: [],
    ownerFistName: "",
    ownerLastName: "",
    ownerPhoneNumber: "",
    vet: null,
    pet: null,
    petName: "",
    clientNotes: "",
    price: "",
    veterinarianVisit: false,
    selectVeterinarian: false,
    selectTrainer: false,
    veterinarianNote: "",
    trainerVisit: false,
    trainerNote: "",
    startDate: new Date(),
    endDate: new Date(),
    today: new Date(),
    mounted: false,
    refreshed: false,
    isLoading: false
  };

  

  componentDidMount() {
    this.setState({ isLoading: true });
    let veterinar;
    let trainer;
    let currentComponent = this;
    PetService.getAllUsersPets(this.context.user.id)
    .then(response => {
      // console.log(response.data.pets);
      const pets = response.data.pets.map(pet => ({
        "value" : pet.name,
        "label" : pet._id
      }));
      currentComponent.setState({
        petOption: pets,
        mounted: true,
        isLoading: false
      });
  })
    UserService.getAllUsers()
    .then(response => {
      this.state.veterinarians = [];
      this.state.petTrainers = [];
      for (var i = 0; i < response.data.length;i++){
        if (response.data[i].roles[0] === '6086c27f1c84567930705b45'){
          veterinar = {
            "value": response.data[i].firstName + " " + response.data[i].lastName,
            "label": response.data[i]._id
          }
          this.state.veterinarians.push(veterinar)
        }
      }
      for (var i = 0; i < response.data.length;i++){
        if (response.data[i].roles[0] === '6086c27f1c84567930705b44'){
          trainer = {
            "value": response.data[i].firstName + " " + response.data[i].lastName,
            "label": response.data[i]._id
          }
          this.state.petTrainers.push(trainer)
        }
      }
    });
    if (this.context.user.id) {
      UserService.getUser(this.context.user.id)
      .then(response => {
        this.setState({
          ownerFistName: response.data.firstName,
          ownerLastName: response.data.lastName,
          ownerPhoneNumber: response.data.phoneNumber
        })
      });
    }
    

  }

  componentDidUpdate() {
    if (this.state.mounted == false) {
      if (this.state.refreshed == false) {
        let currentComponent = this;
        let veterinar;
        let trainer;
        PetService.getAllUsersPets(this.context.user.id)
        .then(response => {
          // console.log(response.data.pets);
          const pets = response.data.pets.map(pet => ({
            "value" : pet.name,
            "label" : pet._id
          }));
          currentComponent.setState({
            petOption: pets,
            refreshed: true,
            isLoading: false
          });
      })
        UserService.getAllUsers()
          .then(response => {
            this.state.veterinarians = [];
            this.state.petTrainers = [];
            for (var i = 0; i < response.data.length;i++){
              if (response.data[i].roles[0] === '6086c27f1c84567930705b45'){
                veterinar = {
                  "value": response.data[i].firstName + " " + response.data[i].lastName,
                  "label": response.data[i]._id
                }
                this.state.veterinarians.push(veterinar)
              }
            }
            for (var i = 0; i < response.data.length;i++){
              if (response.data[i].roles[0] === '6086c27f1c84567930705b44'){
                trainer = {
                  "value": response.data[i].firstName + " " + response.data[i].lastName,
                  "label": response.data[i]._id
                }
                this.state.petTrainers.push(trainer)
              }
            }
          });
        UserService.getUser(this.context.user.id)
          .then(response => {
            this.setState({
              ownerFistName: response.data.firstName,
              ownerLastName: response.data.lastName,
              ownerPhoneNumber: response.data.phoneNumber
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

      VeterinarService.addNewVetVisit(this.state.vet, this.context.user.id, this.state.ownerFistName + " " + this.state.ownerLastName,
      this.state.pet, this.state.petName, this.state.veterinarianNote, this.state.startDate, this.state.endDate)
    }
    
    if (this.state.trainerVisit){
      if (!this.state.selectTrainer){
        if (this.state.petTrainers.length === 1){
          this.state.trainer = this.state.petTrainers[0].label
        } 
        else {
          let size = Math.floor(Math.random() * this.state.petTrainers.length)
          this.state.trainer = this.state.petTrainers[size].label
        }
      }
      
      petTrainerService.addNewTrainerVisit(this.state.trainer, this.state.ownerFistName + " " + this.state.ownerLastName,
      this.state.ownerPhoneNumber, this.state.petName, this.state.trainerNote, this.state.startDate, this.state.endDate)
    } 

    let reservationUrl = `/user/${this.context.user.id}/reservations`;
    ReservationService.addNewReservation(this.context.user.id, this.state.pet, this.state.petName, this.state.startDate, 
        this.state.endDate, this.state.clientNotes, this.state.veterinarianVisit, 
        this.state.veterinarianNote, this.state.trainerVisit, this.state.trainerNote, this.state.price)
      .then(function() {
        window.location = reservationUrl;
      });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
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
  
  handleSelectTrainerChange = e => {
    this.setState({
      selectTrainer: e.target.checked
    })
  }

  handleTrainerCheckChange = e => {
    this.setState({
      trainerVisit: e.target.checked
    })
  }

  handleVetOptionChange = e => {
    this.setState({
      vet: e.target.value
    })
  }

  handleTrainerOptionChange = e => {
    console.log(e.target.value)
    this.setState({
      trainer: e.target.value
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
    
    const { isLoading } = this.state;
 
    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <div>
        <div>
            <div>
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-right">Sukurti Rezervaciją</h4>
                </div>
                    <div class="col-md-12">
                      <label class="labels">Palikimo Data</label>
                      <DatePicker
                        wrapperClassName="datePicker"
                        selected={this.state.startDate}
                        selectsStart
                        startDate={this.state.startDate}
                        minDate={this.state.today}
                        endDate={this.state.endDate}
                        name="startDate"
                        onSelect={this.setStartDate}
                       />
                       <DatePicker
                        wrapperClassName="datePicker"
                        selected={this.state.endDate}
                        selectsEnd
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        minDate={this.state.startDate}
                        name="endDate"
                        onSelect={this.setEndDate}
                       />
                      </div>
                    <div class="col-md-12">
                      <label class="labels">Pasirinkite Augintinį</label>
                      <select className="optionSize" onChange={this.handleOptionChange}>
                      <option value="Select a pet"> -- Pasirinkite augintini -- </option>
                      {this.state.petOption.map((pet) => 
                        <option key={pet.label} value={pet.label}>{pet.value}</option>
                      )}
                      </select> 
                    </div>
                    <div class="col-md-12">
                    <label>Ar norite pasirinkti Veterinaro Visitą?</label>
                      <input
                        name="veterinarianVisit"
                        type="checkbox"
                        onChange={this.handleVeterinarianCheckChange}
                        checked={this.state.veterinarianVisit}
                      />
                      </div>
                      <div className="col-md-12">
                      {this.state.veterinarianVisit ? (
                        <div className="form-group">
                        <label>Ar norite pasirinkti veterinarą?</label>
                        <input
                          name="veterinarianVisit"
                          type="checkbox"
                          onChange={this.handleSelectVetChange}
                          checked={this.state.selectVeterinarian}
                        />
                        </div>
                        ) : null }
                      </div>
                      <div className="col-md-12">
                      {(this.state.selectVeterinarian && this.state.veterinarianVisit) ? (
                        <div className="form-group">
                          <label className="workers">Veterinaras: </label>
                          <select onChange={this.handleVetOptionChange}>
                            <option value="Select a pet"> -- Pasirinkti Veterinarą -- </option>
                            {this.state.veterinarians.map((veterinarian) => 
                              <option key={veterinarian.label} value={veterinarian.label}>{veterinarian.value}</option>
                            )}
                          </select> 
                          </div>
                        ) : null }
                      </div>
                      {this.state.veterinarianVisit ? (
                        <div className="col-md-12">
                        <label>Užrašai veterinarui</label>
                        <input
                          name="veterinarianNote"
                          className="form-control"
                          type="text"
                          onChange={this.handleInputChange}
                          value={this.state.veterinarianNote}
                        />
                        </div>
                        ) : null }
                    <div class="col-md-12">
                      <label>Ar norite pasirinkti augintinio trenerio visitą?</label>
                      <input
                        name="trainerVisit"
                        type="checkbox"
                        onChange={this.handleTrainerCheckChange}
                        checked={this.state.trainerVisit}
                      />
                      </div>
                      <div className="col-md-12">
                      {this.state.trainerVisit ? (
                        <div>
                        <label>Ar norite pasirinkti trenerį?</label>
                        <input
                          name="veterinarianVisit"
                          type="checkbox"
                          onChange={this.handleSelectTrainerChange}
                          checked={this.state.selectTrainer}
                        />
                        </div>
                        ) : null }
                      </div>
                      <div className="col-md-12">
                      {(this.state.trainerVisit && this.state.selectTrainer) ? (
                        <div className="form-group">
                        <label className="workers">Augintinio Treneris: </label>
                          <select onChange={this.handleTrainerOptionChange}>
                            <option value="Select a pet"> -- Pasirinkite trenerį -- </option>
                            {this.state.petTrainers.map((trainer) => 
                              <option key={trainer.label} value={trainer.label}>{trainer.value}</option>
                            )}
                          </select> 
                        </div>
                      ) : null }
                      </div>
                      <div className="col-md-12">
                      {this.state.trainerVisit ? (
                        <div>
                        <label>Užrašai Augintinio treneriui</label>
                        <input
                          name="trainerNote"
                          className="form-control"
                          type="text"
                          onChange={this.handleInputChange}
                          value={this.state.trainerNote}
                        />
                      </div>
                      ) : null }
                      </div>
                      <hr />
                        <div class="col-md-12">
                        <label>Kaina</label>
                          <input
                            name="price"
                            type="text"
                            className="form-control"
                            onChange={this.handleInputChange}
                            value={this.state.price}
                          />
                        </div>
                <div class="mt-5 text-center"><button class="btn btn-primary profile-button" onClick={this.submitData} type="button">Sukurti rezervaiją</button></div>
            </div>
            </div>
        </div>
    );
  }
}

export default CreateReservation;
