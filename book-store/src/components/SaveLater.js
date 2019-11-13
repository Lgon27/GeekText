import React, { Component } from 'react'
import { connect } from 'react-redux'
import { addBack, deleteItem } from './actions/cartActions'

class SaveLater extends Component{

    handleBack = (id)=>{
        this.props.addBack(id);
    }
    handleDelete = (id)=>{
        this.props.deleteItem(id);
    }
    render(){
 
        let savedItems = this.props.items.length ?
        (  
            this.props.items.map(item=>{
                return(
                   
                    <li className="collection-item avatar" key={item.id}>
                                <div className="item-img"> 
                                    <img src={item.img} alt={item.img} className=""/>
                                </div>
                            
                                <div className="item-desc">
                                    <span className="title">{item.title}</span>
                                    <p>{item.desc}</p>
                                    <p><b>Price: ${item.price}</b></p> 
                                    <br></br>
                                    <button className="waves-effect waves-light btn red remove" onClick={()=>{this.handleBack(item.id)}}>Add to Cart</button>
                                    
                                </div>  
 
                                <div className="delete">
                                    <button className="waves-effect waves-light btn darkcyan delete" onClick={()=>{this.handleDelete(item.id)}}>Delete</button>
                                </div>
                           </li>                        
                )
            })
        ):

         (
            <p>No Items.</p>
         )
        return(
            <div className="container">
                <div className="cart">
                    <h5>Save for Later:</h5>
                    <ul className="collection">
                        {savedItems}
                    </ul>
                </div> 
                <br></br>
                <br></br>
                <br></br>
            </div>
        )
    }

}

const mapStateToProps = (state)=>{
    return{
        items: state.savedItems
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        addBack: (id)=>{dispatch(addBack(id))},
        deleteItem: (id)=>{dispatch(deleteItem(id))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SaveLater)