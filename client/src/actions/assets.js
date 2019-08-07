import {
    GET_ALL_ASSETS, ALL_ASSETS_ERROR, GET_SINGLE_ASSET_DATA, SINGLE_ASSET_ERROR, ADD_ASSET_TO_USER,
    ADD_ASSET_TO_USER_ERROR, ASSET_FETCHING, ASSET_LIVE_USD_DATA,ASSET_LIVE_BTC_DATA,ASSET_LIVE_PERCENT_DATA,RESET_LIVE_DATA,
    ADD_TRANSACTION_TO_USER,ADD_TRANSACTION_TO_USER_ERROR,ADD_NOTE_TO_USER,ADD_NOTE_TO_USER_ERROR,DELETE_TRANSACTION,GET_SINGLE_ASSET_DATA_FOR_STATE
} from "./types";
import axios from 'axios';
import {loadUser} from "./auth";


export const getAllAssets = (removeSymbols) => async dispatch => {

    try{
        const res = await axios.get('https://api.coingecko.com/api/v3/coins/list');
        const allAssets = res.data.filter((a) => !removeSymbols.includes(a.symbol)   );

        dispatch({
            type: GET_ALL_ASSETS,
            payload: allAssets
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

export const getSingleAssetDataForState = (id) => async dispatch => {
    try {
        const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`);

        dispatch({
            type: GET_SINGLE_ASSET_DATA_FOR_STATE,
            payload: res.data
        });
    } catch (err) {

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

// add transaction to user asset
export const addTransactionToUserAsset = ({ id,purchasedPrice,purchasedAmount,purchasedPriceUsd }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ id,purchasedPrice,purchasedAmount,purchasedPriceUsd });

    try{
        const res = await axios.post("/api/asset/transaction", body, config);
        dispatch({
            type: ADD_TRANSACTION_TO_USER,
            payload: res.data
        });

    } catch (err){
        const errors = err.response.errors;
        if(errors) {
            errors.forEach(error => console.log(error.msg))
        }

        dispatch({
            type: ADD_TRANSACTION_TO_USER_ERROR
        });
    }
};

// add note to user Asset
export const addNoteToUserAsset = ({ id,note }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ id,note });

    try{
        const res = await axios.post("/api/asset/note", body, config);
        dispatch({
            type: ADD_NOTE_TO_USER,
            payload: res.data
        });

    } catch (err){
        const errors = err.response.errors;
        if(errors) {
            errors.forEach(error => console.log(error.msg))
        }

        dispatch({
            type: ADD_NOTE_TO_USER_ERROR
        });
    }
};


// delete Transaction from User
export const deleteTransaction = ({ assetId,transactionId }) => async dispatch => {
    try{
        const res = await axios.delete(`/api/asset/transaction`,{data:{assetId:assetId,transactionId:transactionId}})
        dispatch({
            type: DELETE_TRANSACTION,
            payload:res.data
        })
    }
    catch (err) {
        const errors = err.response.errors;
        if(errors) {
            errors.forEach(error => console.log(error.msg))
        }
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
