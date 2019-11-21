import React, { Component } from 'react';
import Axios from 'axios';
import TextField from '@material-ui/core/TextField'
import './myStyles.css'
import UserManagement from './UserManagement'


class userLoginEdit extends Component {
    constructor(props) {
        super(props);
        let fullName = this.props.name
        this.state = {
            loginID: this.props.loginID,
            loginPassword: this.props.loginPassword,
            name: this.props.name,
            loginConfirm: '',
            oldPassword: this.props.loginPassword,
            oldPasswordConfirm: '',
            return: false

        }



        this.updateUser = this.updateUser.bind(this)
        this.handleLoginPassChange = this.handleLoginPassChange.bind(this)
        this.handlePassConfirmChange = this.handlePassConfirmChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleOldPassChange = this.handleOldPassChange.bind(this)



    }

    handleLoginPassChange(event) {
        this.setState({
            loginPassword: event.target.value
        })
    }

    handlePassConfirmChange(event) {
        this.setState({
            loginConfirm: event.target.value
        })
    }

    handleOldPassChange(event) {
        this.setState({
            oldPasswordConfirm: event.target.value
        })
    }

    handleSubmit(event) {
        event.preventDefault()
        this.updateUser()

        console.log(this.state.loginPassword)
        console.log(this.state.loginConfirm)

    }

    updateUser() {


        if (this.state.oldPasswordConfirm === this.state.oldPassword) {
            if (this.state.loginPassword === this.state.loginConfirm) {
                Axios.patch(`http://localhost:3000/patch/updateLogin/${this.state.loginID}`, {
                    loginID: this.state.loginID,
                    loginPassword: this.state.loginPassword
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
            else {
                alert('Passwords must match')
            }
        }
        else {
            alert('Incorrect Password')
        }



    }

    render() {

        if (this.state.return === false) {
            return (
                <div>
                    <div>
                        <form onSubmit={this.handleSubmit}>
                            <h3>Edit Password for {this.state.loginID}</h3>
                            <div>
                                <span className='textform'>
                                    <TextField label="Current Password" type="password" onChange={this.handleOldPassChange} />
                                </span>
                            </div>
                            <div>
                                <span className='textform'>
                                    <TextField label="New Password" type="password" onChange={this.handleLoginPassChange} />
                                </span>
                                <span className='textform'>
                                    <TextField label="Confirm password" type="password" onChange={this.handlePassConfirmChange} />
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
                <UserManagement loginID={this.state.loginID}></UserManagement>
            )
        }




    }
}

export default userLoginEdit
