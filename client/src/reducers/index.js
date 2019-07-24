import { combineReducers } from 'redux';
import auth from './auth'
import  assets from './assets'

export default combineReducers({
    auth,
    assets
});