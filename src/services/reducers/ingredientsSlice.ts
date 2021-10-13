import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie } from '../../utils/functions';
import { TReduxStore } from './types';

const API = "https://norma.nomoreparties.space/api/ingredients";

const fetchIngredients = createAsyncThunk(
    'ingredients/fetchIngredients',
    async () => {
        return await fetch(API, {
            method: 'GET',
            headers: {"Content-Type": "application/json"}
        })
        .then((res) => {
            if (!res.ok) {
                return Promise.reject(`Не удалось загрузить ингредиенты. Ошибка ${res.status}`); 
            }
            return res.json();
        })
        .then((res) => {
            return res.data;
        })
        .catch((error) => {
            alert(error);
        });
    }
);

const fetchOrderDetails = createAsyncThunk(
    'ingredients/fetchOrderDetails',
    async (ids:{ingredients:string[]}) => {
        return await fetch('https://norma.nomoreparties.space/api/orders', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('accessToken') as string
            },
            method: 'POST',
            body: JSON.stringify(ids)
        })
        .then((res) => {
            if (!res.ok) {
                return Promise.reject(`Не удалось загрузить детали заказа. Ошибка ${res.status}`); 
            }
            return res.json();
        })
        .then((result) => {
            return result;
        })
        .catch((error) => {
            alert(error);
        });
    }
);

const fetchOrder = createAsyncThunk(
    'ingredients/fetchOrder',
    async (orderId:string) => {
        return await fetch('https://norma.nomoreparties.space/api/orders/'+orderId, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'GET'
        })
        .then((res) => {
            if (!res.ok) {
                return Promise.reject(`Не удалось загрузить детали заказа. Ошибка ${res.status}`); 
            }
            return res.json();
        })
        .then((result) => {
            return result;
        })
        .catch((error) => {
            alert(error);
        });
    }
);

const ingredientsSlice = createSlice({
    name: "ingredients",
    initialState: {
        ingredients: [],
        addedIngredients: [],
        currentItem: {},
        currentOrder: {}
    },
    reducers: {
        // @ts-ignore
        addToConstructor(state: TReduxStore["ingredients"], action) {
            const itemIndex = state.ingredients.findIndex(item => item._id === action.payload._id);
            if (action.payload.type !== 'bun') {
                state.addedIngredients.push(action.payload);
                //Увеличение счетчика
                state.ingredients[itemIndex].__v++;
            } else {
                const bunIndex = state.addedIngredients.findIndex(item => item.type === action.payload.type);
                if(bunIndex === -1) {
                    state.addedIngredients.push(action.payload);
                } else {
                    //Обнуление счетчика у старой булки 
                    const oldBun = state.addedIngredients.find(item => item.type === 'bun');
                    const oldBunIndex = state.ingredients.findIndex(item => item._id === oldBun?._id);
                    state.ingredients[oldBunIndex].__v === 1 ? state.ingredients[oldBunIndex].__v-- : state.ingredients[oldBunIndex].__v = 0;
                    //Смена булку на новую
                    state.addedIngredients[bunIndex] = action.payload;
                }
                //Увеличение счетчика
                state.ingredients[itemIndex].__v === 0 ? state.ingredients[itemIndex].__v++ : state.ingredients[itemIndex].__v = 1;
            }
        },
        // @ts-ignore
        deleteFromConstructor(state: TReduxStore["ingredients"], action) {
            const index = state.addedIngredients.findIndex(item => item._id === action.payload._id);
            state.addedIngredients.splice(index, 1);
            //Уменьшение счетчика
            const itemIndex = state.ingredients.findIndex(item => item._id === action.payload._id);
            state.ingredients[itemIndex].__v--;
        },
        addToDetails(state, action) {
            state.currentItem = action.payload;
        },
        removeFromDetails(state, action) {
            state.currentItem = {};
        },
        addManyToConstructor(state, action) {
            state.addedIngredients = action.payload;
        },
        removeFromOrderDetails(state, action) {
            state.currentOrder = {};
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchIngredients.fulfilled, (state, action) => {
            state.ingredients = action.payload;
        });
        builder.addCase(fetchOrderDetails.fulfilled, (state, action) => {
            state.currentOrder = action.payload;
        });
        builder.addCase(fetchOrder.fulfilled, (state, action) => {
            state.currentOrder = action.payload.order;
        })
    }}
);

export default ingredientsSlice.reducer;
export const { addToConstructor, deleteFromConstructor, addToDetails, removeFromDetails, addManyToConstructor, removeFromOrderDetails } = ingredientsSlice.actions;
export { fetchIngredients, fetchOrderDetails, fetchOrder };