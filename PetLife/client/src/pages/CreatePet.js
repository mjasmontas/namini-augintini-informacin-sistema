import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FileUpload from "../upload/fileUpload";
import UserContext from "../context/UserContext";
import axios from "axios";

class CreatePet extends React.Component {
  static contextType = UserContext;

  state = {
    petName: "",
    image: "",
    type: "",
    birthday: new Date(),
    allergies: "",
    temperament: "",
    size: ""
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
    const petData = {
      name: this.state.petName,
      type: this.state.type,
      birthday: this.state.birthday,
      allergies: this.state.allergies,
      temperament: this.state.temperament,
      size: this.state.size,
      image: this.state.image
    };
    console.log(petData);
    let petFamUrl = `/user/${this.context.user.id}/petFamily`;
    axios
      .post(`/api/user/${this.context.user.id}/createPet`, petData)
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
        <h2 className="mb-4">New Pet</h2>
        <form>
          <div className="form-group">
            <label>Pet Name</label>
            <input
              name="petName"
              type="text"
              className="form-control"
              onChange={this.handleInputChange}
              value={this.state.petName}
            />
          </div>
          <div className="form-group">
            <label>Picture</label>
            <FileUpload onComplete={this.setFile} />
          </div>
          {/* <div className="form-group">
            <label>Type</label>
            <input
              name="type"
              type="text"
              className="form-control"
              onChange={this.handleInputChange}
              value={this.state.type}
            />
          </div> */}
          <select onChange={this.handleTypeOptionChange}>
            <option value="Select A Type"> -- Select A Type -- </option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Bird">Bird</option>
            <option value="Hamster">Hamster</option>
          </select> 
          <div className="form-group">
            <label>Birthday</label>
            <DatePicker
              name="bday"
              className="form-control"
              onSelect={this.handleDateChange}
              selected={this.state.birthday}
            />
          </div>
          <div className="form-group">
            <label>Allergies</label>
            <input
              name="allergies"
              type="text"
              className="form-control"
              onChange={this.handleInputChange}
              value={this.state.allergies}
            />
          </div>
          <div className="form-group">
            <label>Temperament</label>
            <input
              name="temperament"
              type="text"
              className="form-control"
              onChange={this.handleInputChange}
              value={this.state.temperament}
            />
          </div>
          <div className="form-group">
            <label>Size</label>
            <select onChange={this.handleSizeOptionChange}>
              <option value="Select A Type"> -- Select A Size -- </option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
          </select> 
          </div>
          <button
            onClick={this.submitData}
            type="submit"
            className="btn btn-warning"
          >
            Submit Pet
          </button>
        </form>
      </div>
    );
  }
}

export default CreatePet;
