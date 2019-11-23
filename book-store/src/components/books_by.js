import React, { Component } from "react";
import "./book_style.css";
import rating from "./rating.png";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { object } from "prop-types";

export class books_by extends Component {
  constructor(props) {
    super(props);
    this.state = { books: [] };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    fetch("http://localhost:3000/get/books")
      .then(res => res.json())
      .then(books => {
        this.setState({ books }); // Notify your component that products have been fetched
      });
    console.log(this.state.books);
  }

  render() {
    const books = this.state.books;

    return (
      <div className="Book">
        <header className="Book-header">
          <a class="lightbox" href="#cover">
            <img src="https://images-na.ssl-images-amazon.com/images/I/81fWm4C8vJL.jpg"></img>
          </a>

          <div class="lightbox-target" id="cover">
            <img src="https://images-na.ssl-images-amazon.com/images/I/81fWm4C8vJL.jpg"></img>
            <a class="lightbox-close" href="#"></a>
          </div>

          <h3>
            <b>Gone With the Wind</b>
          </h3>
          <p>Margaret Mitchell</p>

          <Link to="/">
            <Button>
              <p>Back</p>
            </Button>
          </Link>
        </header>
      </div>
    );
  }
}

export default books_by;
