import React, { Component } from "react";
// import API from "../utils/API2";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  CardFooter,
  CardTitle,
  Row,
  Table,
  Button,
  Col,
} from "reactstrap";
import UserContext from "../context/UserContext";
import ReservationService from "../Services/reservations.service";
import PetService from "../Services/pet.service";
import UserService from "../Services/user.service";
import VeterinarService from "../Services/veterinar.service";
import petTrainerService from "../Services/petTrainer.service";
import MessageService from "../Services/messages.service";


const employeeWorkers = (employee, index) => {
  return (
    <tr key={index}>
      <td>{index}</td>
      <td>{employee.name}</td>
      <td>{employee.email}</td>
      <td>{employee.job}</td>
    </tr>
  )
}

class Dashboard extends Component {
  static contextType = UserContext;

  state = {
    users: [],
    employees: [],
    message: [],
    pets: [],
    testing: '',
    messagesNumber: '',
    usersNumber: '',
    revenue: '',
    reservationNumber: '',
    mounted: false,
    refreshed: false,
    isLoading: false
  };

componentDidMount() {
    this.setState({ isLoading: true });
    UserService.getAllUsers()
      .then(res => {
        this.setState({
          users: res.data
        }, this.getUserNumber())
      })
      ReservationService.getAllReservations()
      .then(res => {
        this.setState({
          reservations: res.data,
          reservationNumber: res.data.length
        }, this.getRevenue())
      })
    MessageService.getAllMessages()
      .then(res => {
        this.setState({
          messagesNumber: res.data.length,
          mounted: true,
          isLoading: false  
        })
      })
  }

  componentDidUpdate() {
    if (this.state.mounted === false) {
      if (this.state.refreshed === false) {
        UserService.getAllUsers()
          .then(res => {
            this.setState({
              users: res.data
            }, this.getUserNumber(), this.getEmployess())
          })
        ReservationService.getAllReservations()
        .then(res => {
          this.setState({
            reservations: res.data,
            reservationNumber: res.data.length
          }, this.getRevenue())
        })
        MessageService.getAllMessages()
         .then(res => {
          this.setState({
            messagesNumber: res.data.length,
            refreshed: true,
            isLoading: false
          })
        })
      } else {
        this.setState({
          mounted: true
        });   
      }
    }
  }

  getUserNumber= () => {
    var userNumber = 0;
    for (var i = 0; i < this.state.users.length; i++){
      if (this.state.users[i].roles[0] === '6086c27f1c84567930705b43'){
        userNumber += 1
      }
    }
    this.setState({
      usersNumber: userNumber
    })
  }

  getRevenue = () => {
    var sum = 0;
    if (this.state.reservations){
      for (var i = 0; i < this.state.reservations.length; i++){
        sum += this.state.reservations[i].price
      }
      this.setState({
        revenue: sum
      })
    }
  }

  getEmployess = () => {
    var employee;
    if (this.state.users){
      this.state.employees = []
      for (var i =0; i < this.state.users.length; i++){
        if (this.state.users[i].roles[0] === '6086c27f1c84567930705b44'){
          employee = {
            name: this.state.users[i].firstName + ' ' + this.state.users[i].lastName,
            email: this.state.users[i].email,
            job: 'Augintinio Treneris'
          };
          this.state.employees.push(employee)
        } else if (this.state.users[i].roles[0] === '6086c27f1c84567930705b45'){
          employee = {
            name: this.state.users[i].firstName + ' ' + this.state.users[i].lastName,
            email: this.state.users[i].email,
            job: 'Veterinaras'
          };
          this.state.employees.push(employee)
        }
      }
    }
  }



  render() {
    const { user } = this.context;

    const { isLoading } = this.state;
 
    if (isLoading) {
      return <p>Kraunama ...</p>;
    }

    return (
      <div className="content">
      <Container fluid>
        <Container>
          <h2>Pagrindinis </h2>
        </Container>
        <Row>
            <Col lg="3" md="6" sm="12">
              <Card className="text-center">
                <CardBody>
                    <CardTitle tag="p">Klientų skaičius</CardTitle>
                      <div className="numbers">
                        <hr />
                        <p className="card-category">{this.state.usersNumber}</p>
                        <p />
                      </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="12">
              <Card className="text-center">
                <CardBody>
                    <CardTitle tag="p">Pajamų skaičius</CardTitle>
                      <div className="numbers">
                        <hr />
                        <p className="card-category">{this.state.revenue}</p>
                        <p />
                      </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="12">
              <Card className="text-center">
                <CardBody>
                    <CardTitle tag="p">Pranešimų skaičius</CardTitle>
                      <div className="numbers">
                        <hr />
                        <p className="card-category">{this.state.messagesNumber}</p>
                        {/* <CardTitle tag="p">$ 1,345</CardTitle> */}
                        <p />
                      </div>
                </CardBody>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="12">
              <Card className="text-center">
                <CardBody>
                    <CardTitle tag="p">Rezervacijų skaičius</CardTitle>
                      <div className="numbers">
                        <hr />
                        <p className="card-category">{this.state.reservationNumber}</p>
                        {/* <CardTitle tag="p">$ 1,345</CardTitle> */}
                        <p />
                      </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
          <br />
          <br />
          <Row>
            <Col>
              <Card small className="mb-4">
                <CardHeader className="border-bottom">
                  <h6 className="m-0">Darbuotojai</h6>
                </CardHeader>
                  <CardBody className="p-0 pb-3">
                    <Table striped bordered hover variant>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Vardas Pavardė</th>
                          <th>El. paštas</th>
                          <th>Darbas</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.employees.map(employeeWorkers)}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
            </Col>
          </Row>
          </Container>
      </div>
      // <div className="PetSitter">
      //   <div className="row">
      //     <div className="col-6">
      //       <h2>Dashboard </h2>
      //     </div>
      //     <div className="col-6 text-right">
      //     </div>
      //   </div>
      //   <div className="row">
      //     <div className="col-12">
            
      //     <div className="form-group">
      //       <label>Messages Number</label>
      //       <input
      //         name="messages"
      //         type="text"
      //         className="form-control"
      //         value={this.state.messages}
      //       />
      //       </div>
      //       <div className="form-group">
      //       <label>Pet Number</label>
      //       <input
      //         name="petNumber"
      //         type="text"
      //         className="form-control"
      //         value={this.state.petNumber}
      //       />
      //       </div>
      //       <div className="form-group">
      //       <label>User Number</label>
      //       <input
      //         name="usersNumber"
      //         type="text"
      //         className="form-control"
      //         value={this.state.usersNumber}
      //       />
      //       </div>
      //       <div className="form-group">
      //       <label>Reservation Number</label>
      //       <input
      //         name="reservationNumber"
      //         type="text"
      //         className="form-control"
      //         value={this.state.reservationNumber}
      //       />
      //       </div>
      //       <div className="form-group">
      //       <label>Employee Number</label>
      //           <div className="form-group">
      //           <label>Veterinarian Number</label>
      //           <input
      //           name="veterinarianNumber"
      //           type="text"
      //           className="form-control"
      //           value={this.state.veterinarianNumber}
      //           />
      //           <div className="form-group">
      //           <label>Pet Trainer Number</label>
      //           <input
      //           name="petTrainerNumber"
      //           type="text"
      //           className="form-control"
      //           value={this.state.trainerNumber}
      //           />
      //       </div>
      //       </div>
      //       <div className="form-group">
      //       <label>Veterinarian Visit Number</label>
      //       <input
      //         name="veterinarianVisitNumber"
      //         type="text"
      //         className="form-control"
      //         value={this.state.veterinarianVisitNumber}
      //       />
      //       </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
    );
  }
}

export default Dashboard;
