import React, { Component } from 'react'
import { Container, Row, Col, Button} from 'react-bootstrap'
import Table from '../components/Table'
import CustomerService from '../services/customers.service'
import AuthService from '../services/auth.service'
import CustomerPaymentStatusService from '../services/customePaymentStatus.services'
import CountryService from '../services/country.service'
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import { Redirect } from "react-router-dom";

class ClientsPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: { userEmail: "" },
            data: null,
            editIdx : -1,
            isLoading: true,
            error: null

        }
    }

    handleAdd = () => {
        window.location = '/addCustomer'
    }
    handleRemove = i => {
        this.setState(state => ({
          data: state.data.filter((row, j) => j !== i)
        }));
      };
    
    startEditing = i => {
    this.setState({ editIdx: i });
    };

    stopEditing = () => {
    this.setState({ editIdx: -1 });
    };

    handleChange = (e, name, i) => {
        const { value } = e.target;
        this.setState(state => ({
            data: state.data.map(
            (row, j) => (j === i ? { ...row, [name]: value } : row)
            )
        }));
    };

    async componentDidMount(){

        this.setState({isLoading: true});
        
        console.log("AA ")
        await CustomerService.getAllCustomers()
            .then(
                response => {

                    for(var i = 0; i < response.data.length; i++)
                    {
                        response.data[i].countryName = response.data[i].country.countryName; 
                        response.data[i].customerPaymentStatusName = response.data[i].customerPaymentStatus.customerPaymentStatusName;
                    }
                    this.setState({
                        data: response.data, isLoading: false
                    })
                }
            )
            .catch(
                error => this.setState({
                    error,
                    isLoading: false
                })
            );
        
        console.log(this.state.customersData)
        // this.setState({ data: this.state.customersData})

        const currentUser =  await AuthService.getCurrentUser();

        if (!currentUser)
        {
            this.setState({ redirect: "/login" });
        }
        this.setState({ currentUser: currentUser, userReady: true })
        

    }

    render() {

        console.log(this.state.data)

        const { currentUser, redirect, error, isLoading } = this.state;

        if (redirect) {
            return <Redirect to={redirect} />
        }

        if (error === true) {
            return <p>{error.message}</p>;
          }

        if (isLoading === true) {
            return <p>Loading...</p>;
        }

      
        return(
            <Container style={{width: '100%'}}>
                <h1 className="text-center">
                    <span className="font-italic">Klientai</span>
                </h1>
                <Row>
                    <Col xs={5} md={5} lg={2}>
                    <Button className="btn-m btn-secondary btn-block" type="submit" onClick={() => this.handleAdd()}>Pridėti klientą</Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <MuiThemeProvider>
                        <Table
                            handleRemove={this.handleRemove}
                            startEditing={this.startEditing}
                            editIdx={this.state.editIdx}
                            stopEditing={this.stopEditing}
                            handleChange={this.handleChange}
                            data={this.state.data}
                            header={[
                                {   name: "Įmones kodas", 
                                    prop: "customerCompanyCode"
                                },
                                {
                                    name: "Pavadinimas",
                                    prop: "customerCompanyName"
                                },
                                {
                                    name: "El. paštas",
                                    prop: "customerEmail"
                                },
                                {
                                    name: "Adresas",
                                    prop: "customerAdress"
                                },
                                {
                                    name: "Pristatymo adresas", 
                                    prop: "customerDeliveryAdress1"
                                },
                                {
                                    name: "Gavėjo vardas", 
                                    prop: "customerDeliveryPersonName"
                                },
                                {
                                    name: "Gavėjo tel. nr.", 
                                    prop: "customerDeliveryPersonPhoneNumber"
                                },
                                {
                                    name: "PVM mokėtojo kodas", 
                                    prop: "customerVATCode"
                                },
                                {
                                    name: "Kontaktinio asmens vardas",
                                    prop: "customerContactPersonName"
                                }, 
                                {
                                    name: "Kontaktinio asmens tel. numeris",
                                    prop: "customerContactPersonPhoneNumber"
                                },
                                {
                                    name: "Mokėjimų statusas",
                                    prop: "customerPaymentStatusName"
                                }, 
                                {
                                    name: "Šalis",
                                    prop: "countryName"
                                }
                            ]}
                        />
                        </MuiThemeProvider>
                    </Col>
                </Row>
            </Container>
        )
    }
}
export default ClientsPage;