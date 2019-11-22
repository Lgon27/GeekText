import React, { Component } from 'react';
//import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {Link} from 'react-router-dom'






class Wishlist1 extends Component{
 constructor(props){
   super(props);
   this.user = this.props.user;
   this.delete = this.delete.bind(this);
   this.update = this.update.bind(this);
   this.declare_update=this.declare_update.bind(this);
   this.state ={
    list: [],
    ids: [],
    update: [],
    url: this.props.match.params.id

  };
  
 }
 

componentDidMount() {
  let sendurl = 'http://localhost:9000/wishlist/' + this.state.url
    axios.get(sendurl)
    .then(response => {
      this.setState({ list: response.data});
    })
    .catch(function (error){
      console.log(error);
    })

    axios.get("http://localhost:9000/wishlist/loadlist/" + this.user)
    .then(response => {
      this.setState({ ids: response.data});
    })
    .catch(function (error){
      console.log(error);
    })
  }



  componentDidUpdate(){
    if(this.state.url != this.props.match.params.id){
      this.setState({url:this.props.match.params.id})
    }
    if(this.state.update != 0 )
    {
      
        axios.get("http://localhost:9000/wishlist/" + this.state.url)
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


  declare_update(){
    this.setState({url:this.props.match.params.id},this.forceUpdate());
    this.setState({update:1}, this.forceUpdate());
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
              <Link to ="/" class="nav-link">Home <span class="sr-only">(current)</span></Link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Wishlist</a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                {
                this.state.ids.map(lists =>{
                 let hre = "/Wishlist/"+lists._id;
                
                 return(
                   <Link to ={hre}  class="dropdown-item" onClick ={this.declare_update}>Wishlist {lists.list_name}</Link>
                 );



                })
                }
                <Link to= "/Edit_Wishlist"  class = "dropdown-item">Edit List</Link>
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