import React from "react";
import PetInfoCard from "../components/petInfoCard/petInfoCard";
import UserContext from "../context/UserContext";
import PetService from "../Services/pet.service";
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
  CardImg
} from "reactstrap";
import Item from "antd/lib/list/Item";


class PetInfo extends React.Component {
  static contextType = UserContext;

  state = {
    pets: [],
    mounted: false,
    refreshed: false,
    isLoading: false
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    let currentComponent = this;
    PetService.getAllUsersPets(this.context.user.id).then(data => {
      currentComponent.setState({
        pets: data.data.pets,
        mounted: true,
        isLoading: false
      });
    });
  }

  componentDidUpdate() {
    if (this.state.mounted === false) {
      if (this.state.refreshed === false) {
        PetService.getAllUsersPets(this.context.user.id).then(res => {
          console.log(res.data);
          this.setState({
            pets: res.data.pets,
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

  deletePet = petId => {
    PetService.deletePet(petId).then(function(res) {
      console.log("pet deleted");
    });
    let currentComponent = this;
    PetService.getAllUsersPets(this.context.user.id)
      .then(function(res) {
        currentComponent.setState({
          pets: res.data.pets
        });
      });
  };

  render() {
    
    const { isLoading } = this.state;
 
    if (isLoading) {
      return <p>Kraunama ...</p>;
    }
    
    return (
      <div className="content">
      <Container fluid>
        <Container>
          <h2>Augintinio Informacija</h2>
        </Container>
        <Row>
        {this.state.petSitters < 1 ? (
          <div className="alert alert-warning mt-4" role="alert">
            Jus neturite prisideja jokiu augintiniu
          </div>
        ) : null}

        {this.state.pets.map(item => (
          <PetInfoCard
            key={item._id}
            id={item._id}
            image={item.image}
            name={item.name}
            type={item.type}
            birthday={item.birthday}
            temperament={item.temperament}
            size={item.size}
            deletePet={this.deletePet}
          />
        ))}
          </Row>
          
          </Container>
      </div>
    );
  }
}

export default PetInfo;
