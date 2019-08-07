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
import classnames from "classnames";
import {loadUser} from "../actions/auth";


const AssetPage = ({ auth, singleAssetData ,match,getSingleAssetData,transactionsUpdated,loadUser,notesUpdated}) => {

    const [transactionModal, toggleTransactionModal] = useState(false);
    const [openTransactionModal, toggleOpenTransactionModal] = useState(false);
    const [noteModal, toggleNoteModal] = useState(false);
    const [userAssetData, setUserAssetData] = useState();
    const [usdValue, setUsdValue] = useState("");
    const [btcValue, setBtcValue] = useState("");
    const [percentValueNow, setPercentValueNow] = useState("");

    const [mounted, setMounted] = useState(false);


    useEffect(() => {
        setMounted(true)
    }, []);


    const arrSum = arr => arr.reduce((a,b) => a + b, 0);

    const toggleAddTransactionModal = () => {
        toggleTransactionModal(!transactionModal)
    };

    const handleOpenTransactionModal = () => {
        toggleOpenTransactionModal(!openTransactionModal)
    };

    const toggleAddNoteModal = () =>  {
        toggleNoteModal(!noteModal)
    };

    const checkIfNegative = () => {
        if(percentValueNow < 0) {
            return true
        }
    };

    const findCurrentAssetUserData = () => {
        if(auth.user) {
            let res = auth.user.assets.filter(x => x.id === match.params.asset_id);
            setUserAssetData(res)
        }
    };

    const calculateTotalUsdValue = () => {
        if(userAssetData && singleAssetData && auth.user && mounted) {
            let res = userAssetData[0].transactions.map(transaction => transaction.purchasedAmount * singleAssetData.market_data.current_price.usd);
            let resSum = arrSum(res);
            setUsdValue(resSum.toFixed(2))
        }
    };

    const calculateTotalBtcValue = () => {
        if( auth.user && singleAssetData) {
            if(userAssetData && userAssetData[0].transactions && userAssetData[0].transactions.length && mounted){
                let res =  userAssetData[0].transactions.map(transaction => transaction.purchasedAmount * singleAssetData.market_data.current_price.btc)
                let resSum = arrSum(res);
                setBtcValue(resSum.toFixed(8))
            }
        }
    };

    const calculateTotalPercentChange = () => {
        if(userAssetData && auth.user && singleAssetData && mounted) {
            let valueOnPurchasedDayArray = userAssetData[0].transactions.map(transaction => transaction.purchasedAmount * transaction.purchasedPrice);
            let valueOnPurchasedDayArraySum = arrSum(valueOnPurchasedDayArray);

            let valueNowArray = userAssetData[0].transactions.map(transaction => transaction.purchasedAmount * singleAssetData.market_data.current_price.btc);
            let valueNowArraySum = arrSum(valueNowArray);

            let difference = valueNowArraySum -  valueOnPurchasedDayArraySum;
            let res = (difference / valueOnPurchasedDayArraySum ) * 100;
            setPercentValueNow(res.toFixed(2))
        }
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
        }
    }, [singleAssetData,userAssetData]);


        return (
            <div>
                <Navbar/>
                <div className="asset--page">
                    {transactionModal ? <AddTransactionModal userAssetData={userAssetData} toggleAddTransactionModal={toggleAddTransactionModal}/> : null}
                    {noteModal ? <AddNoteModal userAssetData={userAssetData} toggleAddNoteModal={toggleAddNoteModal}/> : null}
                    <AssetDetails/>
                    <div className="block--container">
                        <div className="block--container--content">
                            <ValueBlock type="USD Value" value={ usdValue && userAssetData ? usdValue + " $" : "0.00 $"}/>
                            <ValueBlock type="Bitcoin Value (btc)" value={ btcValue ? btcValue : "0.00000000"}/>
                            <div className="value--block">
                                <div className="blue--line"/>
                                <div className="value--block-content">
                                    <p className="value--block--value--type">Total Change (BTC)</p>
                                    <p className={classnames("value--block--value makeGreen", {
                                        "makeRed": checkIfNegative()
                                    })}>{percentValueNow ? percentValueNow + " %"
                                        :
                                        "0.00 %"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="graph--container">
                        <div className="graph--inner--container">
                            <div className="graph--content">
                                { singleAssetData ?
                                    <TradingViewWidget interval="240" theme={auth.theme === "DARK" ? Themes.DARK : Themes.LIGHT} symbol={singleAssetData.symbol + "BTC"}/>
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


