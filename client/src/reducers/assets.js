import {GET_ALL_ASSETS, ALL_ASSETS_ERROR,SINGLE_ASSET_ERROR,GET_SINGLE_ASSET_DATA} from "../actions/types";


const initialState = {
    allAssets:null,
    loading:true,
    singleAssetData:null,
    singleAssetLoading:true
};


export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ALL_ASSETS:
            return{
                ...state,
                allAssets:action.payload,
                loading:false
            };
        case ALL_ASSETS_ERROR:
            return{
                ...state,
                allAssets:null,
                loading:false
            };
        case GET_SINGLE_ASSET_DATA:
            return{
                ...state,
                singleAssetData:action.payload,
                singleAssetLoading:false
            };
        case SINGLE_ASSET_ERROR:
            return{
                ...state,
                singleAssetData:null,
                singleAssetLoading:false
            };
        default:
            return state
    }
}