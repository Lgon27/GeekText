import React, { Component } from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Cart from './components/Cart'
import LogIn from './components/UserManagement/LogIn'
import UserSignup from './components/UserManagement/UserSignup'
import Reviews from './components/UserReview'


class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">

        <Navbar/>
          <Switch>
              <Route exact path="/" component={Home}/>
              <Route path="/cart" component={Cart}/>
              <Route path="/reviews" component={Reviews}/>
              <Route path="/login" component={LogIn}/>
              <Route path="/signup" component={UserSignup}/>
              
            </Switch>
       </div>
      </BrowserRouter>
    );
  }
}

export default App;
