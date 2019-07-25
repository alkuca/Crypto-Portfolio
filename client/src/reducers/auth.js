import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from "../actions/types";


const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    loading: true,
    registerSuccessful:false,
    user:null
};


export default function(state = initialState, action) {
    switch(action.type) {
        case USER_LOADED:
            return{
                ...state,
                isAuthenticated:true,
                loading:false,
                user:action.payload
            };
        case REGISTER_SUCCESS:
            localStorage.setItem("token",action.payload.token);
            return {
                ...state,
                ...action.payload,
                loading:false,
                registerSuccessful:true
            };
        case LOGIN_SUCCESS:
            localStorage.setItem("token",action.payload.token);
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                loading:false
            };
        case REGISTER_FAIL:
            localStorage.removeItem("token");
            return{
                ...state,
                token:null,
                isAuthenticated: false,
                loading:false
            };
        case LOGIN_FAIL:
            localStorage.removeItem("token");
            return{
                ...state,
                token:null,
                isAuthenticated: false,
                loading:false
            };
        case AUTH_ERROR:
            localStorage.removeItem("token");
            return{
                ...state,
                token:null,
                isAuthenticated: false,
                loading:false
            };
        case LOGOUT:
            localStorage.removeItem("token");
            return{
                ...state,
                token:null,
                isAuthenticated: false,
                loading:false,
                user:null
            };
        default:
            return state
    }
}