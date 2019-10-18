import Book1 from '../../images/Book1.jpg'
import Book2 from '../../images/Book2.jpg'
import Book3 from '../../images/Book3.jpg'
import Book4 from '../../images/Book4.jpg'
import Book5 from '../../images/Book5.jpg'
import Book6 from '../../images/Book6.jpg'
import { ADD_TO_CART,REMOVE_ITEM,SUB_QUANTITY,ADD_QUANTITY,ADD_SHIPPING, SAVE_LATER, ADD_BACK, DELETE_ITEM } from '../actions/action-types/cart-actions'


const initState = {
    items: [
        {id:1,title:'Gone With The Wind', desc: "By Margaret Mitchell", price:17.50,img: Book1},
        {id:2,title:'The Alchemist', desc: "By Paulo Coelho", price:9.50,img: Book2},
        {id:3,title:'To Kill a Mocking Bird', desc: "By Harper Lee",price:15.00,img: Book3},
        {id:4,title:'Looking For Alaska', desc: "By John Green", price:10.50,img:Book4},
        {id:5,title:'The Davinci Code', desc: "By Dan Brown", price:12.00,img: Book5},
        {id:6,title:'Peter Pan', desc: "By J.M. Barrie",price:6.50,img: Book6}
    ],
    addedItems:[],
    savedItems:[],
    total: 0

}
const cartReducer= (state = initState,action)=>{
    //Can Convert to a SWITCH statement
    //INSIDE HOME COMPONENT
    if(action.type === ADD_TO_CART){
        let addedItem = state.items.find(item=> item.id === action.id)
        //check if the action id exists in the addedItems
       let existed_item= state.addedItems.find(item=> action.id === item.id)
       if(existed_item)
       {
          addedItem.quantity += 1 
           return{
              ...state,
               total: state.total + addedItem.price 
            }
       }
       else{
          addedItem.quantity = 1;
          //calculating the total
          let newTotal = state.total + addedItem.price 
          
          return{
              ...state,
              addedItems: [...state.addedItems, addedItem],
              total : newTotal
          }
          
      }
  }
  if(action.type === REMOVE_ITEM){
      let itemToRemove= state.addedItems.find(item=> action.id === item.id)
      let new_items = state.addedItems.filter(item=> action.id !== item.id)
      
      //calculating the total
      let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
      console.log(itemToRemove)
      return{
          ...state,
          addedItems: new_items,
          total: newTotal
      }
  }
  //Remove item from cart and include it below Save Later. Update Total.
  if(action.type === SAVE_LATER) {
    let savedItem = state.addedItems.find(item=> action.id === item.id)
    let itemToRemove= state.addedItems.find(item=> action.id === item.id)
    let new_items = state.addedItems.filter(item=> action.id !== item.id)

    let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity )
    return{
        ...state,
        savedItems: [...state.savedItems, savedItem],
        addedItems: new_items,
        total: newTotal
    }
  }
  //Remove item from Save Later and add back to cart. Update Total.
  if(action.type === ADD_BACK) {
    let itemToRemove= state.savedItems.find(item=> action.id === item.id)
    let new_items = state.savedItems.filter(item=> action.id !== item.id)
    let readdItem = state.savedItems.find(item=> action.id === item.id)

    let newTotal = state.total + (itemToRemove.price * itemToRemove.quantity )
    return{
        ...state,
        addedItems: [...state.addedItems, readdItem],
        savedItems: new_items,
        total: newTotal
    }
  }
  if(action.type === DELETE_ITEM) {
    let itemToRemove= state.savedItems.find(item=> action.id === item.id)
    let new_items = state.savedItems.filter(item=> action.id !== item.id)

    console.log(itemToRemove)
    return{
        ...state,
        savedItems: new_items
    }
  }
  //INSIDE CART COMPONENT
  if(action.type=== ADD_QUANTITY){
      let addedItem = state.items.find(item=> item.id === action.id)
        addedItem.quantity += 1 
        let newTotal = state.total + addedItem.price
        return{
            ...state,
            total: newTotal
        }
  }
  if(action.type=== SUB_QUANTITY){  
      let addedItem = state.items.find(item=> item.id === action.id) 
      //if the qt == 0 then it should be removed
      if(addedItem.quantity === 1){
          let new_items = state.addedItems.filter(item=>item.id !== action.id)
          let newTotal = state.total - addedItem.price
          return{
              ...state,
              addedItems: new_items,
              total: newTotal
          }
      }
      else {
          addedItem.quantity -= 1
          let newTotal = state.total - addedItem.price
          return{
              ...state,
              total: newTotal
          }
      }
      
  }

  if(action.type=== ADD_SHIPPING){
        return{
            ...state,
            total: state.total + 5
        }
  }

  if(action.type=== 'SUB_SHIPPING'){
      return{
          ...state,
          total: state.total - 5
      }
   }
  
   else{
    return state
  }
  
}

export default cartReducer