import emailjs from "emailjs-com";
import React, { Component } from "react";
import MessageService from "../Services/messages.service";

class ContactUs extends Component {
  state = {
    userEmail: "",
    subject: "",
    userName: "",
    message: "",
    mounted: false,
    perjungta: false,
    isLoading: false,
  };
  componentDidMount() {
    this.setState({ isLoading: true });
    MessageService.getMessage(this.props.match.params.id).then((res) => {
      this.setState({
        userEmail: res.data.email,
        subject: res.data.subject,
        userName: res.data.name,
        mounted: true,
        isLoading: false,
      });
    });
  }

  componentDidUpdate() {
    if (this.state.mounted === false) {
      if (this.state.perjungta === false) {
        MessageService.getMessage(this.props.match.params.id).then((res) => {
          this.setState({
            userEmail: res.data.email,
            subject: res.data.subject,
            userName: res.data.name,
            perjungta: true,
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

  handleInputChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  submitData = (event) => {
    event.preventDefault();
    emailjs
      .sendForm("service_ba5k2d2", "template_ye6xe2s", event.target, "user_nuEOBrBPDHSzbHXmd7uZA")
      .then(
        (result) => {
          window.location = `/admin/messages`
        },
        (error) => {
          console.log(error.text);
        }
      );

    MessageService.deleteMessage(this.props.match.params.id)
      .then(function(res) {
        console.log("Message removed");
      });
    
  };

  render() {
    const { isLoading } = this.state;

    if (isLoading) {
      return <p>Kraunama ...</p>;
    }

    return (
            <div className="container">
                <div className="row pt-5 mx-auto">
                <div class="col-8 form-group mx-auto">
          <h4 >Atsakytį pranešimą</h4>
        </div></div>
        <div className="card h-50">
              <div className="card-body">
            <form onSubmit={this.submitData}>
                    <div className="row pt-5 mx-auto">
                        <div className="col-8 form-group mx-auto">
                            <input type="text" className="form-control" placeholder="Name" name="name" 
                          defaultValue={this.state.userName}
                          readOnly="readOnly"/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <input type="email" className="form-control" placeholder="Email Address" name="email"
                          defaultValue={this.state.userEmail}
                          readOnly="readOnly"/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <input type="text" className="form-control" placeholder="Subject" name="subject" onChange={this.handleInputChange}
                          value={this.state.subject}/>
                        </div>
                        <div className="col-8 form-group pt-2 mx-auto">
                            <textarea className="form-control" id="" cols="30" rows="8" placeholder="Jūsų pranešimas" name="message" onChange={this.handleInputChange}
                          value={this.state.message}></textarea>
                        </div>
                        <div className="col-8 pt-3 mx-auto">
                            <input type="submit" className="btn btn-info" value="Siųsti pranešimą"></input>
                        </div>
                    </div>
                </form>
            </div>
            </div></div>
    );
  }
}

export default ContactUs;
