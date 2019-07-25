import {
    GET_ALL_ASSETS, ALL_ASSETS_ERROR, GET_SINGLE_ASSET_DATA, SINGLE_ASSET_ERROR,ADD_ASSET_TO_USER,ADD_ASSET_TO_USER_ERROR
} from "./types";
import axios from 'axios';


export const getAllAssets = () => async dispatch => {

    try{
        const res = await axios.get('https://api.coingecko.com/api/v3/coins/list');

        dispatch({
            type: GET_ALL_ASSETS,
            payload: res.data
        });
    } catch(err){
        dispatch({
            type:ALL_ASSETS_ERROR
        })
    }
};

//get single asset data by id
export const getSingleAssetData = (id) => async dispatch => {
    try {
        const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);

        dispatch({
            type: GET_SINGLE_ASSET_DATA,
            payload: res.data
        });
    } catch (err) {
        dispatch({
            type: SINGLE_ASSET_ERROR
        });
    }
};


// add asset to user
export const addAssetToUser = ({ name,symbol,purchasedPrice,purchasedAmount,image }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ name,symbol,purchasedPrice,purchasedAmount,image });

    try{
        const res = await axios.post('/api/asset', body, config);
        dispatch({
            type: ADD_ASSET_TO_USER,
            payload: res.data
        });

    } catch (err){
        const errors = err.response.errors;
        if(errors) {
            errors.forEach(error => console.log(error.msg))
        }

        dispatch({
            type: ADD_ASSET_TO_USER_ERROR
        });
    }
};
