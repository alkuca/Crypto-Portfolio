import React, { useState,useEffect,useMemo } from 'react';
import '../App.css';
import ValueBlock from "./ValueBlock";
import Asset from "./Asset";
import Navbar from "./Navbar";
import {connect} from "react-redux";
import {loadUser} from "../actions/auth";
import logoLoader from "../Images/logoLoaderGif.gif";
import {resetLiveData} from "../actions/assets";
import classnames from "classnames";



const Home = ({ auth,loadUser,assetLiveUsdData,assetLiveBtcData,assetLivePercentData,resetLiveData}) => {

    const [totalUsdValue, setTotalUsdValue] = useState();
    const [totalBtcValue, setTotalBtcValue] = useState();
    const [totalPercentValue, setTotalPercentValue] = useState();


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

    const calculateTotalPercentValue = () => {
        if(assetLivePercentData){
            let averagePercent = arrSum(assetLivePercentData);
            setTotalPercentValue(averagePercent)
        }
    };

    const checkIfNegative = () => {
        if(totalPercentValue){
            if(totalPercentValue < 0){
                return true
            }
        }
    };



    useEffect(() => {
        loadUser();
        resetLiveData();
    }, []);


    useMemo(()=>{
        calculateTotalUsdValue();
        calculateTotalPercentValue();
        calculateTotalBtcValue();
    },[assetLiveUsdData]);



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
                            <p className="value--block--value--type">Daily Change (wrong)</p>
                            <p className={classnames("value--block--value makeGreen", {
                                "makeRed": checkIfNegative()
                            })}>{totalPercentValue ? totalPercentValue.toFixed(2)+ " %"
                                :
                                "0.00 %"}</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="assets--container">
                <div className="assets--inner--container">
                    {auth.user !== null ? null :<img className="home--page--asset--container--loader" src={logoLoader} alt="loader"/>}
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

export default connect(mapStateToProps, {loadUser,resetLiveData})(Home);

