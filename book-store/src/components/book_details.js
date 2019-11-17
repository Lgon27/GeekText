import React, { Component } from "react";
import "./book_style.css";
import book from "./book.png";
import rating from "./rating.png";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

export class book_details extends Component {
  render() {
    return (
      <div className="Book">
        <header className="Book-header">
          <h1>Romeo and Juliet</h1>

          <a class="lightbox" href="#cover">
            <img src={book} />
          </a>
          <div class="lightbox-target" id="cover">
            <img src={book} />
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
                <td>William Shakespeare</td>
              </tr>
              <tr>
                <th scope="row">Biography</th>
                <td>He was an English poet, playwright, and actor.</td>
              </tr>
              <tr>
                <th scope="row">Description</th>
                <td>
                  <p>
                    Two young star-crossed lovers whose deaths ultimately
                    reconcile their feuding families.
                  </p>
                </td>
              </tr>
              <tr>
                <th scope="row">Genre</th>
                <td>Shakespearean tragedy</td>
              </tr>
              <tr>
                <th scope="row">Publisher</th>
                <td>Simon & Schuster</td>
              </tr>
              <tr>
                <th scope="row">Release date</th>
                <td>Between 1595 - 1597</td>
              </tr>
              <tr>
                <th scope="row">Book rating</th>
                <td>
                  <img src={rating} className="Rating" alt="rating" />
                </td>
              </tr>
              <tr>
                <th scope="row">Comments</th>
                <td>Excellent book. It is both scholarly and entertaining.</td>
              </tr>
              <tr>
                <th scope="row">Other books by Shakespeare</th>
                <td>
                  <a
                    className="Book-link"
                    href="http://shakespeare.mit.edu/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    List of books
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
