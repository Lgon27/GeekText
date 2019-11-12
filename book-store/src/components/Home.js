import React, { Component } from 'react';
import {Button} from 'react-bootstrap';


class Home extends Component{

    constructor(props){
        super(props)
        this.state = { books: [], sortedBy: '' }
        this.sortByPriceAsc = this.sortByPriceAsc.bind(this);
        this.sortByAuthorAsc = this.sortByAuthorAsc.bind(this);
        this.sortByDateAsc = this.sortByDateAsc.bind(this);
    }

    componentDidMount() {
        fetch('http://localhost:3000/get/books')
          .then(res => res.json())
          .then(books => {
            console.log(books);
            this.setState({ books}); // Notify your component that products have been fetched
          })
          console.log(this.state.books);
          
      }

      addToCart(book){
        console.log('adding to cart')
        fetch('http://localhost:3000/post/cart', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: book.id,
              author: book.author,
              qty: 1
            })
          })
      }

      sortByPriceAsc() {
        this.setState(prevState => {
            this.state.books.sort((a, b) => (a.price - b.price))
        }); 
        if (this.state.sortedBy === 'priceDESC') {
            this.setState(prevState => {
                this.state.books.reverse()
                this.state.sortedBy = 'priceASC'
            });}
        else {                
            this.setState(prevState => {
                this.state.sortedBy = 'priceDESC'
            });}
        this.forceUpdate();
      }

      sortByAuthorAsc() {
        this.setState(prevState => {
            this.state.books.sort((a, b) => a.author.charAt(0) - b.author.charAt(0)) 
            });
        if (this.state.sortedBy === 'authorASC') {
            this.setState(prevState => {
                this.state.books.reverse()
                this.state.sortedBy = 'AuthorDESC'
            });}
        else {
            this.setState(prevState => {
                this.state.sortedBy = 'authorASC'
            });
        }
      this.forceUpdate();
      }

      sortByDateAsc() {
        this.setState(prevState => {
            this.state.books.sort((a, b) => a.publish_date - b.publish_date)
            }); 
        if (this.state.sortedBy === 'dateASC') {
            this.setState(prevState => {
                this.state.books.reverse()
                this.state.sortedBy = 'dateDESC'
            }); }
        else {
            this.setState(prevState => {
                this.state.sortedBy = 'dateASC'
                });
        }
        this.forceUpdate();
      }
    
    render(){
        const books = this.state.books;


        return(
            <div className="container">
                <h3 className="center">BOOKS</h3>
                <div id='sortBy'>
                <h2> sort by</h2> <button onClick = {this.sortByAuthorAsc} > Author </button>
                <button onClick = {this.sortByDateAsc} > Date </button>
                <button onClick = {this.sortByPriceAsc} > Price </button>
                </div>
                <div className="box">
            
                {books.map( book =>  ( 
                    <div className="card" key={book._id}>
                    <div className="card-image">
                            <Button id='book-button'>
                            <img src={book.cover_image} alt={book.title}/>
                            </Button>

                        <span to="/" className="btn-floating halfway-fab waves-effect waves-light red" 
                            onClick={this.addToCart(book)}
                            ><i className="material-icons">add</i>
                        </span>
                    </div>

                    <div className="card-content">
                        <p>{book.author}</p>
                        <p><b>Price: ${book.price}</b></p>
                    </div>
                    </div>
                    ))}
            </div>
            </div>
               
            );  
        }  
    }
    
export default Home;