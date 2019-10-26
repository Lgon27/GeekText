import React, { Component } from 'react';
import {Button} from 'react-bootstrap';


class Home extends Component{

    constructor(props){
        super(props)
        this.state = {
        books: [] //initialize books as empty array
        }
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
    
    render(){
        const books = this.state.books;

        return(
            <div className="container">
                <h3 className="center">BOOKS</h3>
                <h2> sort by <button > author </button></h2>
                <div className="box">
            
                {books.map( book =>  ( 
                    <div className="card" key={book._id}>
                    <div className="card-image">
                            <Button id='book-button'>
                            <img src={book.cover_image} alt={book.title}/>
                            </Button>

                        <span to="/" className="btn-floating halfway-fab waves-effect waves-light red" 
                            //onClick={()=>{this.handleClick(book.id)}}
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