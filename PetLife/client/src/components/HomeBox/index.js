import React from "react";
// import Header from "../components/Header/header";
// import Footer from "../components/Footer/index";
// import Sidebar from "../components/Sidebar/sidebar";

import "./style.css";

function HomeBox() {
    return (
        <div>
        <section id="title">
        <div class="container">
        <div className="row">
                <div className="col align-self-start">
                    <h1 id="pirmasHeaderis">Meet new and interesting dogs nearbyasdasdasdasdasdasdaajbsdhfkjsdk.</h1>
                    <button type="button" class="btn btn-dark btn-lg" href="/login"> Prisijungti</button>
                </div>
            </div>
            </div>
        </section>


        <section id="about" class="about">
      <div class="container">

        <div class="section-title">
          <h2>Apie Mus</h2>
          <h3>Sužinokite apie mus <span>Apie Mus</span></h3>
          <p>Esame didžiausi naminių gyvūnėlių priežiūros verslo savininkų ir jų aistros dirbti su gyvūnais gerbėjai. 
            Mes norime, kad jiems pasisektų ir padėtų teikti aukščiausios kokybės paslaugas laimingiems ir sveikiems augintiniams.</p>
        </div>

        <div class="row content">
          <div class="col-lg-6">
            <p>
            Mes labai tikime kurdami savo programinę įrangą ir sąžiningai valdydami savo įmonę. 
            Mūsų bendravimas grindžiamas pasitikėjimu ir skaidrumu, todėl galime palaikyti tokius puikius santykius su savo klientais.
            </p>
            <ul>
              <li><i class="ri-check-double-line"></i> Išimtines paslaugos</li>
              <li><i class="ri-check-double-line"></i> Gera komunikacija</li>
              <li><i class="ri-check-double-line"></i> Priimame užsakymus internetu ir mokėjimus visą parą 7 dienas</li>
            </ul>
          </div>
          <div class="col-lg-6 pt-4 pt-lg-0">
            <p>
            Mūsų požiūris yra teikti modernios ir profesionalios programinės įrangos patirtį, tačiau jaukiai, draugiškai ir efektyviai, 
            kad galėtumėte sutelkti dėmesį į tai, kas svarbiausia.
            </p>
            <a href="#" class="btn-learn-more">Learn More</a>
          </div>
        </div>

      </div>
    </section>

    <section id="services" class="services">
      <div class="container">

        <div class="section-title">
          <h2>Paslaugos</h2>
          <h3>Musu siulomos <span>Paslaugos</span></h3>
        </div>

        <div class="row">
          <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
            <div class="icon-box">
              <div class="icon"><i class="bx bxl-dribbble"></i></div>
              <h4 class="title"><a href="">Saugumas ir patikimumas</a></h4>
              <p class="description">Mes turime saugią sistemą, kurioje jūs ir jūsų augintinių duomenys yra nepaprastai svarbūs.</p>
            </div>
          </div>

          <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
            <div class="icon-box">
              <div class="icon"><i class="bx bx-file"></i></div>
              <h4 class="title"><a href="">Registracija internetu</a></h4>
              <p class="description">Jūsų klientai gali užsiregistruoti į užsiėmimus, renginius, privačius mokymus, terapiją ir paketus internetu.</p>
            </div>
          </div>

          <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
            <div class="icon-box">
              <div class="icon"><i class="bx bx-tachometer"></i></div>
              <h4 class="title"><a href="">Darbuotojų valdymas</a></h4>
              <p class="description">Darbuotojai, planuodami laiko kortelių valdymą, jus aprėpė.</p>
            </div>
          </div>

          <div class="col-md-6 col-lg-3 d-flex align-items-stretch mb-5 mb-lg-0">
            <div class="icon-box">
              <div class="icon"><i class="bx bx-world"></i></div>
              <h4 class="title"><a href="">Stebėkite kiekvieną klientą ir gyvūną</a></h4>
              <p class="description">Kliento ir augintinio valdymas, kurį lengva valdyti.</p>
            </div>
          </div>

        </div>

      </div>
    </section>

    <section id="contact" class="contact">
      <div class="container">

        <div class="section-title">
          <h2>Kontaktai</h2>
          <h3>Parašykite <span>Mums</span></h3>
          <p>Susisiekite su mumis ir mes atsakysime kuo greičiau.</p>
        </div>

        <div>
          {/* <iframe style="border:0; width: 100%; height: 270px;" src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12097.433213460943!2d-74.0062269!3d40.7101282!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xb89d1fe6bc499443!2sDowntown+Conference+Center!5e0!3m2!1smk!2sbg!4v1539943755621" frameborder="0" allowfullscreen></iframe> */}
        </div>

        <div class="row mt-5">

          <div class="col-lg-4">
            <div class="info">
              <div class="address">
                <i class="bi bi-geo-alt"></i>
                <h4>Vieta:</h4>
                <p>Saulėtekio al. 19, 10224 Vilnius Pašto indeksas: 10224.</p>
              </div>

              <div class="email">
                <i class="bi bi-envelope"></i>
                <h4>Elektroninis paštas:</h4>
                <p>mantas.jasmontas@stud.vgtu.lt</p>
              </div>

              <div class="phone">
                <i class="bi bi-phone"></i>
                <h4>Telefonas:</h4>
                <p>+3706216516</p>
              </div>

            </div>

          </div>

          <div class="col-lg-8 mt-5 mt-lg-0">

            <form action="forms/contact.php" method="post" role="form" class="php-email-form">
              <div class="row">
                <div class="col-md-6 form-group">
                  <input type="text" name="name" class="form-control" id="name" placeholder="Your Name" required/>
                </div>
                <div class="col-md-6 form-group mt-3 mt-md-0">
                  <input type="email" class="form-control" name="email" id="email" placeholder="Your Email" required/>
                </div>
              </div>
              <div class="form-group mt-3">
                <input type="text" class="form-control" name="subject" id="subject" placeholder="Subject" required/>
              </div>
              <div class="form-group mt-3">
                <textarea class="form-control" name="message" rows="5" placeholder="Message" required></textarea>
              </div>
              <div class="my-3">
                <div class="loading">Loading</div>
                <div class="error-message"></div>
                <div class="sent-message">Your message has been sent. Thank you!</div>
              </div>
              <div class="text-center"><button type="submit">Send Message</button></div>
            </form>

          </div>

        </div>

      </div>
    </section>

    </div>
    );
}

export default HomeBox;
