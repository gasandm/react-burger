import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { wsConnectionSuccess, wsConnectionError } from './wsSlice';

const mockStore = configureMockStore([thunk]);

const initialState = {
    wsConnected: false,
    orders: [],
    total: null,
    totalToday: null
}

const store = mockStore(initialState);

describe("Ckecking wsSlice actions", () => {
    it("should set ws connection", () => {
        expect(store.getState()).toEqual(initialState);
        const resStoreWithItem = initialState;
        resStoreWithItem.wsConnected = true;
        store.dispatch(wsConnectionSuccess(resStoreWithItem.wsConnected));
        expect(store.getState().wsConnected).toEqual(
            resStoreWithItem.wsConnected
        );
    });

    it("should unset ws connection", () => {
        expect(store.getState()).toEqual(initialState);
        const resStoreWithItem = initialState;
        resStoreWithItem.wsConnected = false;
        store.dispatch(wsConnectionError(resStoreWithItem.wsConnected));
        expect(store.getState().wsConnected).toEqual(
            resStoreWithItem.wsConnected
        );
    });
});
