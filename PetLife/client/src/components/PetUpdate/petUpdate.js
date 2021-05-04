import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FileUpload from "../../upload/fileUpload";
import {
  Card,
  CardHeader,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Button
} from "reactstrap";
import UserContext from "../../context/UserContext";
import PetService from "../../Services/pet.service";
import moment from 'moment'
import "./petUpdate.css";


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
    size: "",
    mounted: false,
    refreshed: false,
    isLoading: false
  };

    
  componentDidMount() {
    this.setState({ isLoading: true });
    PetService.getPet(this.props.match.params.id).then(res => {
        // this.state.petName = res.data.name;
        // this.state.image = res.data.image;
        // this.state.type = res.data.type;
        // this.state.birthday = moment(res.data.birthday).toDate();
        // this.state.allergies = res.data.allergies;
        // this.state.temperament = res.data.temperament;
        // this.state.size = res.data.size;
        console.log(res.data.type)
        

      this.setState({
        petName: res.data.name,
        type: res.data.type,
        // birthday: moment(res.data.birthday).toDate(),
        birthday: res.data.birthday,
        allergies: res.data.allergies,
        temperament: res.data.temperament,
        size: res.data.size,
        mounted: true,
        isLoading: false
      });
    });   
  }

  componentDidUpdate() {
    if (this.state.mounted === false) {
      if (this.state.refreshed === false) {
        PetService.getPet(this.props.match.params.id).then(res => {
          this.setState({
            refreshed: true,
            isLoading: false
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
    let petFamUrl = `/user/${this.context.user.id}/petFamily`;
    PetService.updatePet(this.props.match.params.id, this.state.petName, this.state.type,
       this.state.birthday, this.state.allergies, this.state.temperament, this.state.size)
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

  handleTypeOptionChange = e => {
    this.setState({
      type: e.target.value
    })
  }

  handleSizeOptionChange = e => {
    this.setState({
      size: e.target.value
    })
  }

  render() {

    const { isLoading } = this.state;
 
    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <div>
        <div class="">
            <div class="">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-right">Atnaujinti Augintini</h4>
                </div>
                    <div class="col-md-12">
                      <label class="labels">Augintinio Vardas</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        placeholder="Augintinio Vardas"
                        onChange={this.handleInputChange}
                        value={this.state.petName}
                        /></div>
                    <div class="col-md-12">
                      <label class="labels">Augintinio Tipas</label>
                      <select className="optionSize" value={this.state.type} onChange={this.handleTypeOptionChange}>
                        <option value="dog">Šuo</option>
                        <option value="cat">Katė</option>
                        <option value="bird">Paukštis</option>
                        <option value="hamster">Žiūrkėnas</option>
                    </select></div>
                    <div class="col-md-12">
                      <label class="labels">Alergijos</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        placeholder="Alergijos" 
                        onChange={this.handleInputChange}
                        value={this.state.allergies}
                        /></div>
                    <div class="col-md-12">
                      <label class="labels">Temperamentas</label>
                      <input 
                        type="text" 
                        class="form-control" 
                        placeholder="Temperamentas" 
                        onChange={this.handleInputChange}
                        value={this.state.temperament}
                        /></div>
                        <div class="col-md-12">
                          <label class="labels">Augintinio Dydis</label>
                          <select className="optionSize" value={this.state.type} onChange={this.handleTypeOptionChange}>
                            <option value="small">Mažas</option>
                            <option value="medium">Vidutinis</option>
                            <option value="large">Didelis</option>
                        </select></div>
                <div class="mt-5 text-center"><button class="btn btn-primary profile-button" type="button">Atnaujinti</button></div>
            </div>
        </div>
        {/* <h2 className="mb-4">Atnaujinti Augintini</h2>
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
            <label>Tipas</label>
            <input
              name="type"
              type="text"
              className="form-control"
              onChange={this.handleInputChange}
              value={this.state.type}
            />
          </div>
          <div className="form-group">
            <label>Gimimo Data</label>
            <DatePicker
              name="bday"
              className="form-control"
              onSelect={this.handleDateChange}
              selected={this.state.birthday ? new Date(this.state.birthday) : null}
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
            <label>Tamperamentas</label>
            <input
              name="temperament"
              type="text"
              className="form-control"
              onChange={this.handleInputChange}
              value={this.state.temperament}
            />
          </div>
          <div className="form-group">
            <label>Dydis</label>
            <select value={this.state.size} onChange={this.handleSizeOptionChange}>
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
            Atnaujinti Augintini
          </button>
        </form> */}
      </div>
    );
  }
}

export default PetUpdate;
