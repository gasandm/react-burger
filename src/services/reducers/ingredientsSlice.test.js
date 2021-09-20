import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
    addToConstructor,
    deleteFromConstructor,
    addToDetails,
    removeFromDetails,
    removeFromOrderDetails,
} from "./ingredientsSlice";

const mockStore = configureMockStore([thunk]);

const initialState = {
    ingredients: [],
    addedIngredients: [],
    currentItem: {},
    currentOrder: {},
};

const ingredient = {
    calories: 643,
    carbohydrates: 85,
    fat: 26,
    image: "https://code.s3.yandex.net/react/code/bun-01.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    name: "Флюоресцентная булка R2-D3",
    price: 988,
    proteins: 44,
    type: "main",
    __v: 0,
    _id: "60d3b41abdacab0026a733c7",
};

const store = mockStore(initialState);

describe("Ckecking ingredientsSlice", () => {
    it("should add ingredient to currentItem", () => {
        expect(store.getState()).toEqual(initialState);
        const resStoreWithItem = initialState;
        resStoreWithItem.currentItem = ingredient;
        store.dispatch(addToDetails(resStoreWithItem.currentItem));
        expect(store.getState().currentItem).toEqual(
            resStoreWithItem.currentItem
        );
    });

    it("should add ingredient to constructor", () => {
        expect(store.getState()).toEqual(initialState);
        const resStoreWithItems = initialState;
        resStoreWithItems.addedIngredients.push(ingredient);
        store.dispatch(addToConstructor(resStoreWithItems.addedIngredients));
        expect(store.getState().addedIngredients).toEqual(
            resStoreWithItems.addedIngredients
        );
    });

    it("should delete ingredient from constructor", () => {
        initialState.ingredients.push(ingredient);
        
        expect(store.getState()).toEqual(initialState);
        initialState.ingredients = [];
        const resStoreWithItems = initialState;
        store.dispatch(deleteFromConstructor(ingredient));
        expect(store.getState().ingredients).toEqual(
            resStoreWithItems.ingredients
        );
    });

    it("should delete ingredient from currentOrder", () => {
        initialState.currentOrder = ingredient;

        expect(store.getState()).toEqual(initialState);
        initialState.currentOrder = {};
        const resStoreWithItems = initialState;
        store.dispatch(removeFromOrderDetails(ingredient));
        expect(store.getState().currentOrder).toEqual(
            resStoreWithItems.currentOrder
        );
    });

    it("should delete ingredient from currentItem", () => {
        initialState.currentItem = ingredient;

        expect(store.getState()).toEqual(initialState);
        initialState.currentItem = {};
        const resStoreWithItems = initialState;
        store.dispatch(removeFromDetails(ingredient));
        expect(store.getState().currentItem).toEqual(
            resStoreWithItems.currentItem
        );
    });
});
