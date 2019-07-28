import {GET_ALL_ASSETS, ALL_ASSETS_ERROR,SINGLE_ASSET_ERROR,GET_SINGLE_ASSET_DATA,ADD_ASSET_TO_USER,ADD_ASSET_TO_USER_ERROR,
    ASSET_FETCHING,ASSET_LIVE_USD_DATA,ASSET_LIVE_BTC_DATA,ASSET_LIVE_PERCENT_DATA,RESET_LIVE_DATA} from "../actions/types";


const initialState = {
    allAssets:null,
    loading:true,
    singleAssetData:null,
    singleAssetLoading:true,
    assetFetching:false,
    assetLiveBtcData:[],
    assetLiveUsdData:[],
    assetLivePercentData:[]
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
                singleAssetLoading:false,
                assetFetching:false
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
        case ASSET_FETCHING:
            return{
                ...state,
                assetFetching:true
            };
        case ASSET_LIVE_USD_DATA:
            return{
                ...state,
                assetLiveUsdData:[...state.assetLiveUsdData,action.payload]
            };
        case ASSET_LIVE_BTC_DATA:
            return{
                ...state,
                assetLiveBtcData:[...state.assetLiveBtcData,action.payload]
            };
        case ASSET_LIVE_PERCENT_DATA:
            return{
                ...state,
                assetLivePercentData:[...state.assetLivePercentData,action.payload]
            };
        case RESET_LIVE_DATA:
            return{
                ...state,
                assetLivePercentData:[],
                assetLiveBtcData:[],
                assetLiveUsdData:[]
            };
        default:
            return state
    }
}