//we are importing UserActionTypes in this file to make 'SET_CURRENT_USER' consistent across the application wherever it is being called
import { UserActionTypes } from "./user.types";

//The action is an object that has a type, which is a string value. which is a name which tells which specific action it is.
//It is going to contain initial state and action
//STATE: is something that redux is going to pass to this reducer whenever the action fires.

//we need to set an initial state so the reducer knows which state to start from, which is same as "this.state = {}" within the constructor
const INITIAL_STATE = {
  currentUser: null,
};

//ES6 Syntax to Pass in DEFAULT value "state = INITIAL_STATE" MEANS if the state is undefined, it will fallback and leverage this initial value we have here
//We have to use switch/if-else statement to return the actual state based on the action. we are returning based on type of the action or DEFAULT
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    //Instead of calling the String we gonna call the object coming from UserActionTypes
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
//After this we will bring this back to "root reducer"
