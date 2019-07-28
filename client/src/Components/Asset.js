import React, { useState,useEffect,useMemo } from 'react';
import '../App.css';
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import axios from 'axios';
import logoLoader from "../Images/logoLoaderGif.gif";
import classnames from "classnames";
import {setLiveUsdData,setLiveBtcData,setLivePercentData} from "../actions/assets";


const Asset = ({ auth,image,name,amount,id,setLiveUsdData,setLiveBtcData,setLivePercentData}) => {

    const [assets, setAssets] = useState();



    {/* replace with redux action */}
   const getLiveAssetData = (id) => {
        axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)
            .then(res => {
                setAssets(res.data)
            })
    }

    const getLiveAssetDataEffect = () => {
      if(auth !== null){
          getLiveAssetData(id)
      }
    };


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
        let res =  assets.market_data.current_price.usd * amount;
        return res;
    };


    const getUsdValues  = () => {
        if(assets) {
            let res = amount * assets.market_data.current_price.usd
            setLiveUsdData(res)
        }
    };

    const getBtcValues  = () => {
        if(assets) {
            let res = amount * assets.market_data.current_price.btc
            setLiveBtcData(res)
        }
    };

    const getPercentageValues  = () => {
        if(assets) {
            let res = assets.market_data.price_change_percentage_24h
            setLivePercentData(res)
        }
    };



    useMemo(()=>{
        getUsdValues();
        getBtcValues();
        getPercentageValues();
    },[assets]);


    return (
        <Link to="/asset">
            <div className="asset">
                <div className="asset--blue--line"/>
                <div className="asset--content">
                    <div className="asset--image--name--container">
                        <img alt="asset" className="asset--image" src={image}  />
                        <p className="asset--name">{name}</p>
                    </div>
                    <p className="asset--amount">{amount}</p>
                    <p className="asset--value">{ assets ? multiplyUsdPriceWithAmount().toFixed(2) + " $"
                        :
                        <img className="home--page--asset--loader" src={logoLoader} alt="loader"/>}</p>
                    <p className={classnames("asset--change", {
                        "makeRed":  checkIfNegative()
                    })}>
                        {
                            assets ?
                                assets.market_data.price_change_percentage_24h.toFixed(2) + " %"
                                :
                                <img className="home--page--asset--loader" src={logoLoader} alt="loader"/>
                        }
                    </p>
                </div>
            </div>
        </Link>
    );
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, {setLiveUsdData,setLiveBtcData,setLivePercentData})(Asset);
