import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import axios from 'axios';







class Wishlist1 extends Component{
 constructor(props){
   super(props);
   this.url = this.props.match.params.id;
   this.delete = this.delete.bind(this);
   this.update = this.update.bind(this);
   this.state ={
    list: [],
    ids: [],
    update: []
  };
  
 }




componentDidMount() {
  let sendurl = 'http://localhost:9000/wishlist/' + this.url
    axios.get(sendurl)
    .then(response => {
      this.setState({ list: response.data});
    })
    .catch(function (error){
      console.log(error);
    })

    axios.get("http://localhost:9000/wishlist/loadlist/test")
    .then(response => {
      this.setState({ ids: response.data});
    })
    .catch(function (error){
      console.log(error);
    })
 
  }



  componentDidUpdate(){
    if(this.state.update != 0)
    {
      
        axios.get("http://localhost:9000/wishlist/" + this.url)
    .then(response => {
      this.setState({ list: response.data});
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




  
  delete(id){
    axios.delete('http://localhost:9000/wishlist/delete/'+id)
    .then(this.setState({update : 1}))
    .catch(err => console.log(err))
}

  update(id,book,description,location){
    const obj = {
      wishlist_book : book,
      wishlist_description : description,
      wishlist_list : location
    };
    axios.post('http://localhost:9000/wishlist/update/'+id,obj)
    .then(this.setState({update : 1}))
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
                this.state.ids.map(lists =>{
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
        this.state.list.map(items => {
           return (
             <div class = "row">
             <div class= "col-sm-1"><image src="holder.js/171x180" rounded /></div>
             <div class="col-sm-1">{items.wishlist_book}</div>
              <div class = "col-sm-8">{items.wishlist_description}</div>
              <div class="col-sm-1">
               <div class="dropdown">
                  <button class="btn btn-primary dropdown-toggle" type="button" data-toggle="dropdown">Options <span class="caret"></span></button>
                  <ul class="dropdown-menu">
                    <div><a class="dropdown-item" onClick={() => this.delete(items._id)} >Remove from Wishlist </a></div>
                    {
                      this.state.ids.map(lists =>{
                      return(
                        <div><a class="dropdown-item" onClick={() => this.update(items._id,items.wishlist_book,items.wishlist_description,lists._id)}>Move to wishlist {lists.list_name}</a></div>

                      );
                      })
                    }

                  </ul>
                </div></div>
             </div>

           );
        })}
    </ul>
      
    </div>  
  )
    }
}
    
export default Wishlist1;