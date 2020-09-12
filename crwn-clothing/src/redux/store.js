import { createStore, applyMiddleware } from "redux";
import logger from "redux-logger";
import rootReducer from "./root-reducer";

//Middleware the store is expecting from REDUX
//This configuration can be viewed on redux documentation as well
//This is an array
const Middlewares = [logger];

//Now, creating a store and it takes in rootReducer and return value of applyMiddleware
// ...middlewares, it will spread in all the functions (middlewares) into the array, into this applyMiddleware (argument) and if we need to add more functions we can add that into array.
const store = createStore(rootReducer, applyMiddleware(...Middlewares));

export default store;
