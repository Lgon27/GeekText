import React, { Component } from 'react';
import { connect } from 'react-redux'
import {Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import axios from 'axios';
import SaveLater from './SaveLater'


class Cart extends Component{
    constructor(props){
        super(props);
        this.delete = this.delete.bind(this);
        this.state = { 
            cartItems: [], 
            quantity: this.props.quantity, 
            isChecked: false, 
            total: 0 
        };
        this.handleChecked = this.handleChecked.bind(this);
    }


    componentDidMount() {
        fetch('http://localhost:3000/get/cartItems')
          .then(res => res.json())
          .then(cartItems => {
            this.setState({ cartItems }); // Notify your component that products have been fetched
          })
          console.log(this.state.cartItems);
          
    }

    delete(id) {
        axios.get('http://localhost:3000/cartitems/delete/'+ id)
            .then(console.log('Deleted'))
            .catch(err => console.log(err))
        window.location.reload()
    }

    addToSave(cartItem){
        fetch('http://localhost:3000/post/save_for_later', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            email: 'sgarc349@fiu.edu',
            title: cartItem.title,
            cover_image: cartItem.cover_image,
            author: cartItem.author,
            price: cartItem.price,
            quantity: 1,
            })
          })
    }
    
    increaseQ(id, cartItem) {
       // const new_items = this.state.cartItems.find(cartItem =>  {
        //    return cartItem._id === id;
        //});
       
            axios.post('http://localhost:3000/cartitems/update/'+ id, {
                email : cartItem.email,
                title : cartItem.title,
                cover_image : cartItem.cover_image,
                author : cartItem.author,
                price : cartItem.price,
                quantity: cartItem.quantity,
            }).then(response => {
                console.log('quantity update')
            }).catch(function (error) {
                console.log(error)
            })
            window.location.reload()
        
    }

    decreaseQ(id, cartItem) {
        // const new_items = this.state.cartItems.find(cartItem =>  {
        //     return cartItem._id === id;
        //  }); 
        //  new_items.quantity -= 1
        //  if (new_items.quantity === 0){
        //     new_items.quantity = 1;
        // } 

            axios.post('http://localhost:3000/cartitems/update/dec/'+ id, {
                email : cartItem.email,
                title : cartItem.title,
                cover_image : cartItem.cover_image,
                author : cartItem.author,
                price : cartItem.price,
                quantity: cartItem.quantity,
            }).then(response => {
                console.log('quantity update')
            }).catch(function (error) {
                console.log(error)
            })
            window.location.reload()
    }
    

    handleChecked () {
        this.setState({isChecked: !this.state.isChecked});
     }


    render() {

        const cartItems = this.state.cartItems;
        this.state.cartItems.map(cartItem => (this.state.total = this.state.total + (cartItem.price * cartItem.quantity)));
    
        return(

            <div className="container">
                    <div className="cart">
                        <h5>Books in Cart:</h5>
                        <ul className="collection">
                            {cartItems.map( cartItem =>  ( 

                                <li className="collection-item avatar" key={cartItem._id}>
                                    <div className="item-img"> 
                                        <img src={cartItem.cover_image} alt={cartItem.cover_image} className=""/>
                                    </div>

                                    <div className="item-desc">
                                        <span className="title">{cartItem.title}</span>
                                        <p>{cartItem.author}</p>
                                        <p><b>Price: ${cartItem.price}</b></p> 
                                        <p>
                                            <b>Quantity: {cartItem.quantity}</b> 
                                        </p>
                                        <div className="add-remove">
                                            <Link to="/cart"><i className="material-icons" onClick={()=>{this.increaseQ(cartItem._id, cartItem);}}>arrow_drop_up</i></Link>
                                            <Link to="/cart"><i className="material-icons" onClick={()=>{this.decreaseQ(cartItem._id, cartItem)}}>arrow_drop_down</i></Link>
                                        </div>
                                        <button className="waves-effect waves-light btn red remove" onClick={()=>{this.delete(cartItem._id)}}>Remove</button>
                                        
                                        <div className="item-save">
                                            <button className="waves-effect waves-light btn darkcyan save" onClick={() => {this.addToSave(cartItem);this.delete(cartItem._id)} }>Save For Later</button>
                                        </div>  
                                    </div>

                                </li>

                            ))}
                        </ul>
                    </div> 
                    <div className="container">
                        <div className="collection">
                            <li className="collection-item"><b>Total: ${this.state.total} </b></li>
                        </div>
                            <div className="checkout">
                                <button className="waves-effect waves-light btn">Checkout</button>
                            </div>
                    </div> 
                    <SaveLater/>
                </div>
            ); 
            
        
                
        
    }
}



export default Cart
