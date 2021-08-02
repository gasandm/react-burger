import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API = "https://norma.nomoreparties.space/api/ingredients";

const fetchIngredients = createAsyncThunk(
    'ingredients/fetchIngredients',
    async () => {
        await fetch(API, {
            method: 'GET',
            headers: {"Content-Type": "application/json"}
        })
        .then((res) => res.json())
        .then((result) => {
            console.log('fetchIngredients!');
            return result.data;
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
            console.log('addToConstructor!');
            if (action.payload.type !== 'bun') {
                state.addedIngredients.push(action.payload);
            } else {
                const bunIndex = state.addedIngredients.findIndex(item => item.type === action.payload.type);
                if (bunIndex == -1) {
                    console.log('добавление');
                    state.addedIngredients.push(action.payload);
                } else {
                    console.log('замена');
                    state.addedIngredients[bunIndex] = action.payload;
                }
            }
        },
        addAllIngredients(state, action) {
            console.log('addAllIngredients!');
            state.ingredients.push(action.payload);
        },
        deleteFromConstructor(state, action) {
            console.log('deleteFromConstructor!');
            const index = state.addedIngredients.findIndex(item => item._id === action.payload._id);
            state.addedIngredients.splice(index, 1);
        }
    },
    extraReducers: {
        [fetchIngredients.fullfilled]: (state, action) => {
            console.log('fetchIngredients.fullfilled');
            state.ingredients = action.payload;
        },
    }
});

export default ingredientsSlice.reducer;
export const { addToConstructor, addAllIngredients, deleteFromConstructor } = ingredientsSlice.actions;
export { fetchIngredients };