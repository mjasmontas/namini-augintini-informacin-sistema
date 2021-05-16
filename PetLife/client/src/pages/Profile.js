import React, { Component } from "react";
import UserContext from "./../context/UserContext";
import UserService from "./../Services/user.service";
import "./profile.css";


class UserProfileUpdateForm extends Component {
  static contextType = UserContext;

  state = {
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    years: "",
    address: "",
    zipCode: "",
    city: "",
    veterinarian: false,
    mounted: false,
    refreshed: false,
    isLoading: false
  };

  
  componentDidMount() {
    UserService.getUser(this.context.user.id).then(res => {
        this.setState({
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            email: res.data.email,
            phoneNumber: res.data.phoneNumber,
            years: res.data.years,
            address: res.data.address,
            city: res.data.city,
            zipCode: res.data.zipCode,
            mounted: true,
            isLoading: false
          });
    });   
  }

  componentDidUpdate() {
    if (this.state.mounted === false) {
      if (this.state.refreshed === false) {
        UserService.getUser(this.props.match.params.id).then(res => {
          console.log(res.data);
          this.setState({
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            email: res.data.email,
            phoneNumber: res.data.phoneNumber,
            years: res.data.years,
            address: res.data.address,
            city: res.data.city,
            zipCode: res.data.zipCode,
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

  
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    console.log(this.state.firsName)
  };

  handlefirstNameChange = event => {
    this.setState({
        firstName: event.target.value
    })
    
    console.log(this.state.firsName)
}

handlelastNameChange = event => {
    this.setState({
        lastName: event.target.value
    })
}
handleEmailChange = event => {
    this.setState({
        email: event.target.value
    })
}

handlePhoneNumberChange = event => {
    this.setState({
        phoneNumber: event.target.value
    })
}

  handleAddressChange = event => {
      this.setState({
          address: event.target.value
      })
  }

  handleCityChange = event => {
    this.setState({
        city: event.target.value
    })
}

  handleCodeChange = event => {
    this.setState({
        zipCode: event.target.value
    })
}

handleYearsChange = event => {
    this.setState({
      years: event.target.value
    })
  }

  submitData = e => {
    e.preventDefault();

    UserService.updateProfileUser(this.context.user.id, this.state.firstName, this.state.lastName, this.state.email, this.state.phoneNumber,
        this.state.years, this.state.address, this.state.city, this.state.zipCode)
    .then(function() {
        window.location.reload();
    });
  };

  deleteData = e => {
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      years: "",
      address: "",
      city: "",
      zipCode: ""
    })
  }

  render() {

    const {errors} = this.state;

    const { isLoading } = this.state;
 
    if (isLoading) {
      return <p>Kraunama ...</p>;
    }

    return (
<div className="container">
<div className="row gutters">

<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
<div className="card h-100">
	<div className="card-body">
		<div className="row gutters">
			<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<h6 className="mb-2 text-primary">Asmeninė informacija</h6>
			</div>
			<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div className="form-group">
					<label for="firstName">Vardas</label>
					<input 
          type="text" 
          className="form-control" 
          id="firstName" 
          placeholder="Įveskite vardą"
          onChange={this.handlefirstNameChange}
          value={this.state.firstName}/>
				</div>
			</div>
			<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div className="form-group">
					<label for="lastName">Pavardė</label>
					<input 
            type="text" 
            className="form-control" 
            id="lastName" 
            placeholder="Įveskite pavardę"
            onChange={this.handlelastNameChange}
            value={this.state.lastName}
            />
				</div>
			</div>
			<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div className="form-group">
					<label for="eMail">Elektroninis paštas</label>
					<input 
            type="email" 
            className="form-control" 
            id="eMail" 
            placeholder="Įveskite el. paštą"
            onChange={this.handleEmailChange}
            value={this.state.email}
            />
				</div>
			</div>
			<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div className="form-group">
					<label for="phone">Telefono numeris</label>
					<input 
            type="text" 
            className="form-control" 
            id="phone" 
            placeholder="Įveskite telefono numerį"
            onChange={this.handlePhoneNumberChange}
            value={this.state.phoneNumber}
            />
				</div>
			</div>
      <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div className="form-group">
					<label for="phone">Metai</label>
					<input 
            type="text" 
            className="form-control" 
            id="metai" 
            placeholder="Įveskite savo amžių"
            onChange={this.handleYearsChange}
            value={this.state.years}
            />
				</div>
			</div>
		</div>
		<div className="row gutters">
			<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<h6 className="mt-3 mb-2 text-primary">Adresas</h6>
			</div>
			<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div className="form-group">
					<label for="Street">Gatvė</label>
					<input 
            type="name" 
            className="form-control" 
            id="Street" 
            placeholder="Įveskite gatvę"
            onChange={this.handleAddressChange}
            value={this.state.address}
            />
				</div>
			</div>
			<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div className="form-group">
					<label for="city">Miestas</label>
					<input 
            type="name" 
            className="form-control" 
            id="city" 
            placeholder="Įveskite miestą"
            onChange={this.handleCityChange}
            value={this.state.city}
            />
				</div>
			</div>
			<div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
				<div className="form-group">
					<label for="zipCode">Pašto kodas</label>
					<input 
            type="text" 
            className="form-control" 
            id="zipCode" 
            placeholder="Pašto kodas"
            onChange={this.handleCodeChange}
            value={this.state.zipCode}
            />
				</div>
			</div>
		</div>
		<div class="row gutters buttons">
			<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
				<div class="text-right">
					<button type="button" onClick={this.deleteData} id="submit" name="submit" class="btn btn-secondary">Atšaukti</button>
					<button type="button" onClick={this.submitData} id="submit" name="submit" class="btn btn-primary">Atnaujinti</button>
				</div>
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

export default UserProfileUpdateForm;
