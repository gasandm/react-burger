import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
    addCurrentUser
} from "./authSlice";
import fetchMock from "fetch-mock";

const mockStore = configureMockStore([thunk]);

const initialState = {
    user: {},
    success: false,
    accessToken: '',
    refreshToken: '',
    forgot: false
};

describe("async actions", () => {
    it("should login user", () => {
        const store = mockStore(initialState);
        const expectedStore = {
            user: {
                email: "example@mail.ru",
                name: "name"
            },
            success: true,
            accessToken: 'accessToken',
            refreshToken: 'refreshToken',
            forgot: false
        }

        expect(store.getState()).toEqual(initialState);
        const resStoreWithItem = initialState;
        resStoreWithItem.user = expectedStore.user;
        store.dispatch(addCurrentUser(resStoreWithItem.user));
        expect(store.getState().user).toEqual(
            resStoreWithItem.user
        );
    });
});
