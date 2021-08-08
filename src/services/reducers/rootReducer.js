import { combineReducers } from 'redux';
import ingredientsSlice from "./ingredientsSlice";

const rootReducer = combineReducers({
    ingredients: ingredientsSlice
})

export default rootReducer;