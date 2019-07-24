import {GET_ALL_ASSETS,ALL_ASSETS_ERROR,GET_SINGLE_ASSET_DATA,SINGLE_ASSET_ERROR} from "./types";
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
export const addAsset = (id,name,) => async dispatch => {
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