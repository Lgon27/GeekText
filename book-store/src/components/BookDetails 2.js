import React, {Component} from 'react';
import {Modal, Button, Row, Column, Form} from 'react-bootstrap';

export class BookDetails extends Component{
    constructor(props){
        super(props)
        this.state = {
            bookTitle: 'Gone With the Wind',
            bookAuthor: 'Margaret Michell'
        }
    }

    render(){
        return(
            <Modal {...this.props}
                bookTitle = {this.state.bookTitle}>

            <Modal.Body>
              <div>
                <h3 id = 'book-detail-title'>{this.state.bookTitle}</h3>
                <p id = 'book-detail-author'> by {this.state.bookAuthor} </p>
                <p id= 'book-detail-summary'>
                    This is the tale of Scarlett O'Hara, the spoiled, ruthless daughter of a wealthy plantation owner, 
                    who arrives at young womanhood just in time to see the Civil War sweep away the life for 
                    which her upbringing had prepared her. After the fall of Atlanta she returns to the 
                    plantation and by stubborn shrewdness saves her home from both Sherman and the carpetbaggers. 
                    But in the process she hardens. She has neared starvation and she vows never to be hungry again.
                </p>
                <img id='book-detail-cover' src='https://images-na.ssl-images-amazon.com/images/I/51D6ehbwihL._SX334_BO1,204,203,200_.jpg'></img>                  
              </div>

            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        )
    }

}
