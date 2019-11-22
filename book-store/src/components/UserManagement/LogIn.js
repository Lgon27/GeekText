import React, { Component } from 'react';
import Axios from 'axios';
import TextField from '@material-ui/core/TextField'
import UserManagement from './UserManagement'

class LogIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginID: 'null',
            loginPassword: 'null',
            loginSuccessful: false,
            name: 'null',
            emailAddress: 'null',
            homeAddress: 'null',
            nickname: 'null'
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleLoginIDChange = this.handleLoginIDChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        let loginID = this.state.loginID;
        let loginPassword = this.state.loginPassword

        this.logIn(loginID, loginPassword)



    }
    handleLoginIDChange(event) {
        this.setState({
            loginID: event.target.value
        })
    }
    handlePasswordChange(event) {
        this.setState({
            loginPassword: event.target.value
        })
    }

    logIn(loginID, loginPassword) {
        Axios.get(`http://localhost:3000/get/users/${loginID}/${loginPassword}`)
            .then(response => {
                let data = response.data;
                console.log(data)
                this.setState({
                    loginSuccessful: true,
                    name: data[0].name,
                    emailAddress: data[0].emailAddress,
                    homeAddress: data[0].homeAddress,
                    nickname: data[0].nickname

                })
            })
            .catch(function (error) {
                console.log(error)
                alert('Incorrect Username or Password')
            })
    }

    render() {

        if (this.state.loginSuccessful === true) {
            return (
                <UserManagement loginID={this.state.loginID} updateCounter={0} name={this.state.name} emailAddress={this.state.emailAddress} homeAddress={this.state.homeAddress} nickname={this.state.name} />
            )
        }
        else {
            return (
                <form onSubmit={this.handleSubmit}>
                    <h3>User Information</h3>
                    <TextField label="Login ID" onChange={this.handleLoginIDChange} />
                    <TextField label="Password" type="password" onChange={this.handlePasswordChange} />

                    <div>
                        <input type="submit" value="Log In" />
                    </div>



                </form>

            )
        }

    }
}

export default LogIn