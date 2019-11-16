import React, {Component} from 'react';
import Wishlist1 from './Wishlist1';
import EditWishlist from './EditWishlist';
import Home from './Home'
import {BrowserRouter, Route} from 'react-router-dom';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {apiResponse:""};
  }



  render() {
    return (
      <BrowserRouter>
      <div>
        <Route exact path='/' render={(props) =>(
           <div className="App">
             <Home />
           </div>
        )}/>
        
          <Route path='/wishlist/:id' render={(props) =>(
           <div className="App">
             <Wishlist1 {...props} />
           </div>
        )}/>

        
        <Route exact ={true} path ='/Edit_Wishlist' render={() =>(
           <div className="App">
             <EditWishlist />
           </div>
        )}/>
        {
        /*
        <Route exact ={true} path ='/wishlist2' render={() =>(
           <div className="App">
             <Wishlist2 />
           </div>
        )}/>
        <Route exact ={true} path ='/wishlist3' render={() =>(
           <div className="App">
             <Wishlist3 />
           </div>
        )}/>
        */
        }
      </div>
      
      </BrowserRouter>
    );
        }
      }


export default App;
