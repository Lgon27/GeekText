import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Cart from './components/Cart'
import LogIn from './components/UserManagement/LogIn'
import UserSignup from './components/UserManagement/UserSignup'
import Reviews from './components/UserReview'
import book_details from "./components/book_details";
import mitchell from "./components/mitchell";
import UserManagement from './components/UserManagement/UserManagement';
import LogInManagement from './components/UserManagement/LoginManagement';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/cart" component={Cart} />
            <Route path="/reviews" component={Reviews} />
            <Route path="/book_details" component={book_details} />
            <Route path="/mitchell" component={mitchell} />
            <Route path="/login" component={LogIn} />
            <Route path="/signup" component={UserSignup} />
            <Route path="/home:loginID" exact component={Home} />
            <Route path="/management" component={LogInManagement} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
