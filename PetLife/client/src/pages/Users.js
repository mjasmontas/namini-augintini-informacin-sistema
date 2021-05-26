import React from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import UserService from "../Services/user.service";
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Table,
  Button,
  Col,
} from "reactstrap";import {
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const allUsers = (user, index) => {
  console.log(user)
  return (
    <tr key={index}>
      <td>{index}</td>
      <td>{user.firstName + " " + user.lastName}</td>
      <td>{user.email}</td>
      <td>{user.reservation.length}</td>
      <td>{user.pets.length}</td>
      <td><Button onClick={event => window.location.href='/admin/users/' + user._id}><FontAwesomeIcon icon={faEdit} className="mr-1" /></Button></td>
    </tr>
  )
}

class Users extends React.Component {
  static contextType = UserContext;

  state = {
    users: [],
    mounted: false,
    refreshed: false,
    isLoading: false
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    if (!this.context.user) return;
    UserService.getAllUsers()
    .then(res => {
      console.log(res.data);
      this.setState({
        users: res.data,
        mounted: true,
        isLoading: false
      });
    });
  }

  componentDidUpdate() {
    if (this.state.mounted === false) {
      if (this.state.refreshed === false) {
        UserService.getAllUsers()
         .then(res => {
          console.log(res.data);
          this.setState({
            users: res.data,
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

  

  render() {
    const { user } = this.context;

    
    const { isLoading } = this.state;
 
    if (isLoading) {
      return <p>Kraunama ...</p>;
    }
    return (
      <Container>
      <Container>
        <h2>Sistemos vartotojai </h2>
      </Container>
      <Row>
            <Col>
              <Card small className="mb-4">
                <CardHeader className="border-bottom">
                  <h6 className="m-0">Užsiregistravę vartotojai</h6>
                </CardHeader>
                  <CardBody className="p-0 pb-3">
                    <Table striped bordered hover variant>
                      <thead>
                        <tr>
                          <th>#</th>
                          <th>Vardas Pavardė</th>
                          <th>El. paštas</th>
                          <th>Rezervacijų skaičius</th>
                          <th>Augintinių skaičius</th>
                          <th>Redaguoti</th>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.users.map(allUsers)}
                      </tbody>
                    </Table>
                  </CardBody>
                </Card>
            </Col>
          </Row>
          </Container>
    );
  }
}

export default Users;
