import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {Link} from 'react-router-dom'





class Home extends Component{


    constructor(props){
      super(props);
      this.delete = this.delete.bind(this);
      this.user = this.props.user;
      this.submitHandler=this.submitHandler.bind(this);
      this.renderEdit=this.renderEdit.bind(this);
      this.state ={
          lists : [],
          name:"",
          update:0
      }
    }

    renderEdit(){
      if(this.props.user ===""){
        return(
          <a class="dropdown-item">Requires Log in</a>
        );
      }
      else{
        return(
           <Link to= "/Edit_Wishlist" class="dropdown-item">Edit List</Link>
        );

        }
    }
componentDidMount() {
    axios.get("http://localhost:9000/wishlist/loadlist/" + this.props.user )
    .then(response => {
      this.setState({ lists: response.data});
    })
    .catch(function (error){
      console.log(error);
    })

    



}

componentDidUpdate(){
  if(this.state.update != 0)
  {
    
      axios.get("http://localhost:9000/wishlist/loadlist/" + this.props.user)
  .then(response => {
    this.setState({ lists: response.data});
  })
  .catch(function (error){
    console.log(error);
  })
  if(this.state.update != 4){
  this.setState({update: this.state.update + 1});
  }
  else{
      this.setState({update: 0})
  }
  }
}


delete(id,name){
    let sendurl = 'http://localhost:9000/wishlist/' + name
    axios.get(sendurl)
    .then(response => {
      response.map(item =>
            axios.delete('http://localhost:9000/wishlist/delete/'+id)
    .then(console.log('Deleted'))
    .catch(err => console.log(err))
        );
    })
    .catch(function (error){
      console.log(error);
    })

    axios.delete('http://localhost:9000/wishlist/loadlist/delete/'+id)
    .then(console.log('Deleted'))
    .catch(err => console.log(err))

}

submitHandler(event) {
  event.preventDefault();
  this.props.user_update(this.state.name);
 this.setState({update:1},this.forceUpdate())


}

changeHandler = event => {
  this.setState({name: event.target.value})
}


render(){

    return (
      
        
        <div className="container-fluid">
        <nav class="navbar navbar sticky-top navbar-expand navbar-dark bg-dark">
        <a class="navbar-brand" href="#">BookStore</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
       </button>
       <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
               <li class="nav-item active">
                <Link to ="/" class="nav-link">Home <span class="sr-only">(current)</span></Link>
              </li>
        
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Wishlist</a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  {
                  this.state.lists.map(lists =>{
                   let hre = "/Wishlist/"+lists._id;
                  
                   return(
                     <Link to={hre} class="dropdown-item">Wishlist {lists.list_name}</Link>
                   );
  
  
                  })
                  }
                  
                  <this.renderEdit/>
  
                </div>
              </li>
            </ul>
      </div>
      </nav>
      <div>
        <form onSubmit= {this.submitHandler}>
          
               <ul> {this.props.user} {this.state.name}</ul>
                <input 
                type='text'
                onChange={this.changeHandler} />
                <input type='submit'/>
      
        </form>
      </div>

    </div>
    
     )
    }
    
    
    
    }
    export default Home;