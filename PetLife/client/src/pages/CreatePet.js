import React from "react";
import DatePicker from "react-datepicker";
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
    birthday: new Date(),
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
      .addNewPet(this.context.user.id, this.state.image, this.state.petName, this.state.type, this.state.birthday, this.state.allergies, this.state.temperament, this.state.size)
      .then(function() {
        window.location = petFamUrl;
      });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log(this.state.type);
  };

  handleDateChange = date => {
    this.setState({
      birthday: date
    });
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
      <div>
        <h2 className="mb-4">Naujas Augintinis</h2>
        <form>
          <div className="form-group">
            <label>Augintinio Vardas</label>
            <input
              name="petName"
              type="text"
              className="form-control"
              onChange={this.handleInputChange}
              value={this.state.petName}
            />
          </div>
          <div className="form-group">
            <label>Nuotrauka</label>
            <FileUpload onComplete={this.setFile} />
          </div>
          <div class="col-md-12">
            <label>Augintinio Tipas</label>
            <select className="optionSize" onChange={this.handleTypeOptionChange}>
            <option value="Select a pet"> -- Pasirinkite Tipą -- </option>
            <option value="Šuo">Šuo</option>
            <option value="Katė">Katė</option>
            <option value="Paukštis">Paukštis</option>
            <option value="Žiurkėnas">Žiurkėnas</option>
            </select> 
          </div>
          <div className="form-group">
            <label>Gimimo Data</label>
            <DatePicker
              name="bday"
              className="form-control"
              onSelect={this.handleDateChange}
              selected={this.state.birthday}
            />
          </div>
          <div className="form-group">
            <label>Alergijos</label>
            <input
              name="allergies"
              type="text"
              className="form-control"
              onChange={this.handleInputChange}
              value={this.state.allergies}
            />
          </div>
          <div className="form-group">
            <label>Temperamentas</label>
            <input
              name="temperament"
              type="text"
              className="form-control"
              onChange={this.handleInputChange}
              value={this.state.temperament}
            />
          </div>
          <div class="col-md-12">
            <label>Augintinio dydis</label>
            <select className="optionSize" onChange={this.handleSizeOptionChange}>
            <option value="Select a pet"> -- Pasirinkite Dydi -- </option>
            <option value="Mažas">Mažas</option>
            <option value="Vidutinis">Vidutinis</option>
            <option value="Didelis">Didelis</option>
            </select> 
          </div>
          <button
            onClick={this.submitData}
            type="submit"
            className="btn btn-primary profile-button"
          >
            Sukurti Augintinį
          </button>
        </form>
      </div>
    );
  }
}

export default CreatePet;
