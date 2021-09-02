import { combineReducers } from 'redux';
import ingredientsSlice from "./ingredientsSlice";
import authSlice from "./authSlice";

const rootReducer = combineReducers({
    ingredients: ingredientsSlice,
    auth: authSlice
})

export default rootReducer;