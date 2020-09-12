//root-reducer is the actual base reducer object, that represent all of the states  of our application. This is the actual code combining all of the other states together
//To combine all the reducers, we need to import a component
import { combineReducers } from "redux";

//importing our userReducer
import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";

//The imported "userReducer" will get called with "key": "value" pair, key goes to actual reducer. This will fullstate JSON Object.
//KEYS represent indivial slices of states and reducer is the actual reducer we wrote.
export default combineReducers({
  user: userReducer,
  cart: cartReducer,
});
