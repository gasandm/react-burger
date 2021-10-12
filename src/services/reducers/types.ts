import { TIngredient } from "../../utils/types";

export type TReduxStore = {
    ingredients: TIngredientsStore;
    auth: TAuthStore;
    orders: TOrdersStore;
}

type TIngredientsStore = {
    ingredients: TIngredient[];
    addedIngredients: TIngredient[];
    currentItem: TIngredient;
    currentOrder: TOrder;
}

export type TOrderResponse = {
    name: string;
    order: TOrder;
    success: boolean;
}

export type TOrder = {
    createdAt: string
    ingredients: string[];
    name: string;
    number: number;
    owner: TOwner;
    price: number;
    status: string;
    updatedAt: string;
    _id: string;
}

type TOwner = {
    createdAt: string;
    email: string;
    name: string;
    updatedAt: string;
}

type TAuthStore = {
    success: boolean;
    user: TUser;
    accessToken: string;
    refreshToken: string;
    forgot: boolean;
}

type TUser = {
    email: string;
    name: string;
}

type TOrdersStore = {
    wsConnected: boolean;
    orders: TOrderSm[];
    total: number;
    totalToday: number;
}

export type TOrderSm = {
    createdAt: string;
    ingredients: string[];
    name: string;
    number: number;
    status: string;
    updatedAt: string;
    _id: string;
}