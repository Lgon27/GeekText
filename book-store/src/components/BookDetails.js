import React, {Component} from 'react';
import {Modal, Button, Row, Column, Form} from 'react-bootstrap';

export class BookDetails extends Component{
    constructor(props){
        super(props)
        this.state = {
            bookTitle: 'Gone With The Wind',
            bookAuthor: 'Margaret Michell'
        }
    }

    render(){

        const submitButtonStyle = {
          color: '#FFFFFF',
          background: '#ff5959',
          height: '50px',
        };

        return(
            <Modal {...this.props}
                bookTitle = {this.state.bookTitle}
                style={{width:'48% !important', top:'20%', zIndex: 999}}>

            <Modal.Body>
              <div style={{display:'float'}}>
                <h3 id = 'book-detail-title'>{this.state.bookTitle}</h3>
                <p id = 'book-detail-author'> by {this.state.bookAuthor} </p>
                <img style={{float:'left', paddingRight:'20px', paddingBottom:'20px', width:'35%'}} id='book-detail-cover' src='https://images-na.ssl-images-amazon.com/images/I/51D6ehbwihL._SX334_BO1,204,203,200_.jpg'></img>

                <p id= 'book-detail-summary'>
                    This is the tale of Scarlett O'Hara, the spoiled, ruthless daughter of a wealthy plantation owner,
                    who arrives at young womanhood just in time to see the Civil War sweep away the life for
                    which her upbringing had prepared her. After the fall of Atlanta she returns to the
                    plantation and by stubborn shrewdness saves her home from both Sherman and the carpetbaggers.
                    But in the process she hardens. She has neared starvation and she vows never to be hungry again.
                </p>

                <form style={{float:'left'}} action="/reviews" method="get">
                    <input type="hidden" name="bookTitle" value={this.state.bookTitle} />
                    <input style={submitButtonStyle} type="submit" value="Create Customer Review" />
                </form>
              </div>

            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.props.onHide}>Close</Button>
            </Modal.Footer>
          </Modal>
        )
    }

}
