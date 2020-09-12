import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import Header from "./components/header/header.component";
import SignInAndSignUpPage from "./pages/sign-in-and-sign-up/sign-in-and-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.actions";

// const HatsPage = () => (
//   <div>
//     <h1>HATS PAGE</h1>
//   </div>
// );

//exact: if we use exact within the Route, it will derender that component when we are trying to render other components.
class App extends React.Component {
  //After writing 'mapDispatchToProps' reducer function we dont need the constructor anymore
  // constructor() {
  //   super();

  //   this.state = {
  //     currentUser: null,
  //   };
  // }

  //setting a variable to null "This is for close subscription"
  unsubscribeFromAuth = null;

  componentDidMount() {
    //Destructuring from the props of setCurrentUser
    const { setCurrentUser } = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
      //this.setState({ currentUser: user });
      //Instead of setting the state, we are going to call
      //createUserProfileDocument(user) to check of the user exists or not
      //createUserProfileDocument(user);

      //We are getting back 'userAuth' from Database
      //If userAuth exists
      if (userAuth) {
        //We are going to check if userAuth is being updated in the database
        const userRef = await createUserProfileDocument(userAuth);

        //As soon as this function runs, it will get us the snapShot of the Database
        //On 'snapShot' is the Object we get back and we are going to get the data from userRef which we are going to save in the state.
        //We are creating new Object with the 'id' we want
        userRef.onSnapshot((snapShot) => {
          //Instead of setState we are destructuring the value and using it here
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
        console.log(this.state);
      }

      // We dont need to pass  in the object with currentUser, instread we pass in the object which we want to update with
      setCurrentUser(userAuth);
    });
  }

  //This can close down the subscription.
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  //NOTICE <Header currentUser={this.state.currentUser} /> by writing reducer and passing it to root-reducer and than creating a store and passing {currentUser} will let us pass in <Header /> without {currentUser} PROP

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? (
                <Redirect to="/" />
              ) : (
                <SignInAndSignUpPage />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}
//render is a Javascript invocation that determines what component to return in the same place where the component will be instead its gonna some JS
// <Route exact path="/signin" component={SignInAndSignUpPage} /> Line 80

//This function implements the logic when the user is signed in, then user will not be exposed to sign in component
//From the state we are going to destructure the user from user reducer.
const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser,
});

//It will return an object where the prop will be the prop name whatever needs to be return
const mapDispatchToProps = (dispatch) => ({
  //It gets to the function that gets the 'user' object, and than calls dispatch and dispatch is a way for redux to know that whatever you are passing to me is an action object that redux is going to every reducer.
  setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

//we don't need to any state to Props so we will pass NULL as an first value,
//mapStateToProps as a first arg will give us access to currentUser
export default connect(mapStateToProps, mapDispatchToProps)(App);
