import { combineReducers } from 'redux';
import ingredientsSlice from "./ingredientsSlice";
import authSlice from "./authSlice";
import wsSlice from './wsSlice';

const rootReducer = combineReducers({
    ingredients: ingredientsSlice,
    auth: authSlice,
    orders: wsSlice
})

export default rootReducer;