import Axios from "axios";
import React, { Component } from "react";
import MessageService from "../../Services/messages.service";

import "./style.css";

class HomeBox extends Component {
  state = {
    name: "",
    email: "",
    subject: "",
    message: ""
  }
  
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  }

  handleSubmitEvent = event => {
    event.preventDefault();
    const newMessage = {
      name: this.state.name,
      email: this.state.email,
      subject: this.state.subject,
      message: this.state.message
    }
    MessageService.addNewMessage(this.state.name, this.state.email, this.state.subject, this.state.message)
    .then(function() {
      window.location = `/`;
    });
  };

  render(){
  return (
        <div>
        <section id="title">
        <div className="container">
        <div className="row">
                <div className="col align-self-start">
                    <h1 id="pirmasHeaderis">Palikite savo augintinius saugiai</h1>
                    <button type="submit" className="btn btn-dark btn-lg" href="/login"> Prisijungti</button>
                </div>
            </div>
            </div>
        </section>


        <section id="about" className="about">
      <div className="container">

        <div className="section-title">
          <h2>Apie Mus</h2>
          <h3>Sužinokite apie mus <span>Apie Mus</span></h3>
          <p>Esame didžiausi naminių gyvūnėlių priežiūros verslo savininkų ir jų aistros dirbti su gyvūnais gerbėjai. 
            Mes norime, kad jiems pasisektų ir padėtų teikti aukščiausios kokybės paslaugas laimingiems ir sveikiems augintiniams.</p>
        </div>

        <div className="row content">
          <div className="col-lg-6">
            <p>
            Mes labai tikime kurdami savo programinę įrangą ir sąžiningai valdydami savo įmonę. 
            Mūsų bendravimas grindžiamas pasitikėjimu ir skaidrumu, todėl galime palaikyti tokius puikius santykius su savo klientais.
            </p>
            <ul>
              <li><i className="ri-check-double-line"></i> Išimtines paslaugos</li>
              <li><i className="ri-check-double-line"></i> Gera komunikacija</li>
              <li><i className="ri-check-double-line"></i> Priimame užsakymus internetu ir mokėjimus visą parą 7 dienas</li>
            </ul>
          </div>
          <div className="col-lg-6 pt-4 pt-lg-0">
            <p>
            Mūsų požiūris yra teikti modernios ir profesionalios programinės įrangos patirtį, tačiau jaukiai, draugiškai ir efektyviai, 
            kad galėtumėte sutelkti dėmesį į tai, kas svarbiausia.
            </p>
          </div>
        </div>

      </div>
    </section>

    <section id="services" className="services">
      <div className="container">

        <div className="section-title">
          <h2>Paslaugos</h2>
          <h3>Mūsų siūlomos <span>Paslaugos</span></h3>
        </div>

        <div className="row">
          <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
            <div className="icon-box">
              <div className="icon"><i className="bx bxl-dribbble"></i></div>
              <h4 className="title"><a href="">Saugumas ir patikimumas</a></h4>
              <p className="description">Mes turime saugią sistemą, kurioje jūs ir jūsų augintinių duomenys yra nepaprastai svarbūs.</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
            <div className="icon-box">
              <div className="icon"><i className="bx bx-file"></i></div>
              <h4 className="title"><a href="">Rezervacija internetu</a></h4>
              <p className="description">Klientai, visus savo augintinius gali užrezervuoti greitai ir patogiai per internetą</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
            <div className="icon-box">
              <div className="icon"><i className="bx bx-tachometer"></i></div>
              <h4 className="title"><a href="">Darbuotojų valdymas</a></h4>
              <p className="description">Darbuotojams yra sukurti specialūs puslapiai, kuriuose jie mato savo vizito laikus</p>
            </div>
          </div>

          <div className="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
            <div className="icon-box">
              <div className="icon"><i className="bx bx-world"></i></div>
              <h4 className="title"><a href="">Stebėkite kiekvieną klientą ir gyvūną</a></h4>
              <p className="description">Kliento ir augintinio valdymas, kurį lengva valdyti.</p>
            </div>
          </div>

        </div>

      </div>
    </section>

    <section id="contact" className="contact">
      <div className="container">

        <div className="section-title">
          <h2>Kontaktai</h2>
          <h3>Parašykite <span>Mums</span></h3>
          <p>Susisiekite su mumis ir mes atsakysime kuo greičiau.</p>
        </div>

        <div className="row mt-5">

          <div className="col-lg-4">
            <div className="info">
              <div className="address">
                <i className="bi bi-geo-alt"></i>
                <h4>Vieta:</h4>
                <p>Saulėtekio al. 19, 10224 Vilnius Pašto indeksas: 10224.</p>
              </div>

              <div className="email">
                <i className="bi bi-envelope"></i>
                <h4>Elektroninis paštas:</h4>
                <p>mantas.jasmontas@stud.vgtu.lt</p>
              </div>

              <div className="phone">
                <i className="bi bi-phone"></i>
                <h4>Telefonas:</h4>
                <p>+3706216516</p>
              </div>

            </div>

          </div>

          <div className="col-lg-8 mt-5 mt-lg-0">

            <form action="forms/contact.php" method="post" role="form" className="email-form">
              <div className="row">
                <div className="col-md-6 form-group">
                  <input 
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Jūsų vardas"
                    value={this.state.name}
                    onChange={this.handleInputChange}
                    required/>
                </div>
                <div className="col-md-6 form-group mt-3 mt-md-0">
                  <input 
                    type="email" 
                    className="form-control" 
                    name="email" 
                    id="email" 
                    placeholder="Elektroninis paštas" 
                    value={this.state.email}
                    onChange={this.handleInputChange}
                    required/>
                </div>
              </div>
              <div className="form-group mt-3">
                <input type="text" 
                  className="form-control" 
                  name="subject" 
                  id="subject" 
                  placeholder="Objektas" 
                  value={this.state.subject}
                  onChange={this.handleInputChange}
                  required/>
              </div>
              <div className="form-group mt-3">
                <textarea 
                  className="form-control"
                  name="message"
                  id="message" 
                  rows="5" 
                  placeholder="Pranešimas" 
                  value={this.state.message}
                  onChange={this.handleInputChange}
                  required />
              </div>
              <div className="my-3">
                <div className="loading">Kraunama</div>
                <div className="error-message"></div>
                <div className="sent-message">Jūsų žinutė išsiųsta. Ačiū!</div>
              </div>
              <div className="text-center"><button type="submit" onClick={this.handleSubmitEvent}>Siųsti pranešimą</button></div>
            </form>

          </div>

        </div>

      </div>
    </section>

    </div>
    );
  }
}

export default HomeBox;
