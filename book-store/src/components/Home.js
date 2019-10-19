import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addToCart } from './actions/cartActions'
import {Button} from 'react-bootstrap';
import {BookDetails} from './BookDetails.js';

class Home extends Component{
    
    constructor(props){
        super(props);
        this.state = {books:[], bookDetailsShow: false}
    }

    handleClick = (id)=>{
        this.props.addToCart(id); 
    }
    async componentDidMount() {
        const response = await fetch('http://localhost:3000/get/books');
        const json = await response.json();
        console.log(json);
    }

    render(){
        
        let bookDetailsClose =() => this.setState({bookDetailsShow: false})


        let itemList = this.props.items.map(item=>{
            return(
                <div className="card" key={item.id}>
                        <div className="card-image">
                                <Button id='book-button' onClick={() => this.setState({
                                    bookTitle: item.title,
                                    bookDetailsShow:true
                                    })}>
                                <img src={item.img} alt={item.title}/>
                                </Button>

                            <span to="/" className="btn-floating halfway-fab waves-effect waves-light red" 
                                onClick={()=>{this.handleClick(item.id)}}><i className="material-icons">add</i>
                            </span>
                        </div>

                        <div className="card-content">
                            <p>{item.desc}</p>
                            <p><b>Price: ${item.price}</b></p>
                        </div>
                 </div>
            )
        })

        return(
            <div className="container">
                <h3 className="center">BOOKS</h3>
                <div className="box">
                    {itemList}
                </div>
                <BookDetails
                        show = {this.state.bookDetailsShow}
                        onHide = {bookDetailsClose}>
                </BookDetails>
            </div>
        )
    }

}
const mapStateToProps = (state)=>{
    return {
      items: state.items
    }
  }
const mapDispatchToProps = (dispatch)=>{
    
    return{
        addToCart: (id)=>{dispatch(addToCart(id))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)