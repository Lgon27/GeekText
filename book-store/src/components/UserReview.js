import React, { Component } from 'react';
import Axios from 'axios';
// import TextField from '@material-ui/core/TextField'
import StarRatings from 'react-star-ratings';

import { throwStatement } from '@babel/types';
import queryString from 'query-string';

import Book1 from '../images/Book1.jpg'
import Book2 from '../images/Book2.jpg'
import Book3 from '../images/Book3.jpg'
import Book4 from '../images/Book4.jpg'
import Book5 from '../images/Book5.jpg'
import Book6 from '../images/Book6.jpg'

// TODO: Retrieve User ID and User Display Name

class UserReview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      avgRating: 0,
      review: "",
      user_id: "",
      bookTitle: "",
      renderedResponse: [],
    };
    this.purchaseData = false;
    this.handleInputChange = this.handleInputChange.bind(this);

    this.changeRating = this.changeRating.bind(this);
  }

  handleSubmit = event => {
    event.preventDefault();

    let params = queryString.parse(this.props.location.search)
    const bookDisplayName = params.bookTitle

    const userReview = {
      rating: this.state.rating,
      review: this.state.review,
      user_id: this.state.user_id,
      bookTitle: bookDisplayName
    };

    Axios.post('http://localhost:3000/post/reviews/', userReview)
      .then(res => {
        this.getResponse().then(res => {
          const someData = res;
          this.setState({renderedResponse: someData});
        })
      })
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

// Populate Reviews
  getResponse = async() => {
    let params = queryString.parse(this.props.location.search)
    const bookDisplayName = params.bookTitle

    const response = await fetch('/get/reviews?bookTitle='+bookDisplayName);

    const body = await response.json();

    if ( response.status !== 200) throw Error(body.message);

    return body;
  }

  getPurchaseReponse = async() => {
    let params = queryString.parse(this.props.location.search)
    const bookDisplayName = params.bookTitle

    const userPurchasedBook = await fetch('/get/purchasedbooks?bookTitle='+bookDisplayName+'&'+'user_id=thoan006');
    const purchaseResponse = await userPurchasedBook.json();

    if ( userPurchasedBook.status !== 200) throw Error(purchaseResponse.message);

    return purchaseResponse;
  }

  componentDidMount() {
    this.getResponse().then(res => {
      const someData = res;
      this.setState({renderedResponse: someData});
    })
  }

  changeRating( newRating, name ) {
    this.setState({
      rating: newRating
    });
  }

  render() {
    const { renderedResponse } = this.state;

    this.getPurchaseReponse().then(res => {
      const data = res;
      this.purchaseData = data.purchased;
    })

    const displayForm = this.purchaseData;

    var avgRating = 0;
    var counter = 0;

    const formStyle = {
      width:'50%',
    };

    const submitButtonStyle = {
      width:'100%',
      color: '#FFFFFF',
      background: '#ff5959',
      height: '50px',
    };

    const textGreyStyle = { color: '#9c9c9c' };

    let params = queryString.parse(this.props.location.search)
    const bookDisplayName = params.bookTitle

    // Create some map of book names and images.
    var imageMap = new Object();
    imageMap["Gone With The Wind"] = Book1;
    imageMap["The Alchemist"] = Book2;
    imageMap["To Kill A Mockingbird"] = Book3;
    imageMap["Looking For Alaska"] = Book4;
    imageMap["The Da Vinci Code"] = Book5;
    imageMap["Peter Pan"] = Book6;

    return (
      <div align='center'>
      <h2>Geektext Reviews</h2>
      <img src={imageMap[bookDisplayName]}/>
      <h2>{bookDisplayName}</h2>

      {renderedResponse.map(function(object) {
        avgRating += parseFloat(object.rating);
        counter++;

        this.state.avgRating = parseFloat(avgRating/counter)
      }, this)}

      <b>Average Rating: </b>
      <StarRatings
        rating={this.state.avgRating}
        starRatedColor="orange"
        numberOfStars={5}
        name='avgRating'
        starDimension='30px'
      />

    { displayForm ?
      <div>
      <hr style={{color:'#ff5959',
                  backgroundColor:'#ff5959',
                  height: '5px',
                  border: 0 }}/>
      <h5>Add Your Review!</h5>
      <br/>

      <div style={formStyle}>
        <form onSubmit={this.handleSubmit}>

            <label>Username for Post: </label>
            <select style={{ display: 'block' }} name="user_id" value={this.state.user_id} onChange={this.handleInputChange}>
              <option value="">-- Select Display Name</option>
              <option value="thoan006">User ID: thoan006</option>
              <option value="Trinh Hoang">User Name: Trinh Hoang</option>
              <option value="Anonymous">Anonymous Post</option>
            </select>
            <br/>
            <StarRatings
              rating={this.state.rating}
              starRatedColor="red"
              changeRating={this.changeRating}
              numberOfStars={5}
              name='rating'
              starDimension='30px'
            />
            <br/>
            <label>Book Review: </label>
            <textarea name="review" value={this.state.review} onChange={this.handleInputChange} />
            <br/>
            <input style={submitButtonStyle} type="submit" value="Submit"/>
        </form>
      </div>
      <br/>
      </div>
      :
      <div>
        <h5 style={textGreyStyle}><i>Purchase the book to leave a review!</i></h5>
        <br/>
      </div>
    }

         {renderedResponse.map(function(object) {
           return (
             <div>
                <hr/>

                <p><i>"{object.review}"</i></p>
                <p style={textGreyStyle}><b>Review From: {object.user_id}</b></p>
                <StarRatings
                  rating={parseFloat(object.rating)}
                  starRatedColor="red"
                  numberOfStars={5}
                  name='rating'
                  starDimension='25px'
                />
                <br/>

            </div>
          );
         })}
      </div>
    )
  }
}
export default UserReview;
