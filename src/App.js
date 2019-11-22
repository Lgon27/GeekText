import React, {Component} from 'react';
import Wishlist1 from './Wishlist1';
import EditWishlist from './EditWishlist';
import Home from './Home'
import {BrowserRouter, Route,Switch,Link,Redirect,useHistory,useLocation} from 'react-router-dom';
function Auth(){
  let history = useHistory();
}



class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      apiResponse:"",
      user: "test"
       };
    this.userUpdater = this.userUpdater.bind(this)
  

  }
  userUpdater(item) {
    this.setState({user: item},this.forceUpdate())
   }
 


  render(){
    return(
      <BrowserRouter>
        <div>
        <Switch>
          <Route exact path="/" render={(props) =>(
           <div className="App">
             <Home user_update={this.userUpdater.bind(this)} user = {this.state.user} {...props}/>>
             </div> 
          )}/> 
          <Route path='/wishlist/:id' render={(props) =>(
           <div className="App">
             <Wishlist1 user = {this.state.user} {...props} />
           </div>
        )}/>

        
        <Route exact ={true} path ='/Edit_Wishlist' render={(props) =>(
           <div className="App">
             <EditWishlist user = {this.state.user} {...props}/>
           </div>
        )}/>  
        
        </Switch>


        </div>
      </BrowserRouter>
    )
  }
  }
  
    
export default App;
