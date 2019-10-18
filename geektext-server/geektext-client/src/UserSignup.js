import React, { Component } from 'react';
import Axios from 'axios';
import TextField from '@material-ui/core/TextField'
import { throwStatement } from '@babel/types';

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

        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
    }

    handleFirstNameChange(event) {
        this.setState({
            firstName: event.target.value
        })
        console.log(this.state.firstName)
    }

    render() {
        return (
            <div>
                <form>
                    <h3>User Information</h3>
                    <TextField label="Login ID" onChange={this.handleLoginIDChange} />
                    <TextField label="Password" type="password" onChange={this.handlePasswordChange} />
                    <TextField label="Confirm Password" type="password" onChange={this.handleConfirmChange} />
                    <TextField label="First Name" onChange={this.handleFirstNameChange} />
                    <TextField label="Last Name" onChange={this.handleLastNameChange} />
                    <TextField label="Email Address" type="email" onChange={this.handleEmailChange} />
                    <TextField label="Home Address" onChange={this.handleAddressChange} />
                    <TextField label="Nickname" onChange={this.handleNicknameChange} />
                    <h3>Billing Information</h3>
                    <TextField label="Shipping Address" onChange={this.handleShipAddrChange} />
                    <TextField label="Credit Card Number" onChange={this.handleCCChange} />
                    <TextField label="CCV" onChange={this.handleCCVChange} />
                    <TextField label="Expiration Date" onChange={this.handleExpirDateChange} />

                    <div>
                        <input type="submit" />
                    </div>



                </form>
            </div>
        )
    }
}

export default UserSignup;
