import CartActionTypes from "./cart.types";
import addItemToCart from "./cart.utils";

const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_HIDDEN:
      return {
        ...state,
        hidden: !state.hidden,
      };
    case CartActionTypes.ADD_ITEM:
      //we want cartItems to be the OLD Item and newest action that got fired, we want to deposit whatever the item is in the payload of that item in this array (so we are spreading in all the array values and additional values inside the payload of the array)
      return {
        ...state,
        cartItems: addItemToCart(state.cartItems, action.payload),
      };
    default:
      return state;
  }
};

export default cartReducer;
