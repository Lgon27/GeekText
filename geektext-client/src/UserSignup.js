import React, { Component } from 'react';
import Axios from 'axios';
import TextField from '@material-ui/core/TextField'
import './myStyles.css'



class UserSignup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            loginID: '',
            loginPassword: '',
            passwordConfirm: '',
            firstName: '',
            lastName: '',
            emailAddress: '',
            homeAddress: '',
            nickname: '',
            shippingAddress: '',
            creditCardNumber: '',
            creditCardCCV: -1,
            creditCardExpirationDate: Date.now()
        }


        this.handleLoginIDChange = this.handleLoginIDChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmChange = this.handleConfirmChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleAddressChange = this.handleAddressChange.bind(this);
        this.handleNicknameChange = this.handleNicknameChange.bind(this);
        this.handleShipAddrChange = this.handleShipAddrChange.bind(this);
        this.handleCCChange = this.handleCCChange.bind(this);
        this.handleCCVChange = this.handleCCVChange.bind(this);
        this.handleExpirDateChange = this.handleExpirDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)



    }

    handleSubmit(event) {
        event.preventDefault()

        let loginID = this.state.loginID;
        let loginPassword = this.state.loginPassword;
        let firstName = this.state.firstName;
        let lastName = this.state.firstName;
        let name = firstName + ' ' + lastName;
        let emailAddress = this.state.emailAddress;
        let homeAddress = this.state.homeAddress;
        let nickname = this.state.nickname;
        let shippingAddress = this.state.shippingAddress;
        let creditCardNumber = this.state.creditCardNumber;
        let creditCardCCV = this.state.creditCardCCV;
        let creditCardExpirationDate = this.state.creditCardExpirationDate;

        this.createUser(loginID, loginPassword, name, emailAddress, homeAddress, nickname, shippingAddress, creditCardNumber, creditCardCCV, creditCardExpirationDate)
    }

    createUser(loginID, loginPassword, name, emailAddress, homeAddress, nickname, shippingAddress, creditCardNumber, creditCardCCV, creditCardExpirationDate) {
        Axios.post('http://localhost:3000/post/user', {
            loginID: loginID,
            loginPassword: loginPassword,
            name: name,
            emailAddress: emailAddress,
            homeAddress: homeAddress,
            nickname: nickname,
            shippingAddress: shippingAddress,
            creditCardNumber: creditCardNumber,
            creditCardCCV: creditCardCCV,
            creditCardExpirationDate: creditCardExpirationDate

        }).then(response => {
            console.log('user created')
        }).catch(function (error) {
            console.log(error)
        })
    }






    handleLoginIDChange(event) {
        this.setState({
            loginID: event.target.value
        })
        console.log(this.state.loginID)
    }

    handlePasswordChange(event) {
        this.setState({
            loginPassword: event.target.value
        })
        console.log(this.state.loginPassword)
    }
    handleConfirmChange(event) {
        this.setState({
            passwordConfirm: event.target.value
        })
        console.log(this.state.passwordConfirm)
    }
    handleFirstNameChange(event) {
        this.setState({
            firstName: event.target.value
        })
        console.log(this.state.firstName)
    }
    handleLastNameChange(event) {
        this.setState({
            lastName: event.target.value
        })
        console.log(this.state.lastName)
    }
    handleEmailChange(event) {
        this.setState({
            emailAddress: event.target.value
        })
        console.log(this.state.emailAddress)
    }
    handleAddressChange(event) {
        this.setState({
            homeAddress: event.target.value
        })
        console.log(this.state.homeAddress)
    }
    handleNicknameChange(event) {
        this.setState({
            nickname: event.target.value
        })
        console.log(this.state.nickname)
    }
    handleShipAddrChange(event) {
        this.setState({
            shippingAddress: event.target.value
        })
        console.log(this.state.shippingAddress)
    }
    handleCCChange(event) {
        this.setState({
            creditCardNumber: event.target.value
        })
        console.log(this.state.creditCardNumber)
    }
    handleCCVChange(event) {
        this.setState({
            creditCardCCV: event.target.value
        })
        console.log(this.state.creditCardCCV)
    }
    handleExpirDateChange(event) {
        this.setState({
            creditCardExpirationDate: event.target.value
        })
        console.log(this.state.creditCardExpirationDate)
    }





    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h3>User Information</h3>
                    <div>
                        <span className = 'textform'>
                            <TextField label="Login ID" onChange={this.handleLoginIDChange} />
                        </span>
                        <span className = 'textform'>
                            <TextField label="Password" type="password" onChange={this.handlePasswordChange} />
                        </span>
                        <span className = 'textform'>
                            <TextField label="Confirm Password" type="password" onChange={this.handleConfirmChange} />
                        </span>
                    </div>
                    <div>
                        <span className = 'textform'>
                            <TextField label="First Name" onChange={this.handleFirstNameChange} />
                        </span>
                        <span className = 'textform'>
                            <TextField label="Last Name" onChange={this.handleLastNameChange} />
                        </span>
                        <span className = 'textform'>
                            <TextField label="Nickname" onChange={this.handleNicknameChange} />
                        </span>
                    </div>
                    <div>
                        <span className = 'textform'>
                            <TextField label="Email Address" type="email" onChange={this.handleEmailChange} />
                        </span>
                        <span className = 'textform'>
                             <TextField label="Home Address" onChange={this.handleAddressChange} />
                        </span>
                    </div>

                    
                    



                </form>
            </div>
        )
    }
}

export default UserSignup;
