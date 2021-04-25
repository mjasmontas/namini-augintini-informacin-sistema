import React from "react";
import API from "../../utils/API2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FileUpload from "../../upload/fileUpload";
import UserContext from "../../context/UserContext";
import axios from "axios";

function randomComponent(props) {
  return <h1></h1>;
}

class PetUpdate extends React.Component {
  static contextType = UserContext;

  state = {
    exist:false,
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
      .put(`/api/user/${this.context.user.id}/updatePet`, petData)
      .then(function() {
        window.location = petFamUrl;
      });
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleDateChange = date => {
    this.setState({
      birthday: date
    });
    console.log(this.state.birthday);
  };

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
          <div className="form-group">
            <label>Type</label>
            <input
              name="type"
              type="text"
              className="form-control"
              onChange={this.handleInputChange}
              value={this.state.type}
            />
          </div>
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
            <input
              name="size"
              type="text"
              className="form-control"
              onChange={this.handleInputChange}
              value={this.state.size}
            />
          </div>
          <button
            onClick={this.submitData}
            type="submit"
            className="btn btn-warning"
          >
            Update Pet
          </button>
        </form>
      </div>
    );
  }
}

export default PetUpdate;
