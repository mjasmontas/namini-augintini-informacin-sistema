import React from "react";
import LoginHome from "./components/LoginForm/loginForm"
import CreateAccountForm from "./components/CreateAccountForm/createAccountForm";
import UserContext from "./context/UserContext";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import Sidebar from "./components/Sidebar/sidebar";
import Header from "./components/Header/header";
import PetUpdate from "./components/PetUpdate/petUpdate";
import UserUpdate from "./components/UserUpdate/userUpdate";
import Visits from "./pages/Visits";
import Messages from "./pages/Messages";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Home from "./pages/Home";
import VeterinarianVisit from "./pages/VeterinarianVisit";
import TrainerVisit from "./pages/TrainerVisit";
import PetInfo from "./pages/PetInfo";

import CreatePet from "./pages/CreatePet";
import AddDetailPage from "./pages/AddDetailPage";
import PetSitter from "./pages/PetSitter";
import CreatePetSitter from "./pages/CreatePetSitter";
import CreateReservation from "./pages/CreateReservation";
import PrescriptionPage from "./pages/Prescriptions";
import DetailsPage from "./pages/DetailsPage";
import PetFamily from "./pages/PetFamily";
import ReservationInformation from "./pages/Reservation";
import AuthService from "./Services/auth.service";
import UserService from "./Services/user.service";

// import "./global.scss";

class App extends React.Component {
  state = {
    user: false,
    homePage: ''
  };

  setUser = user => {
    this.setState({ user });
  };

  componentDidMount() {
    const user = AuthService.getCurrentUser();
    if (user){
      this.setUser(user)
    }
    
    // if token exists
    // go ask server for user associated with token
    // if (Auth.isLoggedIn()) {
      
    // console.log("ASAADSSAS")
    //   axios
    //     .get("/api/me", {
    //       headers: {
    //         Authorization: "Bearer " + Auth.getToken()
    //       }
    //     })
    //     .then(response => {
    //       this.setUser(response.data);
    //     });
    // }
  }

  userHomePage = user => {
    if (user.id){
      UserService.getUser(user.id)
      .then(res => {
        if(res.data.roles[0] === '6086c27f1c84567930705b43') {
          this.setState({
            homePage: `/user/${user.id}/petfamily`
          })
        } else if (res.data.roles[0] === '6086c27f1c84567930705b44') {
          this.setState({
            homePage: `/trainer/${user.id}`
          })
        } else if (res.data.roles[0] === '6086c27f1c84567930705b45') {
          this.setState({
            homePage: `/veterinarian/${user.id}`
          })
        } else if (res.data.roles[0] === '6086c27f1c84567930705b46') {
          this.setState({
            homePage: `/admin/dashboard`
          })
        } 
      })
    }
  }


  render() {
    const { user } = this.state;
    this.userHomePage(user)
    const setUser = this.setUser;
    // console.log(setUser)
    // const userHome = `/user/608beceb8807ed3031aa9208/petfamily`;
    return (
      <Router>
        <UserContext.Provider value={{ setUser, user }}>
          <div className="container-fluid">
            <Header />
            <div className="row body-container">
              {user ? <Sidebar /> : null}
              <div className={user ? "col-9 main-content" : "col-12"}>
                <Route
                  exact
                  path="/"
                  render={() => (user ? <Redirect to={this.state.homePage} /> : <Home />)}
                />
                <Route exact path="/login" component={LoginHome} />
                <Route
                  exact
                  path="/createAccount"
                  component={CreateAccountForm}
                />
                <ProtectedRoutes
                  exact
                  path="/user/:id/visits"
                  component={Visits}
                />

                <ProtectedRoutes
                  exact
                  path="/user/:id/pets/:petId/visits/addDetail"
                  render={props => (
                    <AddDetailPage
                      {...props}
                      pageTitle="Visits"
                      postTo="/api/visits"
                    />
                  )}
                />
                <ProtectedRoutes
                  exact
                  path="/user/:id/visits/viewDetail"
                  component={DetailsPage}
                />
                <ProtectedRoutes
                  exact
                  path="/user/:id/petfamily"
                  component={PetFamily}
                />
                <ProtectedRoutes
                  exact
                  path="/user/:id/reservations"
                  component={ReservationInformation}
                />
                <ProtectedRoutes
                  exact
                  path="/veterinarian/:id"
                  component={VeterinarianVisit}
                />
                <ProtectedRoutes
                  exact
                  path="/trainer/:id"
                  component={TrainerVisit}
                />
                <ProtectedRoutes
                  exact
                  path="/admin/dashboard"
                  component={Dashboard}
                />
                <ProtectedRoutes
                  exact
                  path="/admin/users"
                  component={Users}
                />
                <ProtectedRoutes
                  exact
                  path="/admin/users/:id"
                  component={UserUpdate}
                />
                <ProtectedRoutes
                  exact
                  path="/admin/messages"
                  component={Messages}
                />
                <ProtectedRoutes
                  exact
                  path="/user/:id/pets"
                  component={PetInfo}
                />
                <ProtectedRoutes
                  exact
                  path="/pet/:id"
                  component={PetUpdate}
                />
                <ProtectedRoutes
                  exact
                  path="/user/:id/pets/createPet"
                  component={CreatePet}
                />
                {/* <ProtectedRoutes
                  exact
                  path={`${userHome}/visit/addDetail`}
                  render={props => (
                    <AddDetailPage {...props} pageTitle="document" />
                  )}
                /> */}
                <ProtectedRoutes
                  exact
                  path="/user/:id/prescription"
                  component={PrescriptionPage}
                />
                <ProtectedRoutes
                  exact
                  path={`/user/${user.id}/prescription/addDetail/:petId`}
                  render={props => (
                    <AddDetailPage {...props} pageTitle="prescription" />
                  )}
                />
                <ProtectedRoutes
                  exact
                  path="/user/:id/petSitters"
                  component={PetSitter}
                />
                <ProtectedRoutes
                  exact
                  path="/user/:id/petSitters/createPetSitter"
                  component={CreatePetSitter}
                />
                <ProtectedRoutes
                  exact
                  path="/user/:id/createReservation"
                  component={CreateReservation}
                />
              </div>
            </div>
          </div>
        </UserContext.Provider>
      </Router>
    );
  }
}

export default App;
