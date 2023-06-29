import React,{useReducer} from 'react'
import CartContext from './cart-context'
const defaultState ={
    item: {},
    quantity: {},
    totalAmount: 0,
}

const cartReducer = (state,action) =>{
       
    if(action.type==="ADD"){
      const id = action.item.id;
       const qty = action.item.amount; 
      const updatedState = {
            item: {...state.item,  [action.item.id]: action.item },
            quantity: {...state.quantity, [id]: (state.quantity[id]!=null? state.quantity[id]+qty: qty )  }
           ,totalAmount: (state.totalAmount+action.item.price*qty)  
        }
        return updatedState;

    } else if(action.type==="REMOVE"){
      const idd = action.id;
      const item = state.item;
      const upqty = state.quantity;
      const diffPrice = state.item[idd].price.toFixed(2);
      const cnt = state.quantity[idd];
      console.log(idd,cnt,diffPrice);
    //   if(cnt==1) {delete item.idd;}   
      if(cnt==1){
        console.log("needToDelete",item)
       delete item[idd];
        delete upqty[idd];
        console.log("deleted",item)
      } else{
        const curr = upqty[idd]
        upqty[idd] = curr-1;
      }
      const upAmount = state.totalAmount - diffPrice
      return {
        item: item,
        quantity: upqty,
        totalAmount: upAmount
      }
    }
    return state
}

const CartProvider = (props) => {
   const [cartState, dispatchCart]= useReducer(cartReducer,defaultState);
 const addItemToCartHandler = ( item) => {
   // console.log('successfully pass===' , item);
    dispatchCart({type: "ADD" , item: item});
 }
 const removeItemFromCartHandler = (id)  => {
    dispatchCart({type:"REMOVE" , id: id});
 }
// console.log("cartStateItem==",cartState.item);

  const cartContext = {
    item: cartState.item,
    totalAmount: cartState.totalAmount,
    quantity: cartState.quantity,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
  }

  return <CartContext.Provider value={cartContext} >
    {props.children}
  </CartContext.Provider>
    
  
}

export default CartProvider;
