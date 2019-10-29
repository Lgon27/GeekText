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
            loginSuccessful: false
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
                    loginSuccessful: true
                })
            })
            .catch(function (error) {
                console.log(error)
                alert('Incorrect Username or Password')
            })
    }

    render() {

        if (this.state.loginSuccessful == true) {
            return (
                <UserManagement loginID={this.state.loginID} />
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