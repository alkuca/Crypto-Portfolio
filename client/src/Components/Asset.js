import React, { useState,useEffect,useMemo } from 'react';
import '../App.css';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import axios from 'axios';
import {withRouter} from "react-router-dom";
import logoLoader from "../Images/logoLoaderGif.gif";
import logoLoaderWhite from "../Images/loaderLogoWhite.gif";
import classnames from "classnames";
import {
    setLiveUsdData,
    setLiveBtcData,
    setLivePercentData,
    getSingleAssetDataForState,
    resetLiveData
} from "../actions/assets";


const Asset = ({ auth,image,name,amount,id,setLiveUsdData,resetLiveData,setLiveBtcData,setLivePercentData,getSingleAssetDataForState,userAssets,transactionDeleted}) => {

    const [assets, setAssets] = useState("");


    {/* replace all with redux action and state */}
   const getLiveAssetData = (id) => {
        axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
            .then(res => {
                setAssets(res.data)
            })
    }

    const get = (id) => {
        getSingleAssetDataForState(id)
    };


    const getLiveAssetDataEffect = () => {
      if(auth !== null){
          getLiveAssetData(id)
      }
    };

    const getEffect = () => {
        if(auth !== null){
            get(id)
        }
    };

    useEffect(() => {
        getEffect()
    }, []);

    useEffect(() => {
        getLiveAssetDataEffect()
    }, []);


    const checkIfNegative = () => {
        if(assets){
            let asset = assets.market_data.price_change_percentage_24h;
            if(asset < 0){
                return true
            }
        }
    };

    const multiplyUsdPriceWithAmount = () => {

        return assets.market_data.current_price.usd * amount;
    };


    const getUsdValues  = () => {
        if(assets ) {
            let res = amount * assets.market_data.current_price.usd;
            setLiveUsdData(res)
        }
    };

    const getBtcValues  = () => {
        if(assets) {
            let res = amount * assets.market_data.current_price.btc;
            setLiveBtcData(res)
        }
    };

    const getPercentageValues  = () => {
        if(assets ) {
            let res = assets.market_data.price_change_percentage_24h;
            setLivePercentData(res)
        }
    };



    useMemo(()=>{
        getUsdValues();
        getBtcValues();
        getPercentageValues();
    },[assets]);


    useEffect(() => {
        if(auth.autoRefresh) {
            const interval = setInterval(() => {
                resetLiveData();
                getLiveAssetData(id)
            }, 180000);
            return () => clearInterval(interval);
        }
    }, []);


    return (
        <Link to={`/asset/`+id}>
            <div className="asset">
                <div className="asset--blue--line"/>
                <div className="asset--content">
                    <div className="asset--image--name--container">
                        <img alt="asset" className="asset--image" src={image}/>
                        <p className="asset--name">{name}</p>
                    </div>
                    <p className="asset--amount">{amount}</p>
                    <p className="asset--value">{ assets ? multiplyUsdPriceWithAmount().toFixed(2) + " $"
                        :
                        <img className="home--page--asset--loader" src={auth.theme === "LIGHT" ? logoLoader : logoLoaderWhite} alt="loader"/>}</p>
                    <p className={classnames("asset--change", {
                        "makeRed":  checkIfNegative()
                    })}>
                        {
                            assets ?
                                assets.market_data.price_change_percentage_24h.toFixed(2) + " %"
                                :
                                <img className="home--page--asset--loader" src={auth.theme === "LIGHT" ? logoLoader : logoLoaderWhite} alt="loader"/>
                        }
                    </p>
                </div>
            </div>
        </Link>
    );
};

const mapStateToProps = state => ({
    auth: state.auth,
    userAssets: state.assets.userAssets,
    transactionDeleted: state.auth.lastTransactionDeleted,
});

export default withRouter(connect(mapStateToProps, {resetLiveData,setLiveUsdData,setLiveBtcData,setLivePercentData,getSingleAssetDataForState})(Asset));
