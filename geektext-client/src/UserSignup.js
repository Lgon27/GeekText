import React, { Component } from 'react';
import Axios from 'axios';
import TextField from '@material-ui/core/TextField'
import './myStyles.css'
import LogIn from './LogIn'
import { deepPurple } from '@material-ui/core/colors';
import { stat } from 'fs';



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
            creditCardNumber: '',
            creditCardCCV: -1,
            creditCardExpirationDate: Date.now(),
            signedUp: false,
            streetAddress: '',
            city: '',
            state: '',
            zipcode: ''
        }


        this.handleLoginIDChange = this.handleLoginIDChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmChange = this.handleConfirmChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleNicknameChange = this.handleNicknameChange.bind(this);
        this.handleCCChange = this.handleCCChange.bind(this);
        this.handleCCVChange = this.handleCCVChange.bind(this);
        this.handleExpirDateChange = this.handleExpirDateChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)

        this.verifyEmailAddress = this.verifyEmailAddress.bind(this)

        this.handleStreetAddrChange = this.handleStreetAddrChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleZipCodeChange = this.handleZipCodeChange.bind(this)





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


        if (this.verifyEmailAddress(emailAddress) & this.verifyAddress(this.state.streetAddress, this.state.city, this.state.state, this.state.zipcode)) {
            this.createUser(loginID, loginPassword, name, emailAddress, homeAddress,
                nickname, shippingAddress, creditCardNumber, creditCardCCV, creditCardExpirationDate)
            this.setState({
                signedUp: true
            })
        }
        else {
            alert('Email must be of the form abcabc@domain.com\nStreet Address & Zip Code must not contain any special characters\nCity & State must contain no special characters or numbers')
        }




    }

    createUser(loginID, loginPassword, name, emailAddress, homeAddress, nickname, shippingAddress, creditCardNumber, creditCardCCV, creditCardExpirationDate) {
        Axios.post('http://localhost:3000/post/user', {
            loginID: loginID,
            loginPassword: loginPassword,
            name: name,
            emailAddress: emailAddress,
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


        Axios.post('http://localhost:3000/post/shipping', {
            loginID: this.state.loginID,
            streetAddress: this.state.streetAddress,
            city: this.state.streetAddress,
            state: this.state.streetAddress,
            zipCode: this.state.streetAddress

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
    }

    handlePasswordChange(event) {
        this.setState({
            loginPassword: event.target.value
        })

    }
    handleConfirmChange(event) {
        this.setState({
            passwordConfirm: event.target.value
        })

    }
    handleFirstNameChange(event) {
        this.setState({
            firstName: event.target.value
        })

    }
    handleLastNameChange(event) {
        this.setState({
            lastName: event.target.value
        })

    }
    handleEmailChange(event) {
        this.setState({
            emailAddress: event.target.value
        })

    }
    handleNicknameChange(event) {
        this.setState({
            nickname: event.target.value
        })

    }
    handleCCChange(event) {
        this.setState({
            creditCardNumber: event.target.value
        })
    }
    handleCCVChange(event) {
        this.setState({
            creditCardCCV: event.target.value
        })
    }
    handleExpirDateChange(event) {
        this.setState({
            creditCardExpirationDate: event.target.value
        })
    }


    handleStreetAddrChange(event) {
        this.setState({
            streetAddress: event.target.value
        })
        console.log(this.state.streetAddress)

    }
    handleCityChange(event) {
        this.setState({
            city: event.target.value
        })
        console.log(this.state.city)
    }
    handleStateChange(event) {
        this.setState({
            state: event.target.value
        })
        console.log(this.state.state)
    }

    handleZipCodeChange(event) {
        this.setState({
            zipcode: event.target.value
        })
        console.log(this.state.zipcode)
    }

    verifyEmailAddress(emailAddress) {
        let atFlag = false;
        let domainFlag = false;

        console.log(emailAddress.includes('@'))

        if (emailAddress.includes('@'))
            atFlag = true

        if (emailAddress.includes('.'))
            domainFlag = true

        if (atFlag === true & domainFlag === true)
            return true
        else
            return false
    }

    verifyAddress(streetAddress, city, state, zipCode) {
        let streetFlag = this.verifyNoSpecChars(streetAddress)
        let cityFlag = this.verifyNoNum(city)
        let stateFlag = this.verifyNoNum(state)
        let zipFlag = this.verifyNoSpecChars(zipCode)

        if (streetFlag && cityFlag && stateFlag && zipFlag) {
            return true
        }
        else {
            return false
        }
    }

    verifyNoSpecChars(input) {
        let inputString = input;
        var pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?]/)

        if (pattern.test(inputString)) {
            return false;
        }
        return true

    }

    verifyNoNum(input) {
        let inputString = input;
        var pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?123456789]/)

        if (pattern.test(inputString)) {
            return false;
        }
        return true

    }




    render() {

        if (this.state.signedUp === false) {
            return (
                <div>
                    <form onSubmit={this.handleSubmit}>
                        <h3>User Information</h3>
                        <div>
                            <span className='textform'>
                                <TextField label="Login ID" required onChange={this.handleLoginIDChange} />
                            </span>
                            <span className='textform'>
                                <TextField label="Password" required type="password" onChange={this.handlePasswordChange} />
                            </span>
                            <span className='textform'>
                                <TextField label="Confirm Password" required type="password" onChange={this.handleConfirmChange} />
                            </span>
                        </div>
                        <div>
                            <span className='textform'>
                                <TextField label="First Name" required onChange={this.handleFirstNameChange} />
                            </span>
                            <span className='textform'>
                                <TextField label="Last Name" required onChange={this.handleLastNameChange} />
                            </span>
                            <span className='textform'>
                                <TextField label="Nickname" required onChange={this.handleNicknameChange} />
                            </span>
                        </div>
                        <div>
                            <span className='textform'>
                                <TextField label="Email Address" required type="email" onChange={this.handleEmailChange} />
                            </span>
                            <div>
                                <div>
                                    <h3>Shipping Address</h3>
                                    <div>
                                        <span className='textform'>
                                            <TextField label="Street Address" required onChange={this.handleStreetAddrChange} />
                                        </span>
                                    </div>
                                    <div>
                                        <span className='textform'>
                                            <TextField label="City" required onChange={this.handleCityChange} />
                                        </span>
                                        <div>
                                            <span className='textform'>
                                                <TextField label="State/Region/Province" required onChange={this.handleStateChange} />
                                            </span>
                                        </div>

                                        <div>
                                            <span className='textform'>
                                                <TextField label="Zip Code" required onChange={this.handleZipCodeChange} />
                                            </span>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div>
                            <input type="submit" value="Sign Up" />
                        </div>

                    </form>
                </div>
            )
        }
        else {
            return (
                <div>
                    <LogIn />
                </div>
            )
        }


    }
}

export default UserSignup;
