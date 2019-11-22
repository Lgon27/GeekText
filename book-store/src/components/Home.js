import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';
import {BookDetails} from './BookDetails.js';
import {addToCart} from './actions/cartActions'
import {connect} from 'react-redux'


class Home extends Component{

    constructor(props){
        super(props)
<<<<<<< HEAD
        this.state = { books: [], sortedBy: '', items: [] }
=======
        this.state = { books: [], sortedBy: '', bookDetailsShow: false }
>>>>>>> 5df42faa230a2aaa0d36a37538bcd169c243a01e
        this.sortByPriceAsc = this.sortByPriceAsc.bind(this);
        this.sortByAuthorAsc = this.sortByAuthorAsc.bind(this);
        this.sortByDateAsc = this.sortByDateAsc.bind(this);
        this.sortByRatingAsc = this.sortByRatingAsc.bind(this);
    }

    handleClick = (id)=>{
        this.props.addToCart(id);
    }

    componentDidMount() {
        fetch('http://localhost:3000/get/books')
          .then(res => res.json())
          .then(books => {
            this.setState({ books}); // Notify your component that products have been fetched
          })
          console.log(this.state.books);
<<<<<<< HEAD
          
          fetch('http://localhost:3000/get/cartItems')
          .then(res => res.json())
          .then( items => {
            this.setState({ items }); // Notify your component that products have been fetched
          })
          console.log(this.state.items);  
=======

>>>>>>> 5df42faa230a2aaa0d36a37538bcd169c243a01e
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
            this.state.books.sort((a, b) => a.author.charAt(0).toUpperCase() - b.author.charAt(0).toUpperCase())
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

      sortByRatingAsc() {
        this.setState(prevState => {
            this.state.books.sort((a, b) => (a.rating - b.rating))
        });
        if (this.state.sortedBy === 'ratingDESC') {
            this.setState(prevState => {
                this.state.books.reverse()
                this.state.sortedBy = 'priceASC'
            });}
        else {
            this.setState(prevState => {
                this.state.sortedBy = 'ratingDESC'
            });}
        this.forceUpdate();
      }

    render(){
        let bookDetailsClose =() => this.setState({bookDetailsShow: false})
        const books = this.state.books;

        return(
            <div className="container">

                <div className='sortBy'>
                <span className= 'sort'>
                <label>SORT BY</label>   <button className= 'sortButton' onClick = {this.sortByAuthorAsc} > AUTHOR </button>
                <button className= 'sortButton' onClick = {this.sortByDateAsc} > PUBLISH DATE </button>
                <button className= 'sortButton' onClick = {this.sortByPriceAsc} > PRICE </button>
                <button className= 'sortButton' onClick = {this.sortByRatingAsc} > RATING </button>
                </span></div>
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
                             onClick={()=>{this.handleClick(book.id)}}
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
                    <BookDetails bookTitle={book.title}
                            show = {this.state.bookDetailsShow}
                            onHide = {bookDetailsClose}>
                    </BookDetails>
                    </div>
                    ))}
            </div>
            </div>

            );
        }

}

const mapStateToProps = (state)=>{
    return {
      items: state.books
    }
  }
const mapDispatchToProps = (dispatch)=>{

    return{
        addToCart: (id)=>{dispatch(addToCart(id))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)
