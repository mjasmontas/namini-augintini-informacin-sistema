import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UserContext from "../context/UserContext";
import ReservationService from "../Services/reservations.service";
import PetService from "../Services/pet.service";
import UserService from "../Services/user.service";
import VeterinarService from "../Services/veterinar.service";
import petTrainerService from "../Services/petTrainer.service";
import "../components/Reservation/reservation.css";
import moment from "moment";
import "./reservation.css";

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
    price: 0.0,
    dayPrice: 7.5,
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
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    let veterinar;
    let trainer;
    let currentComponent = this;
    PetService.getAllUsersPets(this.context.user.id).then((response) => {
      // console.log(response.data.pets);
      const pets = response.data.pets.map((pet) => ({
        value: pet.name,
        label: pet._id,
      }));
      currentComponent.setState({
        petOption: pets,
        mounted: true,
        isLoading: false,
      });
    });
    UserService.getAllUsers().then((response) => {
      this.state.veterinarians = [];
      this.state.petTrainers = [];
      for (var i = 0; i < response.data.length; i++) {
        if (response.data[i].roles[0] === "6086c27f1c84567930705b45") {
          veterinar = {
            value: response.data[i].firstName + " " + response.data[i].lastName,
            label: response.data[i]._id,
          };
          this.state.veterinarians.push(veterinar);
        }
      }
      for (var i = 0; i < response.data.length; i++) {
        if (response.data[i].roles[0] === "6086c27f1c84567930705b44") {
          trainer = {
            value: response.data[i].firstName + " " + response.data[i].lastName,
            label: response.data[i]._id,
          };
          this.state.petTrainers.push(trainer);
        }
      }
    });
    if (this.context.user.id) {
      UserService.getUser(this.context.user.id).then((response) => {
        this.setState({
          ownerFistName: response.data.firstName,
          ownerLastName: response.data.lastName,
          ownerPhoneNumber: response.data.phoneNumber,
        });
      });
    }
  }

  componentDidUpdate() {
    if (this.state.mounted == false) {
      if (this.state.refreshed == false) {
        let currentComponent = this;
        let veterinar;
        let trainer;
        PetService.getAllUsersPets(this.context.user.id).then((response) => {
          // console.log(response.data.pets);
          const pets = response.data.pets.map((pet) => ({
            value: pet.name,
            label: pet._id,
          }));
          currentComponent.setState({
            petOption: pets,
            refreshed: true,
            isLoading: false,
          });
        });
        UserService.getAllUsers().then((response) => {
          this.state.veterinarians = [];
          this.state.petTrainers = [];
          for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].roles[0] === "6086c27f1c84567930705b45") {
              veterinar = {
                value:
                  response.data[i].firstName + " " + response.data[i].lastName,
                label: response.data[i]._id,
              };
              this.state.veterinarians.push(veterinar);
            }
          }
          for (var i = 0; i < response.data.length; i++) {
            if (response.data[i].roles[0] === "6086c27f1c84567930705b44") {
              trainer = {
                value:
                  response.data[i].firstName + " " + response.data[i].lastName,
                label: response.data[i]._id,
              };
              this.state.petTrainers.push(trainer);
            }
          }
        });
        UserService.getUser(this.context.user.id).then((response) => {
          this.setState({
            ownerFistName: response.data.firstName,
            ownerLastName: response.data.lastName,
            ownerPhoneNumber: response.data.phoneNumber,
          });
        });
      } else {
        this.setState({
          mounted: true,
        });
      }
    }
  }

  submitData = (event) => {
    event.preventDefault();
    const petNameAdd = this.state.petOption;
    for (var prop in petNameAdd) {
      if (petNameAdd[prop].label === this.state.pet) {
        this.state.petName = petNameAdd[prop].value;
      }
    }

    if (this.state.veterinarianVisit) {
      if (!this.state.selectVeterinarian) {
        if (this.state.veterinarians.length === 1) {
          this.state.vet = this.state.veterinarians[0].label;
        } else {
          let size = Math.floor(
            Math.random() * this.state.veterinarians.length
          );
          this.state.vet = this.state.veterinarians[size].label;
        }
      }

      VeterinarService.addNewVetVisit(
        this.state.vet,
        this.context.user.id,
        this.state.ownerFistName + " " + this.state.ownerLastName,
        this.state.pet,
        this.state.petName,
        this.state.veterinarianNote,
        this.state.startDate,
        this.state.endDate
      );
    }

    if (this.state.trainerVisit) {
      if (!this.state.selectTrainer) {
        if (this.state.petTrainers.length === 1) {
          this.state.trainer = this.state.petTrainers[0].label;
        } else {
          let size = Math.floor(Math.random() * this.state.petTrainers.length);
          this.state.trainer = this.state.petTrainers[size].label;
        }
      }

      petTrainerService.addNewTrainerVisit(
        this.state.trainer,
        this.state.ownerFistName + " " + this.state.ownerLastName,
        this.state.ownerPhoneNumber,
        this.state.petName,
        this.state.trainerNote,
        this.state.startDate,
        this.state.endDate
      );
    }

    let reservationUrl = `/user/${this.context.user.id}/reservations`;
    ReservationService.addNewReservation(
      this.context.user.id,
      this.state.pet,
      this.state.petName,
      this.state.startDate,
      this.state.endDate,
      this.state.clientNotes,
      this.state.veterinarianVisit,
      this.state.veterinarianNote,
      this.state.trainerVisit,
      this.state.trainerNote,
      this.state.price
    ).then(function () {
      window.location = reservationUrl;
    });
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleOptionChange = (e) => {
    console.log(e.target.value);
    this.setState({
      pet: e.target.value,
    });
  };

  handleVeterinarianCheckChange = (e) => {
    console.log(parseFloat(this.state.price) + 10);
    this.setState({
      veterinarianVisit: e.target.checked,
      price: (parseFloat(this.state.price) + 10).toFixed(2),
    });
  };
  handleSelectVetChange = (e) => {
    this.setState({
      selectVeterinarian: e.target.checked,
    });
  };

  handleSelectTrainerChange = (e) => {
    this.setState({
      selectTrainer: e.target.checked,
    });
  };

  handleTrainerCheckChange = (e) => {
    this.setState({
      trainerVisit: e.target.checked,
      price: (parseFloat(this.state.price) + 10).toFixed(2),
    });
  };

  handleVetOptionChange = (e) => {
    this.setState({
      vet: e.target.value,
    });
  };

  handleTrainerOptionChange = (e) => {
    console.log(e.target.value);
    this.setState({
      trainer: e.target.value,
    });
  };

  setStartDate = (date) => {
    this.setState({
      startDate: date,
    });
  };

  setEndDate = (date) => {
    this.setState({
      endDate: date,
    });
    var sDate = moment(this.state.startDate);
    var eDate = moment(date);
    console.log(sDate);
    console.log(eDate);
    var dayDifference = eDate.diff(sDate, "days");
    var fullPrice = this.state.dayPrice * dayDifference;
    this.setState({
      price: (Math.round(fullPrice * 100) / 100).toFixed(2),
    });
  };

  render() {
    const { isLoading } = this.state;

    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <div className="container">
        <div class="row gutters">
          <h4 class="text-right">Sukurti rezervaciją</h4>
        </div>
        <div className="row gutters">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h4 className="mb-2 text-primary">
                      Rezervacijos informacija
                    </h4>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="firstName">Atvykimo data</label>
                      <DatePicker
                        wrapperClassName="datePicker"
                        className="form-control"
                        selected={this.state.startDate}
                        selectsStart
                        startDate={this.state.startDate}
                        minDate={this.state.today}
                        endDate={this.state.endDate}
                        name="startDate"
                        onSelect={this.setStartDate}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label for="lastName">Išvykimo data</label>
                      <DatePicker
                        wrapperClassName="datePicker"
                        className="form-control"
                        selected={this.state.endDate}
                        selectsEnd
                        startDate={this.state.startDate}
                        endDate={this.state.endDate}
                        minDate={this.state.startDate}
                        name="endDate"
                        onSelect={this.setEndDate}
                      />
                    </div>
                  </div>
                  <hr />
                  <div class="form-group">
                    <label class="labels">Pasirinkite augintinį</label>
                    <div class="col-sm-10">
                      <select
                        className="form-control"
                        onChange={this.handleOptionChange}
                      >
                        <option value="Select a pet">
                          {" "}
                          -- Pasirinkite augintini --{" "}
                        </option>
                        {this.state.petOption.map((pet) => (
                          <option key={pet.label} value={pet.label}>
                            {pet.value}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-12">
                    <div class="form-check form-switch">
                      <label
                        class="form-check-label"
                        for="flexSwitchCheckDefault"
                      >
                        Ar norite pasirinkti veterinaro visitą?
                      </label>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="flexSwitchCheckDefault"
                        onChange={this.handleVeterinarianCheckChange}
                        checked={this.state.veterinarianVisit}
                      />
                    </div>
                  </div>
                  <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-12">
                    {this.state.veterinarianVisit ? (
                      <div class="form-check form-switch">
                        <label
                          class="form-check-label"
                          for="flexSwitchCheckDefault"
                        >
                          Ar norite pasirinkti veterinarą?
                        </label>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="flexSwitchCheckDefault"
                          onChange={this.handleSelectVetChange}
                          checked={this.state.selectVeterinarian}
                        />
                      </div>
                    ) : null}
                  </div>

                  <div class="form-group">
                    {this.state.selectVeterinarian &&
                    this.state.veterinarianVisit ? (
                      <div class="col-sm-10">
                        <label className="workers">Veterinaras: </label>
                        <select
                          className="form-control"
                          onChange={this.handleVetOptionChange}
                        >
                          <option value="Select a pet">
                            {" "}
                            -- Pasirinkti Veterinarą --{" "}
                          </option>
                          {this.state.veterinarians.map((veterinarian) => (
                            <option
                              key={veterinarian.label}
                              value={veterinarian.label}
                            >
                              {veterinarian.value}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : null}
                  </div>
                  <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-12">
                    {this.state.veterinarianVisit ? (
                      <div className="form-group">
                        <label for="veterinarianNote">
                          Užrašai veterinarui
                        </label>
                        <textarea
                          type="text"
                          name="veterinarianNote"
                          className="form-control"
                          id="veterinarianNotes"
                          rows="2"
                          placeholder="Įveskite užrašus veterinarui"
                          onChange={this.handleInputChange}
                          value={this.state.veterinarianNote}
                        />
                      </div>
                    ) : null}
                  </div>
                  <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-12">
                    <div class="form-check form-switch">
                      <label class="form-check-label" for="trainerVisit">
                        Ar norite pasirinkti augintinio trenerio vizitą?
                      </label>
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="trainerVisit"
                        onChange={this.handleTrainerCheckChange}
                        checked={this.state.trainerVisit}
                      />
                    </div>
                  </div>
                  <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-12">
                    {this.state.trainerVisit ? (
                      <div class="form-check form-switch">
                        <label
                          class="form-check-label"
                          for="flexSwitchCheckDefault"
                        >
                          Ar norite pasirinkti augintinio trenerį?
                        </label>
                        <input
                          class="form-check-input"
                          type="checkbox"
                          id="selectTrainer"
                          onChange={this.handleSelectTrainerChange}
                          checked={this.state.selectTrainer}
                        />
                      </div>
                    ) : null}
                  </div>
                  <div class="form-group">
                    {this.state.trainerVisit && this.state.selectTrainer ? (
                      <div class="col-sm-10">
                        <label className="workers">Augintinio treneris: </label>
                        <select
                          className="form-control"
                          onChange={this.handleTrainerOptionChange}
                        >
                          <option value="Select a pet">
                            {" "}
                            -- Pasirinkti trenerį --{" "}
                          </option>
                          {this.state.petTrainers.map((trainer) => (
                            <option key={trainer.label} value={trainer.label}>
                              {trainer.value}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : null}
                  </div>
                  <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-12">
                    {this.state.trainerVisit ? (
                      <div className="form-group">
                        <label for="trainerNote">
                          Užrašai augintinio treneriui
                        </label>
                        <textarea
                          type="text"
                          name="trainerNote"
                          className="form-control"
                          id="trainerNote"
                          rows="2"
                          placeholder="Įveskite užrašus augintinio treneriui"
                          onChange={this.handleInputChange}
                          value={this.state.trainerNote}
                        />
                      </div>
                    ) : null}
                  </div>

                  <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-12">
                    <div className="form-group lineSpacing">
                      <label for="clientNotes">Jūsų prašymai</label>
                      <textarea
                        type="text"
                        name="clientNotes"
                        className="form-control"
                        id="clientNotes"
                        rows="2"
                        placeholder="Įveskite savo prašymus rezervacijai"
                        onChange={this.handleInputChange}
                        value={this.state.clientNotes}
                      />
                    </div>
                  </div>
                  <hr />
                  <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-12">
                    <label>Kaina</label>
                    <input
                      name="price"
                      type="text"
                      readOnly="readonly"
                      className="form-control"
                      onChange={this.handleInputChange}
                      value={this.state.price}
                    />
                  </div>
                </div>
              </div>
              <div class="row gutters buttons">
                <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                  <div class="text-right">
                    <button
                      type="button"
                      onClick={this.submitData}
                      id="submit"
                      name="submit"
                      class="btn btn-primary"
                    >
                      Sukurti
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateReservation;
