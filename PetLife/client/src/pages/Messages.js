import React, { Component } from "react";
import Message from "../components/Messages/messageForm";
import UserContext from "../context/UserContext";
import MessageService from "../Services/messages.service";
import {
  Container,
  Row
} from "reactstrap"

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
    MessageService.getAllMessages()
    .then(res => {
      console.log(res.data)
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
        MessageService.getAllMessages()
        .then(res => {
          console.log(res.data)
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
    MessageService.deleteMessage(messageId)
    .then(function(res) {
      console.log("Message removed");
    });
    let currentComponent = this;
    MessageService.getAllMessages()
      .then(function(res) {
        currentComponent.setState({
          messages: res.data
        });
      });
  };

  answerMessage = messageId => {
    window.location = `/admin/message/${messageId}`;
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
          <h2>Klientų Pranešimai </h2>
        </Container>
        <Row>
        {this.state.messages < 1 ? (
          <div className="alert alert-warning mt-4" role="alert">
            Pranešimų nėra
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
            answerMessage={this.answerMessage}
          />
        ))}
          </Row>
          
          </Container>
      </div>
    );
  }
}

export default ReservationInformation;
