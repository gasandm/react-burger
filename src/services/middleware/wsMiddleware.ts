import {
    wsGetOrders,
    wsConnectionSuccess,
    wsConnectionError,
    wsGetMessage,
    wsClose,
} from "../reducers/wsSlice";

export const wsMiddlewareF = (store: any) => {
    let socket: any = null;

    return (next: Function) => (action: {type: string, payload: string}) => {
        const { dispatch } = store;
        const { type, payload } = action;
        if (type === wsGetOrders.type) {
            socket = new WebSocket(payload);
        }
        if (socket) {
            socket.onopen = () => {
                dispatch(wsConnectionSuccess());
            };
            socket.onerror = () => {
                dispatch(wsConnectionError());
            };
            socket.onmessage = (event: {data: string}) => {
                const { data } = event;
                const parsedData = JSON.parse(data);
                const { success, ...restParsedData } = parsedData;
                dispatch(wsGetMessage(restParsedData));
            };
            socket.onclose = () => {
                dispatch(wsClose());
            };
            if (type === wsGetMessage.type) {
                const message = payload;
                socket.send(JSON.stringify(message));
            }
            if (type === wsClose.type) {
                socket.close();
            }
        }
        next(action);
    };
};
