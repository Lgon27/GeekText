import React, { Component } from 'react';
import Axios from 'axios';
import TextField from '@material-ui/core/TextField'
import './myStyles.css'
import UserManagement from './UserManagement'


class userInfoEdit extends Component {
    constructor(props) {
        super(props);
        let fullName = this.props.name
        let splitName = fullName.split(" ")
        this.state = {
            loginID: this.props.loginID,
            loginPassword: this.props.loginPassword,
            name: this.props.name,
            firstName: splitName[0],
            lastName: splitName[1],
            emailAddress: this.props.emailAddress,
            homeAddress: this.props.homeAddress,
            nickname: this.props.nickname,
            return: false
        }

        this.handleFirstNameChange = this.handleFirstNameChange.bind(this)
        this.HandleLastNameChange = this.HandleLastNameChange.bind(this)
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handleAddressChange = this.handleAddressChange.bind(this)
        this.handleNicknameChange = this.handleNicknameChange.bind(this)
        this.updateUser = this.updateUser.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleFirstNameChange(event) {
        this.setState({
            firstName: event.target.value
        })
    }
    HandleLastNameChange(event) {
        this.setState({
            lastName: event.target.value
        })
    }
    handleEmailChange(event) {
        this.setState({
            emailAddress: event.target.value
        })
    }
    handleAddressChange(event) {
        this.setState({
            homeAddress: event.target.value
        })
    }
    handleNicknameChange(event) {
        this.setState({
            nickname: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.updateUser()
        console.log('submitted')
    }

    updateUser() {
        Axios.patch(`http://localhost:3000/patch/updateAll/${this.state.loginID}`, {
            name: this.state.firstName + " " + this.state.lastName,
            emailAddress: this.state.emailAddress,
            homeAddress: this.state.homeAddress,
            nickname: this.state.nickname
        }).then(response => {
            console.log('user update')
        }).catch(function (error) {
            console.log(error)
        })
        alert('User Updated')
        this.setState({
            return: true
        })
    }




    render() {

        if (this.state.return === false) {
            return (
                <div>
                    <div>
                        <p> loginID: {this.state.loginID}</p>
                        <p> name: {this.state.name}</p>
                        <p> firstName: {this.state.firstName}</p>
                        <p> lastName: {this.state.lastName}</p>
                        <p> emailAddress : {this.state.emailAddress}</p>
                        <p> homeAddress : {this.state.homeAddress}</p>
                        <p> nickname : {this.state.nickname}</p>
                    </div>
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <h3>Edit User Information for {this.state.loginID}</h3>
                            <div>
                                <span className='textform'>
                                    <TextField label="First Name" defaultValue={this.state.loginID} onChange={this.handleFirstNameChange} />
                                </span>
                                <span className='textform'>
                                    <TextField label="Last Name" defaultValue={this.state.lastName} onChange={this.HandleLastNameChange} />
                                </span>
                                <span className='textform'>
                                    <TextField label="Nickname" defaultValue={this.state.nickname} onChange={this.handleNicknameChange} />
                                </span>
                            </div>
                            <div>
                                <span className='textform'>
                                    <TextField label="Email Address" type="email" defaultValue={this.state.emailAddress} onChange={this.handleEmailChange} />
                                </span>
                                <span className='textform'>
                                    <TextField label="Home Address" defaultValue={this.state.homeAddress} onChange={this.handleAddressChange} />
                                </span>
                            </div>
                            <div>
                                <input type="submit" value="Submit" />
                            </div>

                        </form>
                    </div>

                </div>
            )
        }
        else {
            return (
                <div>
                    <UserManagement loginID={this.state.loginID} return={true} editUserFlag={false} name={this.state.name} emailAddress={this.state.emailAddress} homeAddress={this.state.homeAddress} nickname={this.state.nickname} />
                </div>
            )
        }

    }
}

export default userInfoEdit
