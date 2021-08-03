import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API = "https://norma.nomoreparties.space/api/ingredients";

const fetchIngredients = createAsyncThunk(
    'ingredients/fetchIngredients',
    async () => {
        return await fetch(API, {
            method: 'GET',
            headers: {"Content-Type": "application/json"}
        })
        .then((res) => res.json())
        .then((result) => {
            return result.data;
        })
        .catch((error) => {
            alert(error);
        });
    }
);

const fetchOrderDetails = createAsyncThunk(
    'ingredients/fetchOrderDetails',
    async (ids) => {
        return await fetch('https://norma.nomoreparties.space/api/orders', {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(ids)
        })
        .then((res) => res.json())
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
        addToConstructor(state, action) {
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
                    const oldBunIndex = state.ingredients.findIndex(item => item._id === oldBun._id);
                    state.ingredients[oldBunIndex].__v === 1 ? state.ingredients[oldBunIndex].__v-- : state.ingredients[oldBunIndex].__v = 0;
                    //Смена булку на новую
                    state.addedIngredients[bunIndex] = action.payload;
                }
                //Увеличение счетчика
                state.ingredients[itemIndex].__v === 0 ? state.ingredients[itemIndex].__v++ : state.ingredients[itemIndex].__v = 1;
            }
        },
        deleteFromConstructor(state, action) {
            const index = state.addedIngredients.findIndex(item => item._id === action.payload._id);
            state.addedIngredients.splice(index, 1);
            //Уменьшение счетчика
            const itemIndex = state.ingredients.findIndex(item => item._id === action.payload._id);
            state.ingredients[itemIndex].__v--;
        },
        addToDetails(state, action) {
            state.currentItem = action.payload;
        },
        removeFromDetails(state) {
            state.currentItem = {};
        },
        addManyToConstructor(state, action) {
            state.addedIngredients = action.payload;
        }
    },
    extraReducers: {
        [fetchIngredients.fulfilled]: (state, action) => {
            state.ingredients.push(...action.payload);
        },
        [fetchOrderDetails.fulfilled]: (state, action) => {
            state.currentOrder = action.payload;
        },
    }
});

export default ingredientsSlice.reducer;
export const { addToConstructor, deleteFromConstructor, addToDetails, removeFromDetails, addManyToConstructor } = ingredientsSlice.actions;
export { fetchIngredients, fetchOrderDetails };