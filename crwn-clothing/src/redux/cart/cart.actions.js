import CartActionTypes from "./cart.types";

export const toggleCartHidden = () => ({
  type: CartActionTypes.TOGGLE_CART_HIDDEN,
});

//It will get the item that we want to want to add into the array we have in reducer and we will return new action type
export const addItem = (item) => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item,
});
