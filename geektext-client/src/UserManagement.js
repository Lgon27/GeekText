import React, { Component } from 'react';
import Axios from 'axios';
import Button from '@material-ui/core/Button';
import Billing from './Billing';
import UserInfoEdit from './UserInfoEdit'

class UserManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginID: this.props.loginID,
            loginPassword: '',
            name: '',
            emailAddress: '',
            homeAddress: '',
            nickname: '',
            edit: false,


        }

        this.setEditUserFlag = this.setEditUserFlag.bind(this);

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
                    editUserFlag: false

                })
            })
            .catch(function (error) {
                console.log(error)
                alert('errror of some kind')
            })
    }

    getBillingInfo() {
        return (
            <div>
                <Billing loginID={this.state.loginID} />
            </div>
        )
    }

    setEditUserFlag() {
        this.setState({
            editUserFlag: true
        })
    }

    //Render
    render() {

        if (this.state.editUserFlag === false) {
            return (
                <div>
                    <h3>User Information</h3>
                    <p><b>{this.state.name}</b></p>
                    <p> <u> NickName:</u> {this.state.nickname}</p>
                    <p> <u> Email Address:</u> {this.state.emailAddress}</p>
                    <p> <u> Home Address:</u> {this.state.homeAddress}</p>
                    <div>
                        <Button variant="contained" color="primary" onClick={this.setEditUserFlag}>Edit User Information</Button>
                    </div>
                    <div>{this.getBillingInfo()}</div>
                </div>
            )
        }
        else {
            return (
                <UserInfoEdit loginID={this.state.loginID} name={this.state.name} emailAddress={this.state.emailAddress}
                    emailAddress={this.state.emailAddress} homeAddress={this.state.homeAddress} nickname={this.state.nickname}></UserInfoEdit>
            )
        }

    }

}

export default UserManagement;