import React, { Component } from 'react';
//import logo from './logo.svg';
//import './App.css';
import axios from 'axios';
import {Link} from 'react-router-dom'
//import '../../node_modules/bootstrap/dist/css/bootstrap.css';


import StarRatingComponent from 'react-star-rating-component';
import {BookDetails} from './BookDetails.js';





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
    url: this.props.match.params.id,
    sortedBy: '', 
    bookDetailsShow: false 
    
  };
  
 }
 

componentDidMount() {
  let sendurl = 'http://localhost:3000/get/wish/' + this.state.url
    axios.get(sendurl)
    .then(response => {
      this.setState({ list: response.data});
    })
    .catch(function (error){
      console.log(error);
    })
    axios.get("http://localhost:3000/get/list/" + this.user)
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
      
        axios.get("http://localhost:3000/get/wish/" + this.state.url)
    .then(response => {
      this.setState({ list: response.data});
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
    axios.delete('http://localhost:3000/delete/wish/delete/'+id)
    .then(this.setState({update : 1}))
    .catch(err => console.log(err))
}

  update(id,book,description,location){
    const obj = {
      wishlist_book : book,
      wishlist_description : description,
      wishlist_list : location
    };
    axios.post('http://localhost:3000/post/wish/update/'+id,obj)
    .then(this.setState({update : 1}))
    .catch(err => console.log(err))



  }


  addToCart(book){
     
    fetch('http://localhost:3000/post/cart', {
        method: 'POST',
        headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
        email: 'sgarc349@fiu.edu',
        title: book.title,
        cover_image: book.cover_image,
        author: book.author,
        price: book.price,
        quantity:  1,
        })
    })
    .then( (response) => response.json())
    .then( (responseJson) => {
        alert("Book Added to Cart!")
    })
    .catch((error) => {
        console.error(error);
    });

}


  render(){
    let bookDetailsClose =() => this.setState({bookDetailsShow: false})
    const books = this.state.list;
  return (
    
      
      <div className="container-fluid">
      <div className="container">


<div className="box">

{books.map( book =>  (
    <div className="card" key={book._id}>
    <div className="card-image" title={book.title} onClick={() => this.setState({
                    bookTitle: book.title,
                    bookDetailsShow:true
                    })}>

            <img src={book.cover_image} alt={book.title}/>
            <p className = "bookPrice"><b>${book.price.toFixed(2)}</b></p>

        <span to="/" className="btn-floating halfway-fab waves-effect waves-light red"
             onClick={()=>{this.addToCart(book)}}
            ><i className="material-icons">add_shopping_cart</i>
        </span>
    </div>

    <div className="card-content">
        <p font-size = "14px"><b>{book.title}</b></p>
        <p><i>{book.author}</i></p>
        <StarRatingComponent
            name="rate2"
            editing={false}
            starCount={5}
            value={book.rating}
        />
    </div>
     
    <ul>
      {
             <div class = "row">
                    
                    <div class = "col"><button type="button" class="btn btn-primary" onClick={() => this.delete(book._id)} >Remove from Wishlist </button></div>
                    {
                      this.state.ids.map(lists =>{
                      return(
                        <div class= "col"><button type="button" class="btn btn-primary"  onClick={() => this.update(book._id,book.wishlist_book,book.wishlist_description,lists._id)}>Move to wishlist {lists.list_name}</button></div>

                      );
                      })
                    }

                </div>
                

        
        })}
    </ul>
    <BookDetails bookTitle={book.title}
            show = {this.state.bookDetailsShow}
            onHide = {bookDetailsClose}>
    </BookDetails>
    </div>
    
    ))}
</div>
</div>
      

      
    </div>  
  )
    }
}
    
export default Wishlist1;