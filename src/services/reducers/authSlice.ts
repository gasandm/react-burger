import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getCookie, setCookie } from '../../utils/functions';

const API = "https://norma.nomoreparties.space/api/auth/";

const register = createAsyncThunk(
    'auth/register',
    async (form: object) => {
        return await fetch(API+'register', {
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
    async (form: object) => {
        return await fetch(API+'login', {
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
        return await fetch(API+'logout', {
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
            setCookie('accessToken', '')
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
        return await fetch(API+'token', {
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
    return await fetch(API+'token', {
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
        return await fetch(API+'user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('accessToken') as string
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
            return fetch(API+'user', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': getCookie('accessToken') as string
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
    'auth/setUserDetails',
    async (form:object) => {
        return await fetch(API+'user', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getCookie('accessToken') as string
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
        user: {
            email: null,
            name: null
        },
        accessToken: '',
        refreshToken: '',
        forgot: false
    },
    reducers: {
        addCurrentUser(state, action) {
            state.user = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(register.fulfilled, (state, action) => {
            state.user = action.payload.user
            state.success = action.payload.success
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.user = action.payload.user
            state.success = action.payload.success
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
        });
        builder.addCase(refreshToken.fulfilled, (state, action) => {
            state.success = action.payload.success
            state.accessToken = action.payload.accessToken
            state.refreshToken = action.payload.refreshToken
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            if(action.payload.success) {
                state.user = {} as any
                state.success = false
                state.accessToken = ''
                state.refreshToken = ''
            }
        });
        builder.addCase(getUserDetails.fulfilled, (state, action) => {
            if(action.payload.success) {
                state.user.email = action.payload.user.email
                state.user.name = action.payload.user.name
                state.success = action.payload.success
            }
        });
        builder.addCase(setUserDetails.fulfilled, (state, action) => {
            state.user = action.payload.user
            state.success = action.payload.success
        });
    }
});

export default authSlice.reducer;
export const { addCurrentUser } = authSlice.actions;
export { register, login, logout, refreshToken, getUserDetails, setUserDetails, refreshTokenFunc };