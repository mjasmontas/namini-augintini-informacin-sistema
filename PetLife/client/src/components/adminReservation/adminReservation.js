import React, { Component } from "react";
import UserContext from "../../context/UserContext";
import ReservationService from "../../Services/reservations.service";

class UserUpdateForm extends Component {
  static contextType = UserContext;

  state = {
    reservation: [],
    confirmed: false,
    canceled: false,
    mounted: false,
    refreshed: false,
    isLoading: false
  };

  componentDidMount() {
    ReservationService.getUserReservation(this.props.match.params.id).then((res) => {
        console.log(res.data);
        this.setState({
          reservation: res.data,
          mounted: true,
          isLoading: false,
        });
    });
  }

  componentDidUpdate() {
    if (this.state.mounted === false) {
      if (this.state.refreshed === false) {
        ReservationService.getUserReservation(this.props.match.params.id).then((res) => {
          this.setState({
            reservation: res.data,
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

  

  submitData = (e) => {
    e.preventDefault();
    let status;
    if (this.state.confirmed) {
       status = "patvirtintas";
    } else if (this.state.canceled) {
      status = "atšauktas";
    } 

    if (
      this.state.confirmed ||
      this.state.canceled
    ) {
      let userUrl = `/admin/reservations`;
      ReservationService.updateReservation(this.props.match.params.id, status).then(
        function () {
          window.location = userUrl;
        }
      );
    }
  };

  handleConfirmChange = (e) => {
    this.setState({
      confirmed: e.target.checked,
      canceled: false,
    });
  };

  handleCanceledChange = (e) => {
    this.setState({
        confirmed: false,
        canceled: e.target.checked,
    });
  };

  render() {
    const { isLoading } = this.state;

    if (isLoading) {
      return <p>Kraunama ...</p>;
    }

    return (
      <div className="container">
        <div class="row gutters">
          <h4 class="text-right">Rezervacijos statuso pakeitimas</h4>
        </div>
        <div className="row gutters">
          <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="card h-100">
              <div className="card-body">
                <div className="row gutters">
                  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <h4 className="mb-2 text-primary">Rezervacijos informacija</h4>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Atvykimo data</label>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        readonly="readonly"
                        defaultValue={this.state.reservation.startDate}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Išvykimo data</label>
                      <input
                        type="text"
                        class="form-control"
                        readonly="readonly"
                        defaultValue={this.state.reservation.endDate}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Savininko vardas</label>
                      <input
                        type="text"
                        className="form-control"
                        id="email"
                        readonly="readonly"
                        defaultValue={this.state.reservation.ownerName}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Savininko telefono numeris</label>
                      <input
                        type="text"
                        class="form-control"
                        readonly="readonly"
                        defaultValue={this.state.reservation.ownerPhoneNumber}
                      />
                    </div>
                  </div>
                  <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                    <div className="form-group">
                      <label>Kaina</label>
                      <input
                        type="text"
                        class="form-control"
                        readonly="readonly"
                        defaultValue={this.state.reservation.price}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <hr />

              <div className="spacing">
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    onChange={this.handleConfirmChange}
                    checked={this.state.confirmed}
                  />
                  <label class="form-check-label" for="inlineRadio1">
                    Patvirtinti
                  </label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    onChange={this.handleCanceledChange}
                    checked={this.state.canceled}
                  />
                  <label class="form-check-label" for="isPetTrainer">
                    Atšaukti
                  </label>
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

export default UserUpdateForm;
