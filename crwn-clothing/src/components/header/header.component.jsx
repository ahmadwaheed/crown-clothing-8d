import React from "react";
import "./header.styles.scss";
import { Link } from "react-router-dom";
import { ReactComponent as Logo } from "../../assets/crown.svg";
import { auth } from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import CartIcon from "../cart-icon/cart.icon.component";
import CartDropDown from "../cart-dropdown/cart-dropdown.component";

const Header = ({ currentUser, hidden }) => (
  <div className="header">
    <Link className="logo-container" to="/">
      <Logo className="logo" />
    </Link>
    <div className="options">
      <Link className="option" to="/shop">
        SHOP
      </Link>
      <Link className="option" to="/shop">
        CONTACT
      </Link>
      {currentUser ? (
        <div className="option" onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      )}
      <CartIcon />
    </div>

    {hidden ? null : <CartDropDown />}
  </div>
);

//This is conditionally rendering the <CartDropDown/>
//    {hidden ? null : <CartDropDown />}

//we want our root-reducer and from root-reducer we want our user value and from there we want currentUser (which is coming from user.reducer.js)
//This function allows us to have access to the state, state being our root-reducer
//It is a function which return a function, which will return an object. Where proerty is the actual property we are going to pass in and value will be the value.
//STATE: it is a root-reducer
const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
  currentUser,
  hidden,
});

//By passing 'mapStateToProps' as an argument to connect is returning the currentUser value and with that we can remove <Header currentUser={this.state.currentUser} /> the passing value of currentUser{}
export default connect(mapStateToProps)(Header);
