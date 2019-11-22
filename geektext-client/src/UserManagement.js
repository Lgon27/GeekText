import React, { Component } from 'react';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import Billing from './Billing';
import UserInfoEdit from './UserInfoEdit'
import UserLoginEdit from './UserLoginEdit';
import TextField from '@material-ui/core/TextField'
import { throws } from 'assert';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { array } from 'prop-types';


class UserManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginID: this.props.loginID,
            loginPassword: '',
            name: this.props.name,
            emailAddress: this.props.emailAddress,
            homeAddress: this.props.homeAddress,
            nickname: this.props.nickname,
            editController: 0,
            updateCounter: this.props.updateCounter,
            return: this.props.return,
            billingList: [],
            cardNumber: '',
            cardCCV: '',
            cardExpDate: '',
            cardAddress: '',
            streetAddress: '',
            city: '',
            state: '',
            zipcode: '',
            addressList: []
        }
        this.setEditUserFlag = this.setEditUserFlag.bind(this);
        this.setEditLoginFlag = this.setEditLoginFlag.bind(this);
        this.handleCardNumChange = this.handleCardNumChange.bind(this);
        this.handleCCVChange = this.handleCCVChange.bind(this);
        this.handleExpDateChange = this.handleExpDateChange.bind(this);
        this.handleCardAddrChange = this.handleCardAddrChange.bind(this);
        this.handleCardSubmit = this.handleCardSubmit.bind(this);

        this.handleStreetAddrChange = this.handleStreetAddrChange.bind(this);
        this.handleCityChange = this.handleCityChange.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleZipCodeChange = this.handleZipCodeChange.bind(this)
        this.handleAddressSubmit = this.handleAddressSubmit.bind(this)

    }

    componentWillReceiveProps() {
        this.forceUpdate()
    }

    componentDidMount() {
        let loginID = this.props.loginID

        Axios.get(`http://localhost:3000/get/specificUser/${loginID}`)
            .then(response => {
                let data = response.data;
                console.log(data)
                this.setState({
                    loginID: data[0].loginID,
                    loginPassword: data[0].loginPassword,
                    name: data[0].name,
                    emailAddress: data[0].emailAddress,
                    homeAddress: data[0].homeAddress,
                    nickname: data[0].nickname,
                    editController: 0

                })
            })
            .catch(function (error) {
                console.log(error)
                alert('errror of some kind')
            })

        Axios.get(`http://localhost:3000/get/billing/${loginID}`)
            .then(response => {
                let data = response.data;
                console.log(data)

                var cardList = [];

                for (let i in data) {
                    cardList.push(data[i].creditCardNumber)
                }

                this.setState({
                    billingList: cardList
                })

                console.log(this.state.billingList)
            })
            .catch(function (error) {
                console.log(error)
                alert('error here')
            })

        Axios.get(`http://localhost:3000/get/shipping/${loginID}`)
            .then(response => {
                let data = response.data;
                console.log(data)

                var shipList = [];

                for (let i in data) {
                    shipList.push(data[i].streetAddress)
                }

                this.setState({
                    addressList: shipList
                })

                console.log(this.state.addressList)
            })
            .catch(function (error) {
                console.log(error)
                alert('error here')
            })


    }


    setEditUserFlag() {
        this.setState({
            editController: 1
        })

    }

    setEditLoginFlag() {
        this.setState({
            editController: 2
        })

    }


    handleCardNumChange(event) {
        this.setState({
            cardNumber: event.target.value
        })


    }
    handleCCVChange(event) {
        this.setState({
            cardCCV: event.target.value
        })
    }
    handleExpDateChange(event) {
        this.setState({
            cardExpDate: event.target.value
        })
    }
    handleCardAddrChange(event) {
        this.setState({
            cardAddress: event.target.value
        })
    }

    handleCardSubmit(event) {
        event.preventDefault()
        console.log('submitted')

        if (this.verifyCardInfo()) {
            console.log('dointhis')
            Axios.post('http://localhost:3000/post/billing', {
                loginID: this.state.loginID,
                streetAddress: this.state.cardAddress,
                creditCardNumber: this.state.cardNumber,
                creditCardCCV: this.state.cardCCV,
                creditCardExpirationDate: this.state.cardExpDate
            }).then(response => {
                let cardList = this.state.billingList
                cardList.push(this.state.cardNumber)
                this.setState({
                    billingList: cardList
                })
                console.log('billing information added')
                alert('Billing Information Submitted')
            }).catch(function (error) {
                console.log(error)

            })
        }


        this.forceUpdate();

        event.target.reset();

    }

    deleteCard(card) {
        console.log(card)


        Axios.delete(`http://localhost:3000/delete/billing/${card}`)
            .then(response => {
                let cardList = this.state.billingList
                for (let i in cardList) {
                    if (cardList[i] === card) {
                        cardList.splice(i, 1)
                    }
                }

                this.setState({
                    billingList: cardList
                })

                console.log(cardList)

            }).catch(function (error) {
                console.log(error)
            })
    }

    verifyNoSpecChars(input) {
        let inputString = input;
        var pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ]/)

        if (pattern.test(inputString)) {
            return false;
        }
        return true
    }

    verifyOnlyForwardSlash(input) {
        let inputString = input;
        var pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,{}|\\":<>\?abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ]/)

        if (pattern.test(inputString)) {
            return false;
        }
        return true
    }

    verifyCardInfo() {
        let cardNumber = this.state.cardNumber;
        let cardCCV = this.state.cardCCV;
        let cardExpDate = this.state.cardExpDate;
        let cardAddress = this.state.cardAddress;

        let cardFlag = this.verifyNoSpecChars(cardNumber)
        let CCVFlag = this.verifyNoSpecChars(cardCCV)
        let expDateFlag = this.verifyOnlyForwardSlash(cardExpDate)
        let zipCodeFlag = this.verifyNoSpecChars(cardAddress)

        //Verify CC Num
        if (!cardFlag || cardNumber.length != 10) {
            alert('Card number must be 16 digits long in the form xxxx xxxx xxxx xxxx\ncard number must contain special characters or letters')
            return false
        }

        //Verify CCV
        if (!CCVFlag || cardCCV.length != 3) {
            alert('CCV must be 3 digits long in the form xxx \CCV must not contain special characters or letters')
            return false
        }

        //Verify Exp Date
        if (cardExpDate.includes('/')) {
            let aux = cardExpDate.split("/")
            if (aux.length != 2 || !expDateFlag || aux[0].length != 2 || aux[1].length != 2) {
                alert('Card expiration date must be in the form mo/yr and must not contain numbers or special characters aside from /')
                return false

            }
        }
        else {
            alert('Card expiration date must be in the form mo/yr and must not contain numbers or special characters aside from /')
            return false
        }

        if (!zipCodeFlag || cardAddress.length != 5) {
            alert('Zip Code must be 5 digits long in the form xxxxx\nZip Code must not contain special characters or letters')
            return false
        }

        return true
    }

    handleStreetAddrChange(event) {
        this.setState({
            streetAddress: event.target.value
        })
        console.log(this.state.streetAddress)
        console.log(this.state.loginID)

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

    handleAddressSubmit(event) {
        event.preventDefault()

        if (this.verifyAddress(this.state.streetAddress, this.state.city, this.state.state, this.state.zipcode)) {
            Axios.post('http://localhost:3000/post/shipping', {
                loginID: this.state.loginID,
                streetAddress: this.state.streetAddress,
                city: this.state.city,
                state: this.state.state,
                zipCode: this.state.zipcode

            }).then(response => {
                let addrList = this.state.addressList
                addrList.push(this.state.streetAddress)
                this.setState({
                    addressList: addrList
                })
            }).catch(function (error) {
                console.log(error)
            })
        }
        else {
            alert('Street Address & Zip Code must not contain any special characters\nCity & State must contain no special characters or numbers\nZip Code must be 5 digits long')
        }

        this.forceUpdate();

        event.target.reset();
    }

    deleteAddr(addr) {
        console.log(addr)


        Axios.delete(`http://localhost:3000/delete/shipping/${addr}`)
            .then(response => {
                let addrList = this.state.addressList
                for (let i in addrList) {
                    if (addrList[i] === addr) {
                        addrList.splice(i, 1)
                    }
                }

                this.setState({
                    addressList: addrList
                })

                console.log(addrList)

            }).catch(function (error) {
                console.log(error)
            })
    }


    verifyAddress(streetAddress, city, state, zipCode) {
        let streetFlag = this.verifyNoSpecCharsAddr(streetAddress)
        let cityFlag = this.verifyNoNum(city)
        let stateFlag = this.verifyNoNum(state)
        let zipFlag = this.verifyNoSpecCharsZip(zipCode)

        if (streetFlag && cityFlag && stateFlag && zipFlag && zipCode.length == 5) {
            return true
        }
        else {
            return false
        }
    }
    verifyNoSpecCharsZip(input) {
        let inputString = input;
        var pattern = new RegExp(/[~`!#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ]/)

        if (pattern.test(inputString)) {
            return false;
        }
        return true
    }

    verifyNoSpecCharsAddr(input) {
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





    //Render
    render() {

        if (this.state.editController === 0) {
            return (
                <div>
                    <h3>User Information for {this.state.loginID} </h3>
                    <p><b>{this.state.name}</b></p>
                    <p> <u> NickName:</u> {this.state.nickname}</p>
                    <p> <u> Email Address:</u> {this.state.emailAddress}</p>
                    <div>
                        <h3>Billing Information</h3>
                    </div>
                    <div>
                        {this.state.billingList.map((card, index) => (
                            <p><b>Card:</b> {card} <IconButton aria-label="delete" onClick={this.deleteCard.bind(this, card)}>
                                <DeleteIcon fontSize="small" />
                            </IconButton>
                            </p>
                        ))}
                    </div>
                    <div>
                        <Button variant="contained" color="primary" onClick={this.setEditUserFlag}>Edit User Information</Button>
                    </div>
                    <div>
                        <Button variant="contained" color="primary" onClick={this.setEditLoginFlag}>Change Password</Button>
                    </div>
                    <div>
                        <h3>Add Credit Card</h3>
                        <form onSubmit={this.handleCardSubmit}>
                            <div>
                                <span className='textform'>
                                    <TextField label="Credit Card Number" onChange={this.handleCardNumChange} />
                                </span>
                                <div>
                                    <span className='textform'>
                                        <TextField label="CCV" onChange={this.handleCCVChange} />
                                    </span>
                                </div>
                                <div>
                                    <div>
                                        <span className='textform'>
                                            <TextField label="Expiration Date" onChange={this.handleExpDateChange} />
                                        </span>
                                    </div>
                                    <div>
                                        <span className='textform'>
                                            <TextField label="Zip Code" onChange={this.handleCardAddrChange} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <input type="submit" value="Add Card" />
                        </form>
                    </div>
                    <div></div>
                    <div>
                        <h3>Add Shipping Address</h3>
                        <div>
                            {this.state.addressList.map((addr, index) => (
                                <p><b>Card:</b> {addr} <IconButton aria-label="delete" onClick={this.deleteAddr.bind(this, addr)} >
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                                </p>
                            ))}
                        </div>
                        <form onSubmit={this.handleAddressSubmit}>
                            <div>
                                <span className='textform'>
                                    <TextField label="Street Address" onChange={this.handleStreetAddrChange} />
                                </span>
                            </div>
                            <div>
                                <span className='textform'>
                                    <TextField label="City" onChange={this.handleCityChange} />
                                </span>
                            </div>
                            <div>
                                <span className='textform'>
                                    <TextField label="State/Region/Province" onChange={this.handleStateChange} />
                                </span>
                            </div>
                            <div>
                                <span className='textform'>
                                    <TextField label="Zip Code" onChange={this.handleZipCodeChange} />
                                </span>
                            </div>
                            <input type="submit" value="Add Address" />
                        </form>
                    </div>
                </div >
            )
        }
        else if (this.state.editController === 1) {
            return (
                <UserInfoEdit loginID={this.state.loginID} name={this.state.name} emailAddress={this.state.emailAddress}
                    emailAddress={this.state.emailAddress} homeAddress={this.state.homeAddress} nickname={this.state.nickname}></UserInfoEdit>
            )
        }
        else {
            return (
                <div>
                    <UserLoginEdit loginID={this.state.loginID} name={this.state.name} loginPassword={this.state.loginPassword}></UserLoginEdit>
                </div>
            )
        }

    }

}

export default UserManagement;