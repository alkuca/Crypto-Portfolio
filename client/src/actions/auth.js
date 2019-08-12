import {
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    USER_LOADED,
    GET_ERRORS,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    SUBMIT_LOADING,
    THEME_CHANGED,
    REFRESH_TOGGLED,
    RESET_PASSWORD,
    REQUESTED_EMAIL_PASSWORD_RESET,
    RESET_DATA
} from "./types";
import axios from 'axios';
import setAuthToken from "../Utils/setAuthToken";


// LOAD USER
export const loadUser = () => async dispatch => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    try{
        const res = await axios.get('/api/auth');

        dispatch({
            type: USER_LOADED,
            payload: res.data
        });
    } catch(err){
        dispatch({
            type:AUTH_ERROR
        })
    }
};




// REGISTER USER
export const register = ({ username, email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ username, email, password });

    try{
        const res = await axios.post('/users', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

    } catch (err){
        const errors = err.response.errors;
        if(errors) {
            errors.forEach(error => console.log(error.msg))
        }

        dispatch({
           type: REGISTER_FAIL,
            payload: err.response.data.errors
        });
    }
};


// LOGIN USER
export const login = ( email, password ) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({  email, password });

    try{
        const res = await axios.post('/api/auth', body, config);
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });

        await dispatch(loadUser());
    } catch (err){
        const errors = err.response.errors;
        if(errors) {
            errors.forEach(error => console.log(error.msg))
        }
        dispatch({
            type: LOGIN_FAIL,
            payload: err.response.data.errors
        });
    }
};


// LOGOUT USER
export const logout = () => dispatch => {
    dispatch({ type: LOGOUT })
};

// SUBMIT LOADING
export const subLoading = () => dispatch => {
    dispatch({ type: SUBMIT_LOADING })
};

// CHANGE THEME
export const changeTheme = (mode) => dispatch =>  {
    axios
        .patch('/users/theme', {theme:mode})
        .then(
            dispatch({
                type: THEME_CHANGED,
                payload:mode
            })
        )
};

// TOGGLE AUTO REFRESH
export const toggleAutoRefresh = (data) => dispatch =>  {
    axios
        .patch('/users/refresh', {autoRefresh:data})
        .then(
            dispatch({
                type: REFRESH_TOGGLED,
                payload:data
            })
        )
};


export const resetPassword = (newPassword,token) => dispatch =>  {
    axios
        .patch('/users/reset', {newPassword,token})
        .then(
            dispatch({
                type: RESET_PASSWORD
            })
        )
        .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response
        })
    );
};

export const requestPasswordEmail = (email) => dispatch =>  {
    axios
        .post('/users/request_password_reset', {email})
        .then(res =>
            dispatch({
                type: REQUESTED_EMAIL_PASSWORD_RESET,
                payload:res.data
            })
        )
        .catch(err =>
        dispatch({
            type: GET_ERRORS,
            payload: err.response.data.errors
        })
    );
};


export const registerSuccessfullToFalse = () => async dispatch => {
    await dispatch({ type: RESET_DATA })
};
