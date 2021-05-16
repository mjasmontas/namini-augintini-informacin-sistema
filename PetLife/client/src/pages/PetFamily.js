import React from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import Pet from "../components/Family/index";
import PetService from "../Services/pet.service";

class PetFamily extends React.Component {
  static contextType = UserContext;

  state = {
    pets: [],
    mounted: false,
    refreshed: false,
    isLoading: false
  };

  componentDidMount() {
    this.setState({ isLoading: true });
    if (!this.context.user) return;
    PetService.getAllUsersPets(this.context.user.id).then(res => {
      this.setState({
        pets: res.data.pets,
        mounted: true,
        isLoading: false
      });
    });
  }

  componentDidUpdate() {
    if (this.state.mounted === false) {
      if (this.state.refreshed === false) {
        PetService.getAllUsersPets(this.context.user.id).then(res => {
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

  render() {
    const { user } = this.context;

    const { isLoading } = this.state;
 
    if (isLoading) {
      return <p>Kraunama ...</p>;
    }

    return (
      <div className="container">
      <div className="row">
        {this.state.pets.map(item => {
          return <Pet key={item._id} img={item.image} name={item.name} />;
        })}
        <div className="col-12 col-md-6 col-lg-3 text-center">
          <button className="familyCard">
            <Link to={`/user/${user.id}/pets/createPet`}>
              <div>
                <div className="petImg">
                  <img
                    src="https://www.missingdogsuk.co.uk/wp-content/plugins/wp-job-manager-resumes/assets/images/candidate.png"
                    className="card-img-top"
                    alt="newe pet"
                  />
                </div>
                <div className="famName">
                  <p> + Prideti nauja Augintini</p>
                </div>
              </div>
            </Link>
          </button>
        </div>
      </div>
      </div>
    );
  }
}

export default PetFamily;
