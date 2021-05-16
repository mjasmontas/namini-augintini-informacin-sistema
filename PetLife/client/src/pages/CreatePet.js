import React from "react";
import "react-datepicker/dist/react-datepicker.css";
import FileUpload from "../upload/fileUpload";
import UserContext from "../context/UserContext";
import PetService from "../Services/pet.service";

class CreatePet extends React.Component {
  static contextType = UserContext;

  state = {
    petName: "",
    image: "",
    type: "",
    years: "",
    allergies: "",
    temperament: "",
    size: "",
    errors: {
      petName: '',
      type: '',
      birthday: '',
      size: ''
    }
  };

  setFile = filePath => {
    console.log(filePath);
    this.setState({
      image: filePath
    });
    console.log(this.state);
  };

  submitData = event => {
    event.preventDefault();
    let petFamUrl = `/user/${this.context.user.id}/petFamily`;
    console.log(this.state.type)
    PetService
      .addNewPet(this.context.user.id, this.state.image, this.state.petName, this.state.type, this.state.years, this.state.allergies, this.state.temperament, this.state.size)
      .then(function() {
        window.location = petFamUrl;
      });
  };

  handleInputChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };


  handleTypeOptionChange = e => {
    console.log(e.target.value);
    this.setState({
      type: e.target.value
    })
  }

  handleSizeOptionChange = e => {
    console.log(e.target.value);
    this.setState({
      size: e.target.value
    })
  }

  render() {
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
                        <option>-- Pasirinkite augintinio tipą --</option>
                          <option>Šuo</option>
                          <option>Katė</option>
                          <option>Paukštis</option>                       
                          <option>Žiurkėnas</option>
                          <option>Žuvis</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-12">
                    <div className="form-group">
                      <label>Augintinio vardas</label>
                      <input
                        type="text"
                        name="petName"
                        className="form-control"
                        placeholder="Įveskite augintinio vardą"
                        onChange={this.handleInputChange}
                        value={this.state.petName}
                      />
                    </div>
                  </div>
                  
                  <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-12">
                    <div className="form-group">
                      <label>Augintinio nuotauka</label>
                      <FileUpload onComplete={this.setFile} />
                    </div>
                  </div>
                  
                  <div className="col-xl-10 col-lg-10 col-md-10 col-sm-10 col-12">
                    <div className="form-group">
                      <label>Augintinio amžius</label>
                      <input
                        type="text"
                        name="years"
                        className="form-control"
                        id="years"
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
                        name="allergies"
                        className="form-control"
                        id="allergies"
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
                        name="temperament"
                        className="form-control"
                        id="temperament"
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
                    onChange={this.handleSizeOptionChange}
                  >
                    <option>-- Pasirinkite augintinio dydį --</option>
                      <option>Mažas</option>
                      <option>Vidutinis</option>
                      <option>Didelis</option>
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

export default CreatePet;
