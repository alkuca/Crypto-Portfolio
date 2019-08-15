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
import {withRouter} from "react-router-dom";

const Home = ({ auth,loadUser,assetLiveUsdData,assetLiveBtcData,resetLiveData,assetLiveUsdData24hAgo,assetLiveBtcData24hAgo}) => {

    const [totalUsdValue, setTotalUsdValue] = useState("");
    const [totalBtcValue, setTotalBtcValue] = useState("");
    const [totalPercentValue, setTotalPercentValue] = useState("");
    const [btcValue, setBtcValue] = useState("");
    const [toggleValueBlockUsd, setToggleValueBlockUsd] = useState(false);
    const [toggleValueBlockBtc, setToggleValueBlockBtc] = useState(false);
    const [toggleValueBlockPercent, setToggleValueBlockPercent] = useState(false);
    const [totalUsdValue24hAgo, setTotalUsdValue24hAgo] = useState("");
    const [totalBtcValue24hAgo, setTotalBtcValue24hAgo] = useState("");
    const [dailyPercentChange,setDailyPercentChange] = useState("");


    const arrSum = arr => arr.reduce((a,b) => a + b, 0);

    const calculateTotalUsdValue = () => {
        if(assetLiveUsdData){
            let sumUsd = arrSum(assetLiveUsdData);
            setTotalUsdValue(sumUsd)
        }
    };

    const calculateTotalUsdValue24hAgo = () => {
        if(assetLiveUsdData24hAgo){
            let sumUsd = arrSum(assetLiveUsdData24hAgo);
            setTotalUsdValue24hAgo(sumUsd)
        }
    };

    const calculateTotalBtcValue = () => {
        if(assetLiveBtcData){
            let sumBtc = arrSum(assetLiveBtcData);
            setTotalBtcValue(sumBtc)
        }
    };

    const calculateTotalBtcValue24hAgo = () => {
        if(assetLiveBtcData24hAgo){
            let sumBtc = arrSum(assetLiveBtcData24hAgo);
            setTotalBtcValue24hAgo(sumBtc)
        }
    };


    const calculateTotalPercentChange = () => {
        if(btcValue && totalBtcValue ) {
            let valueOnPurchasedDay = btcValue;
            let valueNow = totalBtcValue;
            let difference =  valueNow - valueOnPurchasedDay;
            let res = (difference / valueOnPurchasedDay ) * 100;
            setTotalPercentValue(res.toFixed(2))
            console.log("now " + valueNow)
            console.log("purcDay " + valueOnPurchasedDay)
        }
    };

    const calculateTotalPercentChange24h = () => {
        if(totalBtcValue && totalBtcValue && totalBtcValue24hAgo ) {
            let value24hAgo = totalBtcValue24hAgo;
            let valueNow = totalBtcValue;
            let difference = valueNow - value24hAgo;
            let res = (difference / value24hAgo ) * 100;
            setDailyPercentChange(res.toFixed(2))
        }
    };


    const calculateAllUsdValuesOnPurchasedDay = () => {
        if(auth.user) {
            let r = auth.user.assets.reduce((acc, asset) => acc + asset.transactions.reduce((acc, tr) => acc + (+tr.purchasedPrice * +tr.purchasedAmount), 0), 0);

            let bitcoin = auth.user.assets.filter(asset => asset.id === "bitcoin");
            let bitcoinAmount;
            if(bitcoin && bitcoin.length){
                bitcoinAmount = bitcoin[0].transactions.reduce((acc,tr) => acc + (+tr.purchasedAmount), 0)
            }

            setBtcValue(r + bitcoinAmount);
        }
    };


    useEffect(() => {
        loadUser();
        resetLiveData();
    }, []);

    useMemo(()=>{
        calculateTotalUsdValue();
        calculateTotalBtcValue();
        calculateAllUsdValuesOnPurchasedDay();
        calculateTotalUsdValue24hAgo();
        calculateTotalBtcValue24hAgo();
    },[assetLiveUsdData]);


    useMemo(() => {
        calculateTotalPercentChange();
        calculateTotalPercentChange24h();
    },[totalBtcValue]);


    const toggleUsdValues = () =>{
        setToggleValueBlockUsd(!toggleValueBlockUsd)
    };

    const toggleBtcValues = () =>{
        setToggleValueBlockBtc(!toggleValueBlockBtc)
    };

    const togglePercentValues = () =>{
        setToggleValueBlockPercent(!toggleValueBlockPercent)
    };


    return (
        <div>
            <Navbar/>
            <div className="block--container">
                <div className="block--container--content">
                    { toggleValueBlockUsd ?
                        <ValueBlock toggle={toggleUsdValues} toggleValueBlockUsd={toggleValueBlockUsd} dollar={true}
                                    type="USD"
                                    value={totalUsdValue ? totalUsdValue.toFixed(2) : "0.00"}/>
                        :
                        <ValueBlock toggle={toggleUsdValues} toggleValueBlockUsd={toggleValueBlockUsd} dollar={true}
                                    type="Daily Change (USD)"
                                    value={totalUsdValue ? (totalUsdValue - totalUsdValue24hAgo).toFixed(2) : "0.00 $"}/>
                    }
                    { !toggleValueBlockBtc ?
                        <ValueBlock toggle={toggleBtcValues} toggleValueBlockBtc={toggleValueBlockBtc} noColor={true}
                                    type="Bitcoin (BTC)"
                                    value={totalBtcValue ? totalBtcValue.toFixed(8) : "0.00000000"}/>
                        :
                        <ValueBlock toggle={toggleBtcValues} toggleValueBlockBtc={toggleValueBlockBtc}
                                    type="Daily Change (BTC)"
                                    value={totalBtcValue ? (totalBtcValue - totalBtcValue24hAgo).toFixed(8) : "0.00000000"}/>
                    }
                    { !toggleValueBlockPercent ?
                        <ValueBlock toggle={togglePercentValues} toggleValueBlockPercent={toggleValueBlockPercent} alwaysColored={true}
                                    type="Daily Change (btc)"
                                    value={dailyPercentChange ? dailyPercentChange : "0.00"}/>
                        :
                        <ValueBlock toggle={togglePercentValues} toggleValueBlockPercent={toggleValueBlockPercent} alwaysColored={true}
                                    type="Total Change (btc)"
                                    value={totalPercentValue ? totalPercentValue : "0.00"}/>
                    }
                </div>
            </div>
            <div className="assets--container">
                <div className="assets--inner--container">
                    {auth.user !== null ? null :<img className="home--page--asset--container--loader" src={auth.theme === "LIGHT" ? logoLoader : logoLoaderWhite} alt="loader"/>}
                    <div className="asset--container">
                        { auth.user !== null && auth.user.assets.length ?
                            auth.user.assets.map( asset => {
                                return <Asset key={asset._id} name={asset.name} amount={asset.transactions.reduce((acc,val) => acc + +val.purchasedAmount ,0) } image={asset.image} id={asset.id}/>
                            })
                            : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    auth: state.auth,
    assetLiveUsdData:state.assets.assetLiveUsdData,
    assetLiveBtcData:state.assets.assetLiveBtcData,
    assetLivePercentData:state.assets.assetLivePercentData,
    assetLiveUsdData24hAgo:state.assets.assetLiveUsdData24hAgo,
    assetLiveBtcData24hAgo:state.assets.assetLiveBtcData24hAgo
});

export default withRouter(connect(mapStateToProps, {loadUser,resetLiveData})(Home));

