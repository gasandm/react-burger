import {
    wsConnectionSuccess,
    wsConnectionError,
    wsGetMessage,
    wsClose,
} from "../reducers/wsSlice";

export const wsMiddleware = (store) => {
    let socket = null;

    return (next) => (action) => {
        const { dispatch } = store;
        const { type, payload } = action;
        if (type === "orders/wsGetOrders") {
            socket = new WebSocket(payload);
        }
        if (socket) {
            socket.onopen = (event) => {
                dispatch(wsConnectionSuccess());
            };
            socket.onerror = (event) => {
                dispatch(wsConnectionError());
            };
            socket.onmessage = (event) => {
                const { data } = event;
                const parsedData = JSON.parse(data);
                const { success, ...restParsedData } = parsedData;
                dispatch(wsGetMessage(restParsedData));
            };
            socket.onclose = (event) => {
                dispatch(wsClose());
            };
            if (type === "orders/wsGetMessage") {
                const message = payload;
                socket.send(JSON.stringify(message));
            }
            if (type === "orders/wsClose") {
                socket.close();
            }
        }
        next(action);
    };
};
