import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'
import Axios from 'axios';

class Billing extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginID: this.props.loginID,
            shippingAddress: '',
            creditCardNumber: '',
            creditCardCCV: '',
            creditCardExpirationDate: ''

        }

        this.handleCCNumChange = this.handleCCNumChange.bind(this);
        this.handleCCVChange = this.handleCCVChange.bind(this);
        this.handleExpDateChange = this.handleExpDateChange.bind(this);
        this.handleShipAddrChange = this.handleShipAddrChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleSubmit(event) {
        event.preventDefault();


        console.log(this.state.loginID + "dasd")

        this.createBilling()
        event.target.reset();
    }

    createBilling() {
        Axios.post('http://localhost:3000/post/billing', {
            loginID: this.props.loginID,
            shippingAddress: this.state.shippingAddress,
            creditCardNumber: this.state.creditCardNumber,
            creditCardCCV: this.state.creditCardCCV,
            creditCardExpirationDate: this.state.creditCardExpirationDate
        }).then(response => {
            console.log('billing information added')
            alert('Billing Information Submitted')
        }).catch(function (error) {
            console.log(error)

        })
    }

    handleShipAddrChange(event) {
        this.setState({
            shippingAddress: event.target.value
        })
    }
    handleCCNumChange(event) {
        this.setState({
            creditCardNumber: event.target.value
        })
    }
    handleCCVChange(event) {
        this.setState({
            creditCardCCV: event.target.value
        })
    }
    handleExpDateChange(event) {
        this.setState({
            creditCardExpirationDate: event.target.value
        })
    }

    render() {

        return (
            <div>
                <h3>Billing Information</h3>
                <div>Sample CC Information</div>


                <form onSubmit={this.handleSubmit}>
                    <h3>Add New Billing Information</h3>
                    <div>
                        <TextField label="Shipping Address" onChange={this.handleShipAddrChange} />
                    </div>
                    <div>
                        <TextField label="Credit Card Number" onChange={this.handleCCNumChange} />
                    </div>
                    <div>
                        <TextField label="CCV" onChange={this.handleCCVChange} />
                    </div>
                    <div>
                        <TextField label="Expiration Date" onChange={this.handleExpDateChange} />
                    </div>
                    <div>
                        <input type="submit" value="Submit" />
                    </div>


                </form>
            </div>

        )
    }
}

export default Billing