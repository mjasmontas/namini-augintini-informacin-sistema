import React, { Component } from 'react'
import { Container, Button, Form} from 'react-bootstrap'
import Select from 'react-select'
import DatePicker from 'react-datepicker';
import { Redirect } from "react-router-dom";

import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthService from '../services/auth.service'
import RoleService from '../services/role.service'

class AddUserPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            redirect: null,
            userReady: false,
            currentUser: { userEmail: "" },
            data: null,
            
            userFirstName : "", 
            userLastName : "", 
            userEmail : "", 
            userPassword: "",
            employeeAdress : "", 
            employeePhoneNumber : "",
            userRolesSelectionOptions : [],
            userRoles: [],
            employeeHiredDate : new Date(),

            formError : {
                userFirstName : null, 
                userLastName : null, 
                userEmail: null, 
                userPassword: null, 
                employeeAdress: null,
                employeePhoneNumber: null,
                userRoles: null,
                employeeHiredDate: null

            },
            formErrorFound : null
      
        }
        this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
        this.handleChangeLastName = this.handleChangeLastName.bind(this);
        this.handleChangeEmail = this.handleChangeEmail.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.handleChangeUserRoles = this.handleChangeUserRoles.bind(this);
        this.handleChangeEmployeeHiredDate = this.handleChangeEmployeeHiredDate.bind(this);
        this.handleChangeEmployeeAdress = this.handleChangeEmployeeAdress.bind(this);
        this.handleChangeEmployeePhoneNumber = this.handleChangeEmployeePhoneNumber.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

    }

    findSomeErrors = () => {
        const {formError, userFirstName,  userLastName, userEmail, userPassword, employeeAdress, employeePhoneNumber, userRoles, employeeHiredDate} = this.state;

        if(userFirstName === null) formError.userFirstName = "Šis laukelis privalomas"

    }


    handleChangeFirstName = (e) => {
        console.log(e)
        this.setState({
            userFirstName : e.target.value
        })
    }

    handleChangeLastName(e) {
        this.setState({
            userLastName : e.target.value
        })
    }

    handleChangeEmail(e) {
        this.setState({
            userEmail: e.target.value
        })
    }

    handleChangePassword(e) {
        this.setState({
            userPassword: e.target.value
        })
    }

    handleChangeUserRoles(e){
        this.setState({userRoles:e})
    }

    handleChangeEmployeeHiredDate(e) {
        this.setState({
            employeeHiredDate : e
        })
    }

    handleChangeEmployeeAdress(e){
        this.setState({
            employeeAdress : e.target.value
        })    
    }

    handleChangeEmployeePhoneNumber(e){
        this.setState({
            employeePhoneNumber : e.target.value
        })    
    }

    async onSubmit(e) {
        e.preventDefault();
        const user = {
            userFirstName: this.state.userFirstName,
            userLastName: this.state.userLastName, 
            userEmail: this.state.userEmail, 
            userPassword: this.state.userPassword, 
            userRoles: this.state.userRoles.map(v => (v.value)), 
            employeeHiredDate: this.state.employeeHiredDate,
            employeeAdress: this.state.employeeAdress, 
            employeePhoneNumber: this.state.employeePhoneNumber
        }
        
        await AuthService.register(user.userFirstName, user.userLastName, user.userEmail, user.userPassword, user.userRoles,
            user.employeeHiredDate, user.employeeAdress, user.employeePhoneNumber)
            .then(res=> console.log(res.data))
            .catch(err=> console.log(err))
        

        this.setState({
            userFirstName : "", 
            userLastName : "", 
            userEmail : "", 
            userRoles: [],
            userPassword: "",
            employeeAdress : "", 
            employeePhoneNumber : "",
            userRolesSelectionOptions : [],
            userRolesId: [],
            userRolesNames: "", 
            employeeHiredDate : new Date(),
        });

        window.location.reload();
    }


    async componentDidMount() {

        this.setState({ data: this.state.usersData})
        const currentUser =  await AuthService.getCurrentUser();

        if (!currentUser)
        {
            this.setState({ redirect: "/login" });
        }
        this.setState({ currentUser: currentUser, userReady: true })

        this.getUserRoles();
    }


    async getUserRoles(){
        const res = await RoleService.getAllRoles();
        const data = res.data
        const options = data.map(d => ({
          "label" : d.roleLabel,
          "value" : d.roleName
    
        }))

        this.setState({userRolesSelectionOptions: options})
    }

    render() {

        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
      
        const { currentUser } = this.state;
        
        return(
            <Container>
                    <h1 className="text-center">
                        <span className="font-italic" style={{fontSize : '75%'}}>Pridėkite naują vartotoją</span>
                    </h1>

                    <Form onSubmit={this.onSubmit}>
                
                        <Form.Group>
                            <Form.Label>Vartotojo vardas</Form.Label>
                            <Form.Control placeholder="Įveskite vartotojo vardą" onChange={this.handleChangeFirstName.bind(this)}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Vartotojo pavardė</Form.Label>
                            <Form.Control placeholder="Įveskite vartotojo pavardę" onChange={this.handleChangeLastName}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Vartotojo el. paštas</Form.Label>
                            <Form.Control placeholder="Įveskite vartotojo el. paštą" onChange={this.handleChangeEmail}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Slaptažodis</Form.Label>
                            <Form.Control type="password" placeholder="Įveskite slaptažodį" onChange={this.handleChangePassword}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Vartotojo prieigos lygis</Form.Label>
                            <Select options={this.state.userRolesSelectionOptions} onChange={this.handleChangeUserRoles} isMulti />

                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Darbuotojo pasamdymo data</Form.Label>
                            <br/>
                            <DatePicker
                                selected={ this.state.employeeHiredDate }
                                onChange={ this.handleChangeEmployeeHiredDate}
                                name="employeeHiredDate"
                                dateFormat="MM/dd/yyyy"
                            />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Darbuotojo gyvenamosios vietos adresas</Form.Label>
                            <Form.Control placeholder="Įveskite darbuotojo gyvenamosios vietos adresą" onChange={this.handleChangeEmployeeAdress}/>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Darbuotojo telefono numeris</Form.Label>
                            <Form.Control placeholder="Įveskite darbuotojo telefono numerį" onChange={this.handleChangeEmployeePhoneNumber}/>
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            Pridėti
                        </Button>
                    </Form>
                     
            </Container>
        )
    }
}
export default AddUserPage;