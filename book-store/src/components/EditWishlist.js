import React, { Component } from 'react'; 
//import logo from './logo.svg';
//import './App.css';
import axios from 'axios';
import {Link} from 'react-router-dom'


class EditWishlist extends Component{
    constructor(props){
      super(props);
      this.delete = this.delete.bind(this);
      this.changeHandler = this.changeHandler.bind(this);
      this.submitHandler = this.submitHandler.bind(this);
      this.renderEmpty=this.renderEmpty.bind(this);
      this.state ={
          lists : [],
          update: 0
          
      }
    }


componentDidMount() {
    axios.get("http://localhost:3000/get/list/" + this.props.user)
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
      
      axios.get("http://localhost:3000/get/list/" + this.props.user)
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
    let sendurl = 'http://localhost:3000/get/wish/' + name
    axios.get(sendurl)
    .then(response => {
      response.map(item =>
            axios.delete('http://localhost:3000/delete/wist/delete/'+id)
    .then(console.log('Deleted'))
    .catch(err => console.log(err))
        );
    })
    .catch(function (error){
      console.log(error);
    })

    axios.delete('http://localhost:3000/delete/list/delete/'+id)
    .then(this.setState({update: 1}))
    .catch(err => console.log(err))
   

}
changeHandler = event => {
    this.setState({name: event.target.value})
}

submitHandler(event) {
    event.preventDefault();
   
    let url = "http://localhost:3000/post/list/add/test/" + this.state.name;
    axios.post(url)
    .then(this.setState({update: 1}))
    .catch(err => console.log(err))
   

}


renderEmpty(){
  var i;
  for(i=this.state.lists.length ; i < 3; i++){
    return(
      <li className="collection-item">
      <div>
        <form onSubmit= {this.submitHandler}>
          
               <ul> <h8>Name new list: </h8></ul>
                <input 
                type='text'
                onChange={this.changeHandler} />
                <input type='submit'/>
      
        </form>
      
      </div>
      </li>

    )
  }
  return(
    <div></div>
  )
}

render(){

    return (
      <div className="container-fluid">

       <h5>Avalable Wishlist</h5>
       <ul className="collection">
      {
        this.state.lists.map((items,index) => {
           let hre = "/wishlist/"+items._id;
           return (
            <li className="collection-item">
          
            <div class = "row">
            <div class ="col"><h5> {index + 1} -></h5></div>
            <div class="col"><h5>{items.list_name}</h5></div>
            <div class="col">
            <button type="button" class="btn btn-primary" onClick={() => this.delete(items._id,items.list_name)}>Remove</button>
            </div>
            <div class="col"><Link to= {hre} class="btn btn-primary">Enter Wishlist</Link> </div>
            </div>
    
            </li>
           );
        })
      }
     
      <this.renderEmpty/>

      </ul>

    </div>
    )
}



}
export default EditWishlist;