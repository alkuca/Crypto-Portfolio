import {GET_ALL_ASSETS, ALL_ASSETS_ERROR,SINGLE_ASSET_ERROR,GET_SINGLE_ASSET_DATA,ADD_ASSET_TO_USER,ADD_ASSET_TO_USER_ERROR} from "../actions/types";


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
        case ADD_ASSET_TO_USER:
            return{
                ...state,
                loading:false
            };
        case ADD_ASSET_TO_USER_ERROR:
            return{
                ...state,
                loading:false
            };
        default:
            return state
    }
}