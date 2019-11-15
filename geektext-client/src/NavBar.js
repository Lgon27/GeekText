import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import HomePage from './HomePage';
import UserSignUp from './UserSignup';
import Login from './LogIn'



class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            signUp: false,
            logIn: false,
            homePage: false
        }

        this.handleSignUp = this.handleSignUp.bind(this);
        this.handleLogIn = this.handleLogIn.bind(this);
        this.handleHomePage = this.handleHomePage.bind(this);
    }




    handleSignUp() {
        this.setState({
            signUp: true,
            logIn: false,
            homePage: false
        })
    }

    handleLogIn() {
        this.setState({
            signUp: false,
            logIn: true,
            homePage: false
        })
    }


    handleHomePage() {
        this.setState({
            signUp: false,
            logIn: false,
            homePage: true
        })
    }

    render() {

        if (this.state.signUp === true)
            return (
                <div>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton edge="start" color="inherit" aria-label="menu" onClick={this.handleHomePage}>
                                <MenuIcon />
                            </IconButton>
                            <Button color="inherit" onClick={this.handleSignUp}>Sign Up</Button>
                            <Button color="inherit" onClick={this.handleLogIn}>Login</Button>
                        </Toolbar>
                    </AppBar>
                    <UserSignUp />
                </div>



            )
        else if (this.state.logIn === true)
            return (
                <div>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton edge="start" color="inherit" aria-label="menu" onClick={this.handleHomePage}>
                                <MenuIcon />
                            </IconButton>
                            <Button color="inherit" onClick={this.handleSignUp}>Sign Up</Button>
                            <Button color="inherit" onClick={this.handleLogIn}>Login</Button>
                        </Toolbar>
                    </AppBar>

                    <Login />

                </div>
            )
        else if (this.state.homePage === true)
            return (
                <div>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton edge="start" color="inherit" aria-label="menu" onClick={this.handleHomePage}>
                                <MenuIcon />
                            </IconButton>
                            <Button color="inherit" onClick={this.handleSignUp}>Sign Up</Button>
                            <Button color="inherit" onClick={this.handleLogIn}>Login</Button>
                        </Toolbar>
                    </AppBar>

                    <HomePage />
                </div>
            )
        else {
            return (
                <div>
                    <AppBar position="static">
                        <Toolbar>
                            <IconButton edge="start" color="inherit" aria-label="menu" onClick={this.handleHomePage}>
                                <MenuIcon />
                            </IconButton>
                            <Button color="inherit" onClick={this.handleSignUp}>Sign Up</Button>
                            <Button color="inherit" onClick={this.handleLogIn}>Login</Button>
                        </Toolbar>
                    </AppBar>

                    <HomePage />
                </div>

            )
        }


    }
}

export default NavBar
