import React from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import axios from "axios";
import UserInfoCard from "../components/Users/userInfoCard";

class Users extends React.Component {
  static contextType = UserContext;

  state = {
    users: [],
    mounted: false,
    refreshed: false
  };

  componentDidMount() {
    if (!this.context.user) return;
    axios.get(`/api/users`).then(res => {
      console.log(res.data);
      this.setState({
        users: res.data,
        mounted: true
      });
    });
  }

  componentDidUpdate() {
    if (this.state.mounted === false) {
      if (this.state.refreshed === false) {
        axios.get(`/api/users`).then(res => {
          console.log(res.data);
          this.setState({
            users: res.data,
            refreshed: true
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
    return (
      <div className="PetSitter">
        <div className="row">
          <div className="col-6">
            <h2>All Users </h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {this.state.users.map(item => (
              <UserInfoCard
                key={item._id}
                id={item._id}
                firstName={item.firstName}
                lastName={item.lastName}
                email={item.email}
                veterinarian={item.veterinarian}
                petTrainer={item.petTrainer}
                vetersimpleUserinarian={item.simpleUser}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Users;
