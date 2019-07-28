import {
    GET_ALL_ASSETS, ALL_ASSETS_ERROR, GET_SINGLE_ASSET_DATA, SINGLE_ASSET_ERROR, ADD_ASSET_TO_USER,
    ADD_ASSET_TO_USER_ERROR, ASSET_FETCHING, ASSET_LIVE_USD_DATA,ASSET_LIVE_BTC_DATA,ASSET_LIVE_PERCENT_DATA,RESET_LIVE_DATA
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
export const addAssetToUser = ({ id,name,symbol,purchasedPrice,purchasedAmount,image,purchasedPriceUsd }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ id,name,symbol,purchasedPrice,purchasedAmount,image,purchasedPriceUsd });

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

export const assetFetching = () => dispatch => {
    dispatch({ type: ASSET_FETCHING })
};




export const setLiveUsdData = (res) => dispatch => {
    dispatch({ type: ASSET_LIVE_USD_DATA, payload:res })
};

export const setLiveBtcData = (res) => dispatch => {
    dispatch({ type: ASSET_LIVE_BTC_DATA, payload:res })
};

export const setLivePercentData = (res) => dispatch => {
    dispatch({ type: ASSET_LIVE_PERCENT_DATA, payload:res })
};

export const resetLiveData = () => dispatch => {
    dispatch({ type: RESET_LIVE_DATA })
};

