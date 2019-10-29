import React, { Component } from 'react';
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

class UserManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginID: '',
            loginPassword: '',
            name: '',
            emailAddress: '',
            homeAddress: '',
            nickname: ''

        }
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
                test
            </div>
        )
    }
    //Render
    render() {
        console.log(this.state.name)
        return (
            <div>
                <h3>User Information</h3>
                <p><b>{this.state.name}</b></p>
                <p>{this.state.nickname}</p>
                <p>{this.state.emailAddress}</p>
                <p>{this.state.homeAddress}</p>
                <div>
                    <Button variant="contained" color="primary">Edit User Information</Button>
                </div>

                <h3>Billing Information</h3>
                <div>{this.getBillingInfo()}</div>
            </div>
        )
    }

}

export default UserManagement;