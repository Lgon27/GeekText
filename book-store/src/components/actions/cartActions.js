import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING, SAVE_LATER, ADD_BACK, DELETE_ITEM} from './action-types/cart-actions'

//add cart action
export const addToCart= (id)=>{
    return{
        type: ADD_TO_CART,
        id
    }
}
//remove item action
export const removeItem=(id)=>{
    return{
        type: REMOVE_ITEM,
        id
    }
}
//add qt action
export const addQuantity=(id)=>{
    return{
        type: ADD_QUANTITY,
        id
    }
}
//subtract qt action
export const subtractQuantity=(id)=>{
    return{
        type: SUB_QUANTITY,
        id
    }
}
//Save item for later
export const saveLater=(id)=>{
    return{
        type: SAVE_LATER,
        id
    }
}
//Add back to cart from Save Later
export const addBack=(id)=>{
    return{
        type: ADD_BACK,
        id
    }
}
//Delete item from Save Later
export const deleteItem=(id)=>{
    return{
        type: DELETE_ITEM,
        id
    }
}