import React, { useState,useEffect,useMemo } from 'react';
import '../App.css';
import ValueBlock from "./ValueBlock";
import Asset from "./Asset";
import Navbar from "./Navbar";
import {connect} from "react-redux";
import {loadUser} from "../actions/auth";
import logoLoader from "../Images/logoLoaderGif.gif";
import logoLoaderWhite from "../Images/loaderLogoWhite.gif";
import {resetLiveData} from "../actions/assets";
import classnames from "classnames";
import {withRouter} from "react-router-dom";



const Home = ({ auth,loadUser,assetLiveUsdData,assetLiveBtcData,assetLivePercentData,resetLiveData}) => {

    const [totalUsdValue, setTotalUsdValue] = useState("");
    const [totalBtcValue, setTotalBtcValue] = useState("");
    const [totalPercentValue, setTotalPercentValue] = useState("");
    const [btcValue, setBtcValue] = useState("");


    const arrSum = arr => arr.reduce((a,b) => a + b, 0);

    const calculateTotalUsdValue = () => {
        if(assetLiveUsdData){
            let sumUsd = arrSum(assetLiveUsdData);
            setTotalUsdValue(sumUsd)
        }
    };

    const calculateTotalBtcValue = () => {
        if(assetLiveBtcData){
            let sumBtc = arrSum(assetLiveBtcData);
            setTotalBtcValue(sumBtc)
        }
    };

    const calculateTotalPercentChange = () => {
        if(btcValue && totalBtcValue) {
            let valueOnPurchasedDay = btcValue;
            let valueNow = totalBtcValue;
            let difference =  valueNow - valueOnPurchasedDay;
            let res = (difference / valueOnPurchasedDay ) * 100;
            setTotalPercentValue(res.toFixed(2))
        }
    };

    const checkIfNegative = () => {
        if(totalPercentValue){
            if(totalPercentValue < 0){
                return true
            }
        }
    };

    const calculateAllBtcValuesOnPurchasedDay = () => {
        if(auth.user) {
            let valuesOnPurchasedDay = auth.user.assets.map(asset => asset.purchasedAmount * asset.purchasedPrice);
            let sumValues = arrSum(valuesOnPurchasedDay);
            setBtcValue(sumValues);
        }
    };

    useEffect(() => {
        loadUser();
        resetLiveData();
    }, []);

    useMemo(()=>{
        calculateTotalUsdValue();
        calculateTotalBtcValue();
        calculateAllBtcValuesOnPurchasedDay();
    },[assetLiveUsdData]);

    useMemo(() => {
        calculateTotalPercentChange();
    },[totalBtcValue]);


    return (
        <div>
            <Navbar/>
            <div className="block--container">
                <div className="block--container--content">
                    <ValueBlock type="USD" value={totalUsdValue ? totalUsdValue.toFixed(2) + " $"
                        :
                        "0.00 $"}/>
                    <ValueBlock type="Bitcoin (BTC)" value={totalBtcValue ? totalBtcValue.toFixed(8)
                        :
                        "0.00000000"}/>
                    <div className="value--block">
                        <div className="blue--line"/>
                        <div className="value--block-content">
                            <p className="value--block--value--type">Total Change (BTC)</p>
                            <p className={classnames("value--block--value makeGreen", {
                                "makeRed": checkIfNegative()
                            })}>{totalPercentValue ? totalPercentValue + " %"
                                :
                                "0.00 %"}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="assets--container">
                <div className="assets--inner--container">
                    {auth.user !== null ? null :<img className="home--page--asset--container--loader" src={auth.theme === "LIGHT" ? logoLoader : logoLoaderWhite} alt="loader"/>}
                    <div className="asset--container">
                        { auth.user !== null ?
                            auth.user.assets.map(function(asset) {
                                return <Asset key={asset._id} name={asset.name} amount={asset.purchasedAmount} image={asset.image} id={asset.id}/>
                            })
                            : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    loading: state.auth.loading,
    auth: state.auth,
    assetLiveUsdData:state.assets.assetLiveUsdData,
    assetLiveBtcData:state.assets.assetLiveBtcData,
    assetLivePercentData:state.assets.assetLivePercentData
});

export default withRouter(connect(mapStateToProps, {loadUser,resetLiveData})(Home));

