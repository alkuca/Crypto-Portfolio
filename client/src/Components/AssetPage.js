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

const AssetPage = ({ auth, singleAssetData ,match,getSingleAssetData}) => {

    const [transactionModal, toggleTransactionModal] = useState(false);
    const [noteModal, toggleNoteModal] = useState(false);
    const [userAssetData, setUserAssetData] = useState();
    const [usdValue, setUsdValue] = useState("");
    const [btcValue, setBtcValue] = useState("");
    const [percentValueNow, setPercentValueNow] = useState("");


    const toggleAddTransactionModal = () => {
        toggleTransactionModal(!transactionModal)
    };

    const toggleAddNoteModal = () =>  {
        toggleNoteModal(!noteModal)
    };

    const checkIfNegative = () => {
        if(percentValueNow < 0){
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
        if(userAssetData && singleAssetData && auth.user) {
            let res = userAssetData[0].purchasedAmount * singleAssetData.market_data.current_price.usd;
            setUsdValue(res.toFixed(2))
        }
    };

    const calculateTotalBtcValue = () => {
        if(userAssetData && auth.user && singleAssetData) {
            let res =  userAssetData[0].purchasedAmount * singleAssetData.market_data.current_price.btc;
            setBtcValue(res.toFixed(8))
        }
    };

    const calculateTotalPercentChange = () => {
        if(userAssetData && auth.user && singleAssetData) {
            let valueOnPurchasedDay = userAssetData[0].purchasedAmount * userAssetData[0].purchasedPrice;
            let valueNow = userAssetData[0].purchasedAmount * singleAssetData.market_data.current_price.btc
            let difference = valueNow -  valueOnPurchasedDay;
            let res = (difference / valueOnPurchasedDay ) * 100;
            setPercentValueNow(res.toFixed(2))
        }
    };


    useEffect(() => {
        findCurrentAssetUserData();
    }, [auth.user]);

    useEffect(() => {
        getSingleAssetData(match.params.asset_id);
    }, []);


    useMemo(() => {
        calculateTotalBtcValue();
        calculateTotalUsdValue();
        calculateTotalPercentChange();
    }, [singleAssetData,userAssetData]);

        return (
            <div>
                <Navbar/>
                <div className="asset--page">
                    {transactionModal ? <AddTransactionModal toggleAddTransactionModal={toggleAddTransactionModal}/> : null}
                    {noteModal ? <AddNoteModal toggleAddNoteModal={toggleAddNoteModal}/> : null}
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
                                <Transactions addTransactionModalToggled={transactionModal} toggleAddTransactionModal={toggleAddTransactionModal} />
                                <Notes addNoteModalToggled={noteModal} toggleAddNoteModal={toggleAddNoteModal} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };


const mapStateToProps = state => ({
    auth: state.auth,
    singleAssetData: state.assets.singleAssetData
});

export default withRouter(connect(mapStateToProps, { getSingleAssetData })(AssetPage));


