import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';
import { BookDetails } from './BookDetails.js';
import axios from 'axios';
import { Link } from "react-router-dom";
import "./book_style.css";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      books: [], 
      sortedBy: "" ,
      topSellingBooks: [],
      topSellers: false, 
      starBooks: [],
      filerByStars: false,
      onPageOne: true,
      onPageTwo: false,
      booksPageOne: [],
      booksPageTwo: [],
      list: [],
      genreFilter: false,
      genreBooks: []

    };


    this.sortByPriceAsc = this.sortByPriceAsc.bind(this);
    this.sortByAuthorAsc = this.sortByAuthorAsc.bind(this);
    this.sortByDateAsc = this.sortByDateAsc.bind(this);
    this.sortByRatingAsc = this.sortByRatingAsc.bind(this);
    this.filterByStars = this.filterByStars.bind(this);
    this.add = this.add.bind(this);
    this.changePage = this.changePage.bind(this);
    this.sortByTopSellers = this.sortByTopSellers.bind(this);
    this.filterByGenre = this.filterByGenre.bind(this);
  
    if (this.props.loginID != null) {
      console.log('Received: ' + this.props.loginID)
    }
  }

  componentDidMount() {
    fetch("http://localhost:3000/get/books")
      .then(res => res.json())
      .then(books => {
        this.setState({ books }); // Notify your component that products have been fetched
      });
    console.log(this.state.books); 
          axios.get("http://localhost:3000/get/list/test")
           .then(response => {
           this.setState({ list: response.data});
           })
          .catch(function (error){
          console.log(error);
    })
    
  }



 add(book,list)
      {
        fetch('http://localhost:3000/post/wish/add' , {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                wishlist_book:book._id,
                wishlist_list:list,
                title:book.title,
                cover_image:book.cover_image,
                summary:book.summary,
                genre:book.genre,
                author:book.author,
                price:book.price,
                publish_date:book.publish_date,
                author_bio:book.author_bio
            })
        })
        .then( (response) => response.json())
            .then( (responseJson) => {
                alert("Book Added to Wishlist!")
            })
            .catch((error) => {
                console.error(error);
            });
        
      
    }

  addToCart(book) {
    fetch("http://localhost:3000/post/cart", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email: "sgarc349@fiu.edu",
        title: book.title,
        cover_image: book.cover_image,
        author: book.author,
        price: book.price,
        quantity: 1,
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        alert("Book Added to Cart!")
      })
      .catch((error) => {
        console.error(error);
      });
  }

  sortByPriceAsc() {
    this.setState(prevState => {
      this.state.books.sort((a, b) => a.price - b.price);
    });
    if (this.state.sortedBy === "priceDESC") {
      this.setState(prevState => {
        this.state.books.reverse();
        this.state.sortedBy = "priceASC";
      });
    } else {
      this.setState(prevState => {
        this.state.sortedBy = "priceDESC";
      });
    }
    this.state.filterByStars = false;
    this.state.topSellers = false;
    this.state.genreFilter = false;
    this.forceUpdate();
  }

  sortByAuthorAsc() {
    this.setState(prevState => {
      this.state.books.sort(
        (a, b) =>
          a.author.charAt(0).toUpperCase() - b.author.charAt(0).toUpperCase()
      );
    });
    if (this.state.sortedBy === "authorASC") {
      this.setState(prevState => {
        this.state.books.reverse();
        this.state.sortedBy = "AuthorDESC";
      });
    } else {
      this.setState(prevState => {
        this.state.sortedBy = "authorASC";
      });
    }
    this.state.topSellers = false;
    this.state.filterByStars = false;

    this.state.genreFilter = false;
    this.forceUpdate();
  }

  sortByDateAsc() {
    this.setState(prevState => {
      this.state.books.sort((a, b) => a.publish_date - b.publish_date);
      this.state.topSellers = false;
      this.state.filterByStars = false;
      this.state.genreFilter = false;
    });
    if (this.state.sortedBy === "dateASC") {
      this.setState(prevState => {
        this.state.books.reverse();
        this.state.sortedBy = "dateDESC";
      });
    } else {
      this.setState(prevState => {
        this.state.sortedBy = "dateASC";
      });
    }
 
    this.forceUpdate();
  }

  sortByRatingAsc() {
    this.setState(prevState => {
      this.state.books.sort((a, b) => a.rating - b.rating);
    });
    if (this.state.sortedBy === "ratingDESC") {
      this.setState(prevState => {
        this.state.books.reverse();
        this.state.sortedBy = "priceASC";
      });
    } else {
      this.setState(prevState => {
        this.state.sortedBy = "ratingDESC";
        
      });
    }
    this.state.topSellers = false;
    this.state.filterByStars = false;
    this.state.genreFilter = false;
    this.forceUpdate();
  }
  sortByTopSellers() {
    this.setState(prevState => {
      this.state.books.sort((a, b) => a.copies_sold - b.copies_sold);
    });
    this.setState(prevState => {
        var books = [...this.state.books.reverse()];
        this.state.topSellingBooks = books.splice(0,3);
        this.state.topSellers = true;
        this.state.filterByStars = false;
        this.state.genreFilter = false;
        
    })
    this.forceUpdate();
  }
  filterByStars(starCount) {
    
    var n = starCount
    var position = 0
    var i =0
    var losbooks = []
   
    for (i=0; i<this.state.books.length; i++){
      if (Math.floor(this.state.books[i].rating) == n){
        losbooks[position] = this.state.books[i]
        position++
      }
    }
    this.setState(prevState => {
        this.state.starBooks = null
        this.state.starBooks = losbooks;
        this.state.filterByStars = true;
        this.state.topSellers = false;
        this.state.genreFilter = false;
    })
    this.forceUpdate();
  }
  filterByGenre(genre) {
    
    var n = genre.toUpperCase()
    var position = 0
    var i =0
    var losbooks = []

    for (i=0; i<this.state.books.length; i++){

      console.log(this.state.books[i].genre.toUpperCase())

      if (this.state.books[i].genre.toUpperCase() == n){
        losbooks[position] = this.state.books[i]
        position++
        console.log('DINGDINGDING')
      }
    }
    this.setState(prevState => {
        this.state.starBooks = null
        this.state.genreBooks = losbooks;
        this.state.filterByStars = false;
        this.state.topSellers = false;
        this.state.genreFilter = true;
    })
    this.forceUpdate();
  }
  changePage(page) {

   var page = page

    if (page == 1){ 

      this.setState(prevState => {      
          this.state.onPageOne = true
          this.state.onPageTwo = false
        }
        )
      }
      else { 

        this.setState(prevState => {      
            this.state.onPageOne = false
            this.state.onPageTwo = true
          }
        )
        }
  this.forceUpdate();
}
  

  render() {
    
    var books = this.state.books
    var booksPageOne = [...books.slice(0,6)]
    var booksPageTwo = [...books.slice(6,12)]
    var topSellers = this.state.topSellers;
    var filterByStars = this.state.filterByStars;
    var filterByGenre = this.state.genreFilter;
    var starBooks = this.state.starBooks;
    var genreBooks = this.state.genreBooks;

    const topSellingBooks = this.state.topSellingBooks;

 
  if (this.state.onPageOne  && !topSellers && !filterByStars && !filterByGenre){
    return (
      
      <div className="container">
        <div className="sortBy">
          <span className="sort">
            <label>SORT BY</label>{" "}
            <button className="sortButton" onClick={this.sortByAuthorAsc}>
              {" "}
              AUTHOR{" "}
            </button>
            <button className="sortButton" onClick={this.sortByDateAsc}>
              {" "}
              PUBLISH DATE{" "}
            </button>
            <button className="sortButton" onClick={this.sortByPriceAsc}>
              {" "}
              PRICE{" "}
            </button>
            <button className="sortButton" onClick={this.sortByTopSellers}>
              {" "}
              TOP SELLERS{" "}
              </button>
              <div className = "ratingSort">
              <button className="sortButton" onClick={this.sortByRatingAsc}>
              {" "}
              RATING{" "}
            </button>
            <button className="sortButton" onClick={() => this.filterByStars(1)}>
            <i className = 'material-icons'>star </i><i className = 'material-icons'>star_border  </i>
            <i className = 'material-icons'>star_border  </i><i className = 'material-icons'>star_border  </i>
            <i className = 'material-icons'>star_border  </i>
            </button>
            <button className="sortButton" onClick={() => this.filterByStars(2)}>
            <i className = 'material-icons'> star </i><i className = 'material-icons'> star </i><i className = 'material-icons'> star_border  </i><i className = 'material-icons'>star_border  </i><i className = 'material-icons'>star_border  </i>
            </button>
            <button className="sortButton" onClick={() => this.filterByStars(3)}>
            <i className = 'material-icons'> star </i><i className = 'material-icons'> star </i><i className = 'material-icons'> star </i><i className = 'material-icons'> star_border </i><i className = 'material-icons'> star_border </i>
            </button>
            <button className="sortButton" onClick={() => this.filterByStars(4)}>
              {" "}
              <i className = 'material-icons'> star </i>{" "}
              <i className = 'material-icons'> star </i><i className = 'material-icons'> star </i><i className = 'material-icons'> star </i>
              <i className = 'material-icons'> star_border </i>
            </button>
            <button className="sortButton" onClick={() => this.filterByStars(5)}>
            <i className = 'material-icons'> star </i><i className = 'material-icons'> star </i><i className = 'material-icons'> star </i><i className = 'material-icons'> star </i><i className = 'material-icons'> star </i>
            </button>
            </div>
            
          </span>
          <div className= 'GenreSort'>
            <button className="sortButton" onClick={() => this.filterByStars('fiction')}> Fiction </button>
            <button className="sortButton" onClick={() => this.filterByStars('teen drama')}> Teen Drama </button>
            <button className="sortButton" onClick={() => this.filterByStars('fantasy')}> Fantasy </button>
            <button className="sortButton" onClick={() => this.filterByStars('non-fiction')}> Fiction </button>
            <button className="sortButton" onClick={() => this.filterByStars('Suspense Thrillers')}> Suspense Thrillers </button>
              
            </div>
        </div>
      
        <div className="box">
          {booksPageOne.map(book => (
            <div className="card" key={book._id}>
              <div className="card-image">
                <img src={book.cover_image} alt={book.title} />
               
                <p className="bookPrice">
                  <b>${book.price.toFixed(2)}</b>
                </p>

                <div className="buttonDetails">
                  <Link
                    to={"/book_details?bookTitle="+book.title+"&userId="+this.props.loginID}
                    className="btn-floating waves-effect waves-light blue"
                  >
                    <i className="material-icons">view_headline</i>
                  </Link>
                  &emsp;
                  <span
                    to="/"
                    className="btn-floating waves-effect waves-light red"
                    onClick={() => this.addToCart(book)}
                  >
                    <i className="material-icons">add_shopping_cart</i>
                  </span>
                </div>
              </div>

              <div className="card-content">
                <p font-size="14px">
                  <b>{book.title}</b>
                </p>
                <p>
                  <i>{book.author}</i>
                </p>
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
             {
               this.state.list.map(lists =>{
               return(
                 <div class= "col">
                   <button type="button" className="btn-secondary"  onClick={() => this.add(book,lists._id)}> 
                   <i className = 'material-icons'>add</i> {lists.list_name}
                   </button>
                 </div>

               )
               })
             }

         </div>
                

        
        }
    </ul>
            </div>
          ))}
        </div>
        <button className="btn-floating waves-effect waves-light blue" onClick = {() => this.changePage(1)}> 1 </button>
        <button className="btn-floating waves-effect waves-light blue" onClick = {() => this.changePage(2)}> 2 </button>
      </div>
    
    );
  }
  if (this.state.onPageTwo && !topSellers && !filterByStars && !filterByGenre){
    return (
      
      <div className="container">
        <div className="sortBy">
          <span className="sort">
            <label>SORT BY</label>{" "}
            <button className="sortButton" onClick={this.sortByAuthorAsc}>
              {" "}
              AUTHOR{" "}
            </button>
            <button className="sortButton" onClick={this.sortByDateAsc}>
              {" "}
              PUBLISH DATE{" "}
            </button>
            <button className="sortButton" onClick={this.sortByPriceAsc}>
              {" "}
              PRICE{" "}
            </button>
            <button className="sortButton" onClick={this.sortByTopSellers}>
              {" "}
              TOP SELLERS{" "}
              </button>
              <div className = "ratingSort">
              <button className="sortButton" onClick={this.sortByRatingAsc}>
              {" "}
              RATING{" "}
            </button>
            <button className="sortButton" onClick={() => this.filterByStars(1)}>
            <i className = 'material-icons'>star </i><i className = 'material-icons'>star_border  </i>
            <i className = 'material-icons'>star_border  </i><i className = 'material-icons'>star_border  </i>
            <i className = 'material-icons'>star_border  </i>
            </button>
            <button className="sortButton" onClick={() => this.filterByStars(2)}>
            <i className = 'material-icons'> star </i><i className = 'material-icons'> star </i><i className = 'material-icons'> star_border  </i><i className = 'material-icons'>star_border  </i><i className = 'material-icons'>star_border  </i>
            </button>
            <button className="sortButton" onClick={() => this.filterByStars(3)}>
            <i className = 'material-icons'> star </i><i className = 'material-icons'> star </i><i className = 'material-icons'> star </i><i className = 'material-icons'> star_border </i><i className = 'material-icons'> star_border </i>
            </button>
            <button className="sortButton" onClick={() => this.filterByStars(4)}>
              {" "}
              <i className = 'material-icons'> star </i>{" "}
              <i className = 'material-icons'> star </i><i className = 'material-icons'> star </i><i className = 'material-icons'> star </i>
              <i className = 'material-icons'> star_border </i>
            </button>
            <button className="sortButton" onClick={() => this.filterByStars(5)}>
            <i className = 'material-icons'> star </i><i className = 'material-icons'> star </i><i className = 'material-icons'> star </i><i className = 'material-icons'> star </i><i className = 'material-icons'> star </i>
            </button>
            </div>
            
          </span>
          <div className= 'GenreSort'>
          <button className="sortButton" onClick={() => this.filterByGenre('fiction')}> Fiction </button>
            <button className="sortButton" onClick={() => this.filterByGenre('teen drama')}> Teen Drama </button>
            <button className="sortButton" onClick={() => this.filterByGenre('fantasy')}> Fantasy </button>
            <button className="sortButton" onClick={() => this.filterByGenre('non-fiction')}> Fiction </button>
            <button className="sortButton" onClick={() => this.filterByGenre('Suspense Thrillers')}> Suspense Thrillers </button>
              
              
            </div>
        </div>
      
        <div className="box">
          {booksPageTwo.map(book => (
            <div className="card" key={book._id}>
              <div className="card-image">
                <img src={book.cover_image} alt={book.title} />
             
                <p className="bookPrice">
                  <b>${book.price.toFixed(2)}</b>
                </p>

                <div className="buttonDetails">
                  <Link
                    to={"/book_details?bookTitle="+book.title+"&userId="+this.props.loginID}
                    className="btn-floating waves-effect waves-light blue"
                  >
                    <i className="material-icons">view_headline</i>
                  </Link>
                  &emsp;
                  <span
                    to="/"
                    className="btn-floating waves-effect waves-light red"
                    onClick={() => this.addToCart(book)}
                  >
                    <i className="material-icons">add_shopping_cart</i>
                  </span>
                </div>
              </div>

              <div className="card-content">
                <p font-size="14px">
                  <b>{book.title}</b>
                </p>
                <p>
                  <i>{book.author}</i>
                </p>
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
             {
               this.state.list.map(lists =>{
               return(
                 <div class= "col">
                   <button type="button" className="btn-secondary"  onClick={() => this.add(book,lists._id)}> 
                   <i className = 'material-icons'>add</i> {lists.list_name}
                   </button>
                 </div>

               )
               })
             }

         </div>
                

        
        }
    </ul>
            </div>
          ))}
        </div>
        <button className="btn-floating waves-effect waves-light blue" onClick = {() => this.changePage(1)}> 1 </button>
        <button className="btn-floating waves-effect waves-light blue" onClick = {() => this.changePage(2)}> 2 </button>
      </div>
    
    );
  }
  if (topSellers && !filterByStars && !filterByGenre){
    return (
      
      <div className="container">
        <div className="sortBy">
          <span className="sort">
            <label>SORT BY</label>{" "}
            <button className="sortButton" onClick={this.sortByAuthorAsc}>
              {" "}
              AUTHOR{" "}
            </button>
            <button className="sortButton" onClick={this.sortByDateAsc}>
              {" "}
              PUBLISH DATE{" "}
            </button>
            <button className="sortButton" onClick={this.sortByPriceAsc}>
              {" "}
              PRICE{" "}
            </button>

            <button className="sortButton" onClick={this.sortByTopSellers}>
              {" "}
              TOP SELLERS{" "}
              </button>
              <div className = "ratingSort">
              <button className="sortButton" onClick={this.sortByRatingAsc}>
              {" "}
              RATING{" "}
            </button>
            <button className="sortButton" onClick={() => this.filterByStars(1)}>
            <i className = 'material-icons'>star </i><i className = 'material-icons'>star_border  </i>
            <i className = 'material-icons'>star_border  </i><i className = 'material-icons'>star_border  </i>
            <i className = 'material-icons'>star_border  </i>
            </button>
            <button className="sortButton" onClick={() => this.filterByStars(2)}>
            <i className = 'material-icons'> star </i><i className = 'material-icons'> star </i><i className = 'material-icons'> star_border  </i><i className = 'material-icons'>star_border  </i><i className = 'material-icons'>star_border  </i>
            </button>
            <button className="sortButton" onClick={() => this.filterByStars(3)}>
            <i className = 'material-icons'> star </i><i className = 'material-icons'> star </i><i className = 'material-icons'> star </i><i className = 'material-icons'> star_border </i><i className = 'material-icons'> star_border </i>
            </button>
            <button className="sortButton" onClick={() => this.filterByStars(4)}>
              {" "}
              <i className = 'material-icons'> star </i>{" "}
              <i className = 'material-icons'> star </i><i className = 'material-icons'> star </i><i className = 'material-icons'> star </i>
              <i className = 'material-icons'> star_border </i>
            </button>
            <button className="sortButton" onClick={() => this.filterByStars(5)}>
            <i className = 'material-icons'> star </i><i className = 'material-icons'> star </i><i className = 'material-icons'> star </i><i className = 'material-icons'> star </i><i className = 'material-icons'> star </i>
            </button>
            </div>
            
          </span>
          <div className= 'GenreSort'>
          <button className="sortButton" onClick={() => this.filterByGenre('fiction')}> Fiction </button>
            <button className="sortButton" onClick={() => this.filterByGenre('teen drama')}> Teen Drama </button>
            <button className="sortButton" onClick={() => this.filterByGenre('fantasy')}> Fantasy </button>
            <button className="sortButton" onClick={() => this.filterByGenre('non-fiction')}> Fiction </button>
            <button className="sortButton" onClick={() => this.filterByGenre('Suspense Thrillers')}> Suspense Thrillers </button>
              
            </div>
        </div>
      
        <div className="box">
          {topSellingBooks.map(book => (
            <div className="card" key={book._id}>
              <div className="card-image">
                <img src={book.cover_image} alt={book.title} />
              
                <p className="bookPrice">
                  <b>${book.price.toFixed(2)}</b>
                </p>

                <div className="buttonDetails">
                  <Link
                    to={"/book_details?bookTitle="+book.title+"&userId="+this.props.loginID}
                    className="btn-floating waves-effect waves-light blue"
                  >
                    <i className="material-icons">view_headline</i>
                  </Link>
                  &emsp;
                  <span
                    to="/"
                    className="btn-floating waves-effect waves-light red"
                    onClick={() => this.addToCart(book)}
                  >
                    <i className="material-icons">add_shopping_cart</i>
                  </span>
                </div>
              </div>

              <div className="card-content">
                <p font-size="14px">
                  <b>{book.title}</b>
                </p>
                <p>
                  <i>{book.author}</i>
                </p>
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
            {
              this.state.list.map(lists =>{
              return(
                <div class= "col">
                  <button type="button" className="btn-secondary"  onClick={() => this.add(book,lists._id)}> 
                  <i className = 'material-icons'>add</i> {lists.list_name}
                  </button>
                </div>

              )
              })
            }

        </div>
                

        
        }
    </ul>
            </div>
          ))}
        </div>
      </div>
    
    );
  }
  if (filterByStars && !filterByGenre){
    return (
      
      <div className="container">
        <div className="sortBy">
          <span className="sort">
            <label>SORT BY</label>{" "}
            <button className="sortButton" onClick={this.sortByAuthorAsc}>
              {" "}
              AUTHOR{" "}
            </button>
            <button className="sortButton" onClick={this.sortByDateAsc}>
              {" "}
              PUBLISH DATE{" "}
            </button>
            <button className="sortButton" onClick={this.sortByPriceAsc}>
              {" "}
              PRICE{" "}
            </button>

            <button className="sortButton" onClick={this.sortByTopSellers}>
              {" "}
              TOP SELLERS{" "}
            </button>
            <div className = "ratingSort">
              <button className="sortButton" onClick={this.sortByRatingAsc}>
              {" "}
              RATING{" "}
            </button>
            <button className="sortButton" onClick={() => this.filterByStars(1)}>
            <i className = 'material-icons'>star </i><i className = 'material-icons'>star_border  </i>
            <i className = 'material-icons'>star_border  </i><i className = 'material-icons'>star_border  </i>
            <i className = 'material-icons'>star_border  </i>
            </button>
            <button className="sortButton" onClick={() => this.filterByStars(2)}>
            <i className = 'material-icons'> star </i><i className = 'material-icons'> star </i><i className = 'material-icons'> star_border  </i><i className = 'material-icons'>star_border  </i><i className = 'material-icons'>star_border  </i>
            </button>
            <button className="sortButton" onClick={() => this.filterByStars(3)}>
            <i className = 'material-icons'> star </i><i className = 'material-icons'> star </i><i className = 'material-icons'> star </i><i className = 'material-icons'> star_border </i><i className = 'material-icons'> star_border </i>
            </button>
            <button className="sortButton" onClick={() => this.filterByStars(4)}>
              {" "}
              <i className = 'material-icons'> star </i>{" "}
              <i className = 'material-icons'> star </i><i className = 'material-icons'> star </i><i className = 'material-icons'> star </i>
              <i className = 'material-icons'> star_border </i>
            </button>
            <button className="sortButton" onClick={() => this.filterByStars(5)}>
            <i className = 'material-icons'> star </i><i className = 'material-icons'> star </i><i className = 'material-icons'> star </i><i className = 'material-icons'> star </i><i className = 'material-icons'> star </i>
            </button>
            </div>
            <div className= 'GenreSort'>
            <button className="sortButton" onClick={() => this.filterByGenre('fiction')}> Fiction </button>
            <button className="sortButton" onClick={() => this.filterByGenre('teen drama')}> Teen Drama </button>
            <button className="sortButton" onClick={() => this.filterByGenre('fantasy')}> Fantasy </button>
            <button className="sortButton" onClick={() => this.filterByGenre('non-fiction')}> Fiction </button>
            <button className="sortButton" onClick={() => this.filterByGenre('Suspense Thrillers')}> Suspense Thrillers </button>
              
              
            </div>
          </span>
        </div>
      
        <div className="box">
          {starBooks.map(book => (
            <div className="card" key={book._id}>
              <div className="card-image">
                <img src={book.cover_image} alt={book.title} />
           
                <p className="bookPrice">
                  <b>${book.price.toFixed(2)}</b>
                </p>

                <div className="buttonDetails">
                  <Link
                    to={"/book_details?bookTitle="+book.title+"&userId="+this.props.loginID}
                    className="btn-floating waves-effect waves-light blue"
                  >
                    <i className="material-icons">view_headline</i>
                  </Link>
                  &emsp;
                  <span
                    to="/"
                    className="btn-floating waves-effect waves-light red"
                    onClick={() => this.addToCart(book)}
                  >
                    <i className="material-icons">add_shopping_cart</i>
                  </span>
                </div>
              </div>

              <div className="card-content">
                <p font-size="14px">
                  <b>{book.title}</b>
                </p>
                <p>
                  <i>{book.author}</i>
                </p>
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
             {
               this.state.list.map(lists =>{
               return(
                 <div class= "col">
                   <button type="button" className="btn-secondary"  onClick={() => this.add(book,lists._id)}> 
                   <i className = 'material-icons'>add</i> {lists.list_name}
                   </button>
                 </div>

               )
               })
             }

         </div>
                

        
        }
    </ul>
            </div>
          ))}
        </div>
      </div>
    
    );
  }
  if (filterByGenre){
    return (
      
      <div className="container">
        <div className="sortBy">
          <span className="sort">
            <label>SORT BY</label>{" "}
            <button className="sortButton" onClick={this.sortByAuthorAsc}>
              {" "}
              AUTHOR{" "}
            </button>
            <button className="sortButton" onClick={this.sortByDateAsc}>
              {" "}
              PUBLISH DATE{" "}
            </button>
            <button className="sortButton" onClick={this.sortByPriceAsc}>
              {" "}
              PRICE{" "}
            </button>

            <button className="sortButton" onClick={this.sortByTopSellers}>
              {" "}
              TOP SELLERS{" "}
            </button>
            <div className = "ratingSort">
              <button className="sortButton" onClick={this.sortByRatingAsc}>
              {" "}
              RATING{" "}
            </button>
            <button className="sortButton" onClick={() => this.filterByStars(1)}>
            <i className = 'material-icons'>star </i><i className = 'material-icons'>star_border  </i>
            <i className = 'material-icons'>star_border  </i><i className = 'material-icons'>star_border  </i>
            <i className = 'material-icons'>star_border  </i>
            </button>
            <button className="sortButton" onClick={() => this.filterByStars(2)}>
            <i className = 'material-icons'> star </i><i className = 'material-icons'> star </i><i className = 'material-icons'> star_border  </i><i className = 'material-icons'>star_border  </i><i className = 'material-icons'>star_border  </i>
            </button>
            <button className="sortButton" onClick={() => this.filterByStars(3)}>
            <i className = 'material-icons'> star </i><i className = 'material-icons'> star </i><i className = 'material-icons'> star </i><i className = 'material-icons'> star_border </i><i className = 'material-icons'> star_border </i>
            </button>
            <button className="sortButton" onClick={() => this.filterByStars(4)}>
              {" "}
              <i className = 'material-icons'> star </i>{" "}
              <i className = 'material-icons'> star </i><i className = 'material-icons'> star </i><i className = 'material-icons'> star </i>
              <i className = 'material-icons'> star_border </i>
            </button>
            <button className="sortButton" onClick={() => this.filterByStars(5)}>
            <i className = 'material-icons'> star </i><i className = 'material-icons'> star </i><i className = 'material-icons'> star </i><i className = 'material-icons'> star </i><i className = 'material-icons'> star </i>
            </button>
            </div>
            <div className= 'GenreSort'>
            <button className="sortButton" onClick={() => this.filterByGenre('fiction')}> Fiction </button>
            <button className="sortButton" onClick={() => this.filterByGenre('teen fiction')}> Teen Drama </button>
            <button className="sortButton" onClick={() => this.filterByGenre('fantasy')}> Fantasy </button>
            <button className="sortButton" onClick={() => this.filterByGenre('non-fiction')}> Non-Fiction </button>
            <button className="sortButton" onClick={() => this.filterByGenre('Suspense Thrillers')}> Suspense Thrillers </button>
              
            </div>
          </span>
        </div>
      
        <div className="box">
          {genreBooks.map(book => (
            <div className="card" key={book._id}>
              <div className="card-image">
                <img src={book.cover_image} alt={book.title} />
               
                <p className="bookPrice">
                  <b>${book.price.toFixed(2)}</b>
                </p>

                <div className="buttonDetails">
                  <Link
                    to={"/book_details?bookTitle="+book.title+"&userId="+this.props.loginID}
                    className="btn-floating waves-effect waves-light blue"
                  >
                    <i className="material-icons">view_headline</i>
                  </Link>
                  &emsp;
                  <span
                    to="/"
                    className="btn-floating waves-effect waves-light red"
                    onClick={() => this.addToCart(book)}
                  >
                    <i className="material-icons">add_shopping_cart</i>
                  </span>
                </div>
              </div>

              <div className="card-content">
                <p font-size="14px">
                  <b>{book.title}</b>
                </p>
                <p>
                  <i>{book.author}</i>
                </p>
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
             {
               this.state.list.map(lists =>{
               return(
                 <div class= "col">
                   <button type="button" className="btn-secondary"  onClick={() => this.add(book,lists._id)}> 
                   <i className = 'material-icons'>add</i> {lists.list_name}
                   </button>
                 </div>

               )
               })
             }

         </div>
                

        
        }
    </ul>
            </div>
          ))}
        </div>
      </div>
    
    );
  }





}}





export default Home;
