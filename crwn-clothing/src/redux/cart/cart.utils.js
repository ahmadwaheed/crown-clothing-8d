//It will take in all the existing items in the cart that are in the cartItems (reducer.js) at the moment.
//we are going to look inside the cartItem array if cartItemToAdd exists within the cartItem array or not.
const addItemsToCart = (cartItems, cartItemToAdd) => {
  //it will return true or false and find() will return the first item being passed based on the condition
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToAdd.id
  );

  //If existingCartItem exists, we will return map() and map() will return a new array which needs to be passed in to our compoenents to be rendered properly

  //Quantity property gets attached the first time around since this if block won't run when its a new item
  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      //if it is true we will pass in new object which contains cartItem and increment quantity by 1
      cartItems.id === cartItemToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  //if existingCartItem DO NOT exist we will return cartItem and add a base quantity of 1
  return [...cartItems, { ...cartItemToAdd, quantity: 1 }];
};

export default addItemsToCart;
