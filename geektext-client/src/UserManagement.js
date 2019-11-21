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


        }

        this.setEditUserFlag = this.setEditUserFlag.bind(this);
        this.setEditLoginFlag = this.setEditLoginFlag.bind(this);
        this.handleCardNumChange = this.handleCardNumChange.bind(this);
        this.handleCCVChange = this.handleCCVChange.bind(this);
        this.handleExpDateChange = this.handleExpDateChange.bind(this);
        this.handleCardAddrChange = this.handleCardAddrChange.bind(this);
        this.handleCardSubmit = this.handleCardSubmit.bind(this);


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

        this.forceUpdate();

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

    verifyCardInfo() {
        let cardNumber = this.state.cardNumber;
        let cardCCV = this.state.cardCCV;
        let cardExpDate = this.state.cardExpDate;
        let cardAddress = this.state.cardAddress;

        let cardFlag = this.verifyNoSpecChars(cardNumber)

        if (!cardFlag) {
            return false
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
                            <input type="submit" value="Sign Up" />
                        </form>
                    </div>
                    <div></div>
                    <div>
                        <h3>Add Shipping Address</h3>
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