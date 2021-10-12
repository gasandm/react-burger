import { createSlice } from '@reduxjs/toolkit';

const wsSlice = createSlice({
    name: "orders",
    initialState: {
        wsConnected: false,
        orders: [],
        total: null,
        totalToday: null
    },
    reducers: {
        wsGetOrders(state, action) {
            state.wsConnected = action.payload.success
            state.orders = action.payload.orders
            state.total = action.payload.total
            state.totalToday = action.payload.totalToday
        },
        wsConnectionSuccess(state, action) {
            state.wsConnected = true
        },
        wsConnectionError(state, action) {
            state.wsConnected = false
        },
        wsGetMessage(state, action) {
            state.orders = action.payload.orders
            state.total = action.payload.total
            state.totalToday = action.payload.totalToday
        },
        wsClose(state) {
            state.wsConnected = false
        }
    }
});

export default wsSlice.reducer;
export const { wsGetOrders, wsConnectionSuccess, wsConnectionError, wsGetMessage, wsClose } = wsSlice.actions;