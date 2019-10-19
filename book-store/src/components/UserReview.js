import React, { Component } from 'react';
import Axios from 'axios';
// import TextField from '@material-ui/core/TextField'
import StarRatings from 'react-star-ratings';

import { throwStatement } from '@babel/types';

class UserReview extends Component {

  constructor(props) {
    super(props);
    this.state = {
      rating: 0,
      avgRating: 0,
      review: "",
      user_id: "",
      bookTitle: "",
      renderedResponse: []
    };
    this.handleInputChange = this.handleInputChange.bind(this);

    this.changeRating = this.changeRating.bind(this);
  }

  handleSubmit = event => {
    event.preventDefault();

    const userReview = {
      rating: this.state.rating,
      review: this.state.review,
      user_id: this.state.user_id,
      bookTitle: this.state.bookTitle
    };

    Axios.post('http://localhost:3000/post/reviews/', userReview)
      .then(res => {
        console.log(res);
        console.log(res.data);
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

  getResponse = async() => {
    const response = await fetch('/api/reviews');
    const body = await response.json();
    if ( response.status !== 200) throw Error(body.message);

    return body;
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
    var avgRating = 0;
    var counter = 0;

    return (
      <div align='center'>
      <h1>Geektext Reviews</h1>
      <img src="https://img.thriftbooks.com/api/images/l/f2800c22a6be10fe4328a1905df9ee4660f0ada2.jpg"/>
      <h2>Gone With The Wind</h2>

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

      <h3>Reader Review Input:</h3>

      <div>
      <form onSubmit={this.handleSubmit}>

          <label>Username: </label>
          <input name="user_id" type="text" value={this.state.user_id} onChange={this.handleInputChange} /><br/>
          <label>Book Title: </label>
          <input name="bookTitle" type="text" value={this.state.bookTitle} onChange={this.handleInputChange} /><br/>
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
          <input type="submit" value="Submit"/>
      </form>
      </div>


         {renderedResponse.map(function(object) {
           return (
             <div>
                <hr/>

                <p><i>"{object.review}"</i></p>
                <p><b>Review From: {object.user_id}</b></p>
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
