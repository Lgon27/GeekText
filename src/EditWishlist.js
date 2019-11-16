import React, { Component } from 'react'; 
//import logo from './logo.svg';
import './App.css';
import axios from 'axios';


class EditWishlist extends Component{
    constructor(props){
      super(props);
      this.delete = this.delete.bind(this);
      this.changeHandler = this.changeHandler.bind(this);
      this.submitHandler = this.submitHandler.bind(this);
      this.state ={
          lists : [],
          name: '',
          update: 0,
          
      }
    }


componentDidMount() {
    axios.get("http://localhost:9000/wishlist/loadlist/test")
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
      
        axios.get("http://localhost:9000/wishlist/loadlist/test")
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
    .then(this.setState({update: 1}))
    .catch(err => console.log(err))
   

}
changeHandler = event => {
    this.setState({name: event.target.value})
}

submitHandler(event) {
    event.preventDefault();
   
    let url = "http://localhost:9000/wishlist/loadlist/add/test/" + this.state.name;
    axios.post(url)
    .then(this.setState({update: 1}))
    .catch(err => console.log(err))
   

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
              <a class="nav-link" href="/">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Shop</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Options</a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Wishlist</a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                {
                this.state.lists.map(lists =>{
                 let hre = "/Wishlist/"+lists._id;
                
                 return(
                   <a class="dropdown-item" href ={hre}>Wishlist {lists.list_name}</a>
                 );


                })
                }
                <a class = "dropdown-item" href = "/Edit_Wishlist">Edit List</a>

              </div>
            </li>
          </ul>
    </div>
    </nav>
    <ul>
      {
        this.state.lists.map(items => {
           return (

            <div class = "row">
            <div class="col">{items.list_name}</div>
            <div class="col">
            <button type="button" class="btn btn-primary" onClick={() => this.delete(items._id,items.list_name)}>Remove</button>
            </div>
            </div>

           );
        })
      }
      </ul>
      <div>
        <form onSubmit= {this.submitHandler}>
          
               <ul> New list: {this.state.name}</ul>
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
export default EditWishlist;