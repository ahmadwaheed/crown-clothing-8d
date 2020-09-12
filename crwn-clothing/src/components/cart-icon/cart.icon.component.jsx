import React from "react";
import "./cart-icon.styles.scss";
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";
//we are using { connect } to connect redux code associated with cart
import { connect } from "react-redux";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

const CartIcon = ({ toggleCartHidden }) => (
  //onClick binds the Cart TOGGLE
  <div className="cart-icon" onClick={toggleCartHidden}>
    <ShoppingIcon className="shopping-icon" />
    <span className="item-count">0</span>
  </div>
);

//This is binding the cart REDUX code to the cart component
const mapDispatchToProps = (dispatch) => ({
  toggleCartHidden: () => dispatch(toggleCartHidden()),
});

export default connect(null, mapDispatchToProps)(CartIcon);
