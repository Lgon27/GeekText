import React, { Component } from "react";
import "./book_style.css";
import rating from "./rating.png";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { object } from "prop-types";

export class book_details extends Component {
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
          <h1>Gone With the Wind</h1>

          <a class="lightbox" href="#cover">
            <img src="https://images-na.ssl-images-amazon.com/images/I/81fWm4C8vJL.jpg"></img>
          </a>

          <div class="lightbox-target" id="cover">
            <img src="https://images-na.ssl-images-amazon.com/images/I/81fWm4C8vJL.jpg"></img>
            <a class="lightbox-close" href="#"></a>
          </div>

          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col">Feature</th>
                <th scope="col">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Author</th>
                <td>Margaret Mitchell</td>
              </tr>
              <tr>
                <th scope="row">Biography</th>
                <td>
                  He was an English poet, playwright, and actor.Margaret
                  Munnerlyn Mitchell (November 8, 1900 – August 16, 1949) was an
                  American novelist, and journalist. Mitchell wrote only one
                  novel, published during her lifetime, the American Civil
                  War-era novel Gone with the Wind, for which she won the
                  National Book Award for Most Distinguished Novel of 1936 and
                  the Pulitzer Prize for Fiction in 1937.
                </td>
              </tr>
              <tr>
                <th scope="row">Description</th>
                <td>
                  <p>
                    The story is set in Clayton County and Atlanta, both in
                    Georgia, during the American Civil War and Reconstruction
                    Era. It depicts the struggles of young Scarlett O'Hara, the
                    spoiled daughter of a well-to-do plantation owner, who must
                    use every means at her disposal to claw her way out of
                    poverty following Sherman's destructive "March to the Sea".
                  </p>
                </td>
              </tr>
              <tr>
                <th scope="row">Genre</th>
                <td>Historical Fiction</td>
              </tr>
              <tr>
                <th scope="row">Publisher</th>
                <td>Macmillan Publishers</td>
              </tr>
              <tr>
                <th scope="row">Release date</th>
                <td>June 30, 1936</td>
              </tr>
              <tr>
                <th scope="row">Book rating</th>
                <td>
                  <img src={rating} className="Rating" alt="rating" />
                </td>
              </tr>
              <tr>
                <th scope="row">Comments</th>
                <td>
                  Excellent book. It is both scholarly and entertaining, by
                  Anonimous. <a href="/reviews">more...</a>
                </td>
              </tr>
              <tr>
                <th scope="row">Books by</th>
                <td>
                  <a
                    className="Book-link"
                    href="/books_by"
                    rel="noopener noreferrer"
                  >
                    Margaret Mitchell
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
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

export default book_details;
