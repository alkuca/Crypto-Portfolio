import React, { useState,useEffect,useMemo } from 'react';
import '../App.css';
import ValueBlock from "./ValueBlock";
import Navbar from "./Navbar";
import AssetDetails from "./AssetDetails";
import TradingViewWidget, { Themes } from 'react-tradingview-widget';
import Transactions from "./Transactions";
import Notes from "./Notes";
import AddTransactionModal from "./AddTransactionModal";
import AddNoteModal from "./AddNoteModal";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {getSingleAssetData} from "../actions/assets";
import {loadUser} from "../actions/auth";
import AssetMoreDetails from "./AssetMoreDetails";


const AssetPage = ({ auth, singleAssetData ,match,getSingleAssetData,transactionsUpdated,loadUser,notesUpdated}) => {

    const [transactionModal, toggleTransactionModal] = useState(false);
    const [noteModal, toggleNoteModal] = useState(false);
    const [userAssetData, setUserAssetData] = useState();
    const [usdValue, setUsdValue] = useState("");
    const [btcValue, setBtcValue] = useState("");
    const [percentValueNow, setPercentValueNow] = useState("");

    const [toggleValueBlockUsd, setToggleValueBlockUsd] = useState(false);
    const [toggleValueBlockBtc, setToggleValueBlockBtc] = useState(false);
    const [toggleValueBlockPercent, setToggleValueBlockPercent] = useState(false);
    const [totalUsdValue24hAgo, setTotalUsdValue24hAgo] = useState("");
    const [totalBtcValue24hAgo, setTotalBtcValue24hAgo] = useState("");
    const [dailyPercentChange,setDailyPercentChange] = useState("");

    const arrSum = arr => arr.reduce((a,b) => a + b, 0);

    const toggleAddTransactionModal = () => {
        toggleTransactionModal(!transactionModal)
    };

    const toggleAddNoteModal = () =>  {
        toggleNoteModal(!noteModal)
    };


    const findCurrentAssetUserData = () => {
        if(auth.user) {
            let res = auth.user.assets.filter(x => x.id === match.params.asset_id);
            setUserAssetData(res)
        }
    };

    const calculateTotalUsdValue = () => {
        if(userAssetData && singleAssetData && auth.user) {
            let res = userAssetData[0].transactions.map(transaction => transaction.purchasedAmount * singleAssetData.market_data.current_price.usd);
            let resSum = arrSum(res);
            setUsdValue(resSum.toFixed(2))
        }
    };

    const calculateTotalUsdValue24hAgo = () => {
        if(userAssetData && singleAssetData && auth.user){
            let res = userAssetData[0].transactions.map(transaction => transaction.purchasedAmount * singleAssetData.market_data.price_change_24h_in_currency.usd);
            let res2 = arrSum(res);
            setTotalUsdValue24hAgo(res2.toFixed(2))
        }
    };


    const calculateTotalBtcValue = () => {
        if( auth.user && singleAssetData) {
            if(userAssetData && userAssetData[0].transactions && userAssetData[0].transactions.length){
                let res =  userAssetData[0].transactions.map(transaction => transaction.purchasedAmount * singleAssetData.market_data.current_price.btc)
                let resSum = arrSum(res);
                setBtcValue(resSum)
            }
        }
    };

    const calculateTotalBtcValue24hAgo = () => {
        if(userAssetData && singleAssetData && auth.user){
            let res = userAssetData[0].transactions.map(transaction => transaction.purchasedAmount * ( singleAssetData.market_data.current_price.btc - singleAssetData.market_data.price_change_24h_in_currency.btc));
            let res2 = arrSum(res);
            setTotalBtcValue24hAgo(res2.toFixed(8))
        }
    };

    const calculateTotalPercentChange = () => {
        if(userAssetData && auth.user && singleAssetData) {
            if(userAssetData[0].id === "bitcoin"){
                let valueOnPurchasedDayArray = userAssetData[0].transactions.map(transaction => transaction.purchasedAmount * transaction.purchasedPriceUsd);
                let valueOnPurchasedDayArraySum = arrSum(valueOnPurchasedDayArray);

                let valueNowArray = userAssetData[0].transactions.map(transaction => transaction.purchasedAmount * singleAssetData.market_data.current_price.usd);
                let valueNowArraySum = arrSum(valueNowArray);

                let difference = valueNowArraySum -  valueOnPurchasedDayArraySum;
                let res = (difference / valueOnPurchasedDayArraySum ) * 100;
                setPercentValueNow(res.toFixed(2))
            }else{
                let valueOnPurchasedDayArray = userAssetData[0].transactions.map(transaction => transaction.purchasedAmount * transaction.purchasedPrice);
                let valueOnPurchasedDayArraySum = arrSum(valueOnPurchasedDayArray);

                let valueNowArray = userAssetData[0].transactions.map(transaction => transaction.purchasedAmount * singleAssetData.market_data.current_price.btc);
                let valueNowArraySum = arrSum(valueNowArray);

                let difference = valueNowArraySum -  valueOnPurchasedDayArraySum;
                let res = (difference / valueOnPurchasedDayArraySum ) * 100;
                setPercentValueNow(res.toFixed(2))
            }
        }
    };

    const calculateTotalPercentChange24h = () => {
        if(btcValue && totalBtcValue24hAgo) {
            if(userAssetData[0].id === "bitcoin"){
                let usdValue24hAgo = userAssetData[0].transactions.map(transaction => transaction.purchasedAmount * ( singleAssetData.market_data.current_price.usd - singleAssetData.market_data.price_change_24h_in_currency.usd));
                let value24hAgo = arrSum(usdValue24hAgo);

                let usdValueNow =  userAssetData[0].transactions.map(transaction => transaction.purchasedAmount * singleAssetData.market_data.current_price.usd)
                let valueNow = arrSum(usdValueNow);

                let difference = valueNow - value24hAgo;
                let res = (difference / value24hAgo ) * 100;
                setDailyPercentChange(res.toFixed(2));

            }else{
                let value24hAgo = totalBtcValue24hAgo;
                let valueNow = btcValue;
                let difference = valueNow - value24hAgo;
                let res = (difference / value24hAgo ) * 100;
                setDailyPercentChange(res.toFixed(2));
            }
        }
    };


    const toggleUsdValues = () =>{
        setToggleValueBlockUsd(!toggleValueBlockUsd)
    };

    const toggleBtcValues = () =>{
        setToggleValueBlockBtc(!toggleValueBlockBtc)
    };

    const togglePercentValues = () =>{
        setToggleValueBlockPercent(!toggleValueBlockPercent)
    };


    useEffect(() => {
        findCurrentAssetUserData();
    }, [auth.user]);

    useEffect(() => {
        loadUser();
    }, [transactionsUpdated,notesUpdated]);

    useEffect(() => {
        getSingleAssetData(match.params.asset_id);
    }, []);


    useMemo(() => {
        if(userAssetData && userAssetData.length){
            calculateTotalBtcValue();
            calculateTotalUsdValue();
            calculateTotalPercentChange();
            calculateTotalUsdValue24hAgo();
            calculateTotalBtcValue24hAgo();
        }
    }, [singleAssetData,userAssetData]);

    useMemo(() => {
        calculateTotalPercentChange24h();
    },[totalBtcValue24hAgo]);

        return (
            <div>
                <Navbar/>
                <div className="asset--page">
                    {transactionModal ? <AddTransactionModal userAssetData={userAssetData} toggleAddTransactionModal={toggleAddTransactionModal}/> : null}
                    {noteModal ? <AddNoteModal userAssetData={userAssetData} toggleAddNoteModal={toggleAddNoteModal}/> : null}
                    <AssetDetails/>
                    <div className="block--container">
                        <div className="block--container--content">
                            { toggleValueBlockUsd ?
                                <ValueBlock toggle={toggleUsdValues} toggleValueBlockUsd={toggleValueBlockUsd} dollar={true}
                                            type="USD Value"
                                            value={usdValue ? usdValue : "0.00"}/>
                                :
                                <ValueBlock toggle={toggleUsdValues} toggleValueBlockUsd={toggleValueBlockUsd} dollar={true}
                                            type="Daily Change (USD)"
                                            value={totalUsdValue24hAgo ? totalUsdValue24hAgo : "0.00 $"}/>
                            }
                            { !toggleValueBlockBtc ?
                                <ValueBlock toggle={toggleBtcValues} toggleValueBlockBtc={toggleValueBlockBtc} noColor={true}
                                            type="Bitcoin Value (BTC)"
                                            value={btcValue ? btcValue.toFixed(8) : "0.00000000"}/>
                                :
                                <ValueBlock toggle={toggleBtcValues} toggleValueBlockBtc={toggleValueBlockBtc}
                                            type="Daily Change (BTC)"
                                            value={totalBtcValue24hAgo ? (btcValue - totalBtcValue24hAgo).toFixed(8) : "0.00000000"}/>
                            }
                            { !toggleValueBlockPercent ?
                                <ValueBlock toggle={togglePercentValues} toggleValueBlockPercent={toggleValueBlockPercent} alwaysColored={true}
                                            type="Daily Change (BTC)"
                                            value={dailyPercentChange ? dailyPercentChange : "0.00"}/>
                                :
                                <ValueBlock toggle={togglePercentValues} toggleValueBlockPercent={toggleValueBlockPercent} alwaysColored={true}
                                            type="Total Change (BTC)"
                                            value={percentValueNow ? percentValueNow : "0.00"}/>
                            }
                        </div>
                    </div>
                    <div className="graph--container">
                        <div className="graph--inner--container">
                            <div className="graph--content">
                                { singleAssetData ?
                                    <TradingViewWidget interval={auth.candleDuration} theme={auth.theme === "DARK" ? Themes.DARK : Themes.LIGHT}
                                                       symbol={singleAssetData.id === "bitcoin" ? singleAssetData.symbol + "USD" : singleAssetData.symbol + "BTC"}
                                    />
                                :null}
                            </div>
                        </div>
                    </div>
                    <div className="transactions--and--notes--container">
                        <div className="transactions--and--notes--inner--container">
                            <div className="transactions--and--notes--content">
                                <Transactions userAssetData={userAssetData} toggleAddTransactionModal={toggleAddTransactionModal} />
                                <Notes userAssetData={userAssetData} toggleAddNoteModal={toggleAddNoteModal} />
                            </div>
                        </div>
                    </div>
                    <AssetMoreDetails/>
                </div>
            </div>
        )
    };


const mapStateToProps = state => ({
    auth: state.auth,
    transactionsUpdated:state.assets.transactions,
    notesUpdated:state.assets.notes,
    singleAssetData: state.assets.singleAssetData
});

export default withRouter(connect(mapStateToProps, { getSingleAssetData,loadUser })(AssetPage));


