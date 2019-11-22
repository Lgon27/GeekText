import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios';

class SaveLater extends Component{
    constructor(props){
        super(props);
        this.state = { saveLater: [] };
    }

    componentDidMount() {

          fetch('http://localhost:3000/get/save_for_later')
          .then(res => res.json())
          .then(saveLater => {
            this.setState({ saveLater }); // Notify your component that products have been fetched
          })
          console.log(this.state.saveLater);
          
    }

    deleteSave(id) {
        axios.get('http://localhost:3000/saveitems/delete/'+ id)
            .then(console.log('Deleted'))
            .catch(err => console.log(err))
        window.location.reload()
    }

    addBack(saveLater){
        fetch('http://localhost:3000/post/cart', {
            method: 'POST',
            headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            email: 'sgarc349@fiu.edu',
            title: saveLater.title,
            cover_image: saveLater.cover_image,
            author: saveLater.author,
            price: saveLater.price,
            quantity:  1,
            })
        })
    }

    render() {

        const saveLaters = this.state.saveLater;

        return (
        <div className="container">
        <div className="cart">
            <h5>Save for Later:</h5>
            <ul className="collection">
                {saveLaters.map( saveLater =>  ( 

                    <li className="collection-item avatar" key={saveLater._id}>
                        <div className="item-img"> 
                            <img src={saveLater.cover_image} alt={saveLater.cover_image} className=""/>
                        </div>

                        <div className="item-desc">
                            <span className="title">{saveLater.title}</span>
                            <p>{saveLater.author}</p>
                            <p><b>Price: ${saveLater.price}</b></p> 
                            <br></br>
                            <button className="waves-effect waves-light btn red remove" onClick={()=>{this.addBack(saveLater);this.deleteSave(saveLater._id)}}>Add to Cart</button>

                        </div>  

                        <div className="delete">
                            <button className="waves-effect waves-light btn darkcyan delete" onClick={()=>{this.deleteSave(saveLater._id);}}>Delete</button>
                        </div>
                    </li>  

                ))}
            </ul>
        </div> 
        <br></br>
        <br></br>
        <br></br>
    </div>

        )
    }




}



export default SaveLater