import React, { Component } from "react";
// import API from "../utils/API2";
import axios from "axios";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Message from "../components/Messages/messageForm";
import UserContext from "../context/UserContext";

class ReservationInformation extends Component {
  static contextType = UserContext;

  state = {
    messages: [],
    mounted: false,
    perjungta: false,
    isLoading: false
  };
  componentDidMount() {
    this.setState({ isLoading: true });
    axios.get(`/api/messages`).then(res => {
      this.setState({
        messages: res.data,
        mounted: true,
        isLoading: false
      });
    });
  }

  componentDidUpdate() {
    if (this.state.mounted === false) {
      if (this.state.perjungta === false) {
        axios.get(`/api/messages`).then(res => {
          this.setState({
            messages: res.data,
            perjungta: true,
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

  removeMessage = messageId => {
    axios.delete(`/api/admin/messages/${messageId}`).then(function(res) {
      console.log("Message removed");
    });
    let currentComponent = this;
    axios
      .get(`/api/messages`)
      .then(function(res) {
        currentComponent.setState({
          messages: res.data
        });
      });
  };

  render() {
    const { user } = this.context;

    const { isLoading } = this.state;
 
    if (isLoading) {
      return <p>Loading ...</p>;
    }

    return (
      <div className="PetSitter">
        <div className="row">
          <div className="col-6">
            <h2>Customer's Messages </h2>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            {this.state.messages < 1 ? (
              <div className="alert alert-warning mt-4" role="alert">
                There are no messages
              </div>
            ) : null}
        {this.state.messages.map(item => (
          <Message
            key={item._id}
            id={item._id}
            name={item.name}
            email={item.email}
            subject={item.subject}
            message={item.message}
            removeMessage={this.removeMessage}
          />
        ))}
          </div>
        </div>
      </div>
    );
  }
}

export default ReservationInformation;
