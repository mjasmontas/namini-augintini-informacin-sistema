import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import UserContext from "../../context/UserContext";
import PetService from "../../Services/pet.service";
import moment from "moment";
import "./petUpdate.css";

class PetUpdate extends React.Component {
  static contextType = UserContext;

  state = {
    exist: false,
    petName: "",
    image: "",
    type: "",
    years: "",
    allergies: "",
    temperament: "",
    size: "",
    mounted: false,
    refreshed: false,
    isLoading: false,
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    PetService.getPet(this.props.match.params.id).then((res) => {
      this.setState({
        petName: res.data.name,
        type: res.data.type,
        years: res.data.years,
        allergies: res.data.allergies,
        temperament: res.data.temperament,
        size: res.data.size,
        mounted: true,
        isLoading: false,
      });
    });
  }

  componentDidUpdate() {
    if (this.state.mounted === false) {
      if (this.state.refreshed === false) {
        PetService.getPet(this.props.match.params.id).then((res) => {
          this.setState({
            refreshed: true,
            isLoading: false,
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
    let petFamUrl = `/user/${this.context.user.id}/petFamily`;
    PetService.updatePet(
      this.props.match.params.id,
      this.state.petName,
      this.state.type,
      this.state.years,
      this.state.allergies,
      this.state.temperament,
      this.state.size
    ).then(function () {
      window.location = petFamUrl;
    });
  };

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleDateChange = (date) => {
    this.setState({
      birthday: date,
    });
    console.log(this.state.birthday);
  };

  handleTypeOptionChange = (e) => {
    this.setState({
      type: e.target.value,
    });
  };

  handleSizeOptionChange = (e) => {
    this.setState({
      size: e.target.value,
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
          <h4 class="text-right">Atnaujinti augintinį</h4>
        </div>
        <div className="row gutters">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h4 className="mb-2 text-primary">
                      Augintinio informacija
                    </h4>
                  </div>
                  <div class="form-group">
                    <label>Augintinio tipas</label>
                    <div class="col-sm-10">
                      <select
                        class="form-control"
                        value={this.state.type}
                        onChange={this.handleTypeOptionChange}
                      >
                        <option>{this.state.type}</option>
                        {this.state.type !== "Šuo" ? (
                          <option>Šuo</option>
                        ) : null}
                        {this.state.type !== "Katė" ? (
                          <option>Katė</option>
                        ) : null}
                        {this.state.type !== "Paukštis" ? (
                          <option>Paukštis</option>
                        ) : null}
                        {this.state.type !== "Žiurkėnas" ? (
                          <option>Žiurkėnas</option>
                        ) : null}
                        {this.state.type !== "Žuvis" ? (
                          <option>Žuvis</option>
                        ) : null}
                      </select>
                    </div>
                  </div>
                  <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-12">
                    <div className="form-group">
                      <label>Augintinio vardas</label>
                      <input
                        type="text"
                        className="form-control"
                        name="petName"
                        id="petname"
                        placeholder="Įveskite augintinio vardą"
                        onChange={this.handleInputChange}
                        value={this.state.petName}
                      />
                    </div>
                  </div>
                  
                  <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-12">
                    <div className="form-group">
                      <label>Augintinio amžius</label>
                      <input
                        type="text"
                        className="form-control"
                        id="years"
                        name="years"
                        placeholder="Įveskite augintinio amžių"
                        onChange={this.handleInputChange}
                        value={this.state.years}
                      />
                    </div>
                  </div>
                  <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-12">
                    <div className="form-group">
                      <label for="allergies">Alergijos</label>
                      <textarea
                        type="text"
                        className="form-control"
                        id="allergies"
                        name="allergies"
                        rows="2"
                        placeholder="Įveskite augintinio alergijas"
                        onChange={this.handleInputChange}
                        value={this.state.allergies}
                      />
                    </div>
                  </div>
                  <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-12">
                    <div className="form-group">
                      <label for="temperament">Temperamentas</label>
                      <textarea
                        type="text"
                        className="form-control"
                        id="temperament"
                        name="temperament"
                        rows="2"
                        placeholder="Apibūdinkite augintinio temperamentą"
                        onChange={this.handleInputChange}
                        value={this.state.temperament}
                      />
                    </div>
                  </div>
                </div>
                <label>Augintinio dydis</label>
                <div class="col-sm-10">
                  <select
                    class="form-control"
                    value={this.state.size}
                    onChange={this.handleTypeOptionChange}
                  >
                    <option>{this.state.size}</option>
                    {this.state.size !== "Mažas" ? (
                      <option>Mažas</option>
                    ) : null}
                    {this.state.size !== "Vidutinis" ? (
                      <option>Vidutinis</option>
                    ) : null}
                    {this.state.size !== "Didelis" ? (
                      <option>Didelis</option>
                    ) : null}
                  </select>
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
                      Atnaujinti
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

export default PetUpdate;
