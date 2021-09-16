import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie } from '../../utils/functions';

const logoutAPI = "https://norma.nomoreparties.space/api/auth/logout";
const loginAPI = "https://norma.nomoreparties.space/api/auth/login";
const registerAPI = "https://norma.nomoreparties.space/api/auth/register";
const refreshAPI = "https://norma.nomoreparties.space/api/auth/token";
const getUserAPI = "https://norma.nomoreparties.space/api/auth/user";

function setCookie(name, value, props) {
    props = props || {};
    let exp = props.expires;
    if (typeof exp == 'number' && exp) {
        const d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }
    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }
    value = encodeURIComponent(value);
    let updatedCookie = name + '=' + value;
    for (const propName in props) {
        updatedCookie += '; ' + propName;
        const propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += '=' + propValue;
        }
    }
    document.cookie = updatedCookie;
} 

const register = createAsyncThunk(
    'auth/register',
    async (form) => {
        return await fetch(registerAPI, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(form)
        })
        .then((res) => {
            if (!res.ok) return Promise.reject(`Не удалось зарегистрировать пользователя. Ошибка ${res.status}`)

            return res.json();
        })
        .then((res) => {
            localStorage.setItem('refreshToken', res.refreshToken);

            let authToken
            if(res.success) {
                if (res.accessToken.indexOf('Bearer') === 0) authToken = res.accessToken.split('Bearer ')[1]
            }
            if (authToken) setCookie('accessToken', authToken)

            return res;
        })
        .catch((error) => alert(error));
    }
);

const login = createAsyncThunk(
    'auth/login',
    async (form) => {
        return await fetch(loginAPI, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(form)
        })
        .then((res) => {
            if (!res.ok) return Promise.reject(`Не удалось авторизовать пользователя. Ошибка ${res.status}`)

            return res.json();
        })
        .then((res) => {
            localStorage.setItem('refreshToken', res.refreshToken)

            let authToken
            if(res.success) {
                if (res.accessToken.indexOf('Bearer') === 0) authToken = res.accessToken.split('Bearer ')[1]
            }
            if (authToken) setCookie('accessToken', authToken)

            return res;
        })
        .catch((error) => {
            alert(error);
            return false;
        });
    }
);

const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        return await fetch(logoutAPI, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                token: localStorage.getItem('refreshToken')
            })
        })
        .then((res) => {
            if (!res.ok) return Promise.reject(`Не удалось выйти из системы. Ошибка ${res.status}`)
            setCookie('accessToken', null)
            localStorage.removeItem('refreshToken')
            return res.json();
        })
        .then((result) => {
            return result;
        })
        .catch((error) => {
            alert(error);
            return false;
        });
    }
);

const refreshToken = createAsyncThunk(
    'auth/refreshToken',
    async () => {
        return await fetch(refreshAPI, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                token: localStorage.getItem('refreshToken')
            })
        })
        .then((res) => {
            if (!res.ok) return Promise.reject(`Не удалось обновить токен. Ошибка ${res.status}`)
            return res.json();
        })
        .then((result) => {
            localStorage.setItem('refreshToken', result.refreshToken)
            setCookie('accessToken', result.accessToken)
            return result;
        })
        .catch((error) => {
            alert(error);
            return false;
        });
    }
);

const refreshTokenFunc = async () => {
    return await fetch(refreshAPI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken')
        })
    })
    .then((res) => {
        if (!res.ok) return Promise.reject(`Не удалось обновить токен. Ошибка ${res.status}`)
        return res.json();
    })
    .then((result) => {
        localStorage.setItem('refreshToken', result.refreshToken)
        setCookie('accessToken', result.accessToken)
        return result;
    })
}

const getUserDetails = createAsyncThunk(
    'auth/getUserDetails',
    async () => {
        return await fetch(getUserAPI, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('accessToken')
            }
        })
        .then((res) => {
            if (!res.ok) return res.json().then((err) => Promise.reject(err))
            return res.json();
        })
        .catch((err) => {
            if (err.message === 'jwt expired') {
                return refreshTokenFunc()
            }
            return Promise.reject(err);
        })
        .then(res => {
            return fetch(getUserAPI, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getCookie('accessToken')
                }
            })
        })
        .then((res) => {
            if (!res.ok) return res.json().then((err) => Promise.reject(err))
            return res.json();
        })
    }
);

const setUserDetails = createAsyncThunk(
    'auth/getUserDetails',
    async (form) => {
        return await fetch(getUserAPI, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('accessToken')
            },
            method: 'PATCH',
            body: JSON.stringify(form)
        })
        .then((res) => {
            if (!res.ok) return res.json().then((err) => Promise.reject(err))
            alert('Данные обновлены')
            return res.json();
        })
        .catch((err) => {
            alert(err)
            return false;
        });
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        success: false,
        user: {},
        accessToken: '',
        refreshToken: '',
        forgot: false
    },
    reducers: {
        addCurrentUser(state, action) {
            state.user = action.payload;
        }
    },
    extraReducers: {
        [register.fulfilled]: (state, action) => {
            // не сработало через "..."
            state.user = action.payload.user
            state.success = action.payload.success
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
        },
        [login.fulfilled]: (state, action) => {
            state.user = action.payload.user
            state.success = action.payload.success
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
        },
        [refreshToken.fulfilled]: (state, action) => {
            state.success = action.payload.success
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
        },
        [logout.fulfilled]: (state, action) => {
            if(action.payload.success) {
                state.user = {}
                state.success = false
                state.accessToken = ''
                state.refreshToken = ''
            }
        },
        [getUserDetails.fulfilled]: (state, action) => {
            if(action.payload.success) {
                state.user.email = action.payload.user.email
                state.user.name = action.payload.user.name
                state.success = action.payload.success
            }
        },
        [setUserDetails.fulfilled]: (state, action) => {
            state.user = action.payload.user
            state.success = action.payload.success
        },
    }
});

export default authSlice.reducer;
export const { addCurrentUser } = authSlice.actions;
export { register, login, logout, refreshToken, getUserDetails, setUserDetails, refreshTokenFunc };