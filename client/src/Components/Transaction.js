import React, { useState,useMemo,useEffect } from 'react';
import '../App.css';
import {connect} from "react-redux";
import Moment from 'react-moment';
import {deleteTransaction,resetLiveData} from "../actions/assets";
import classnames from "classnames";
import {loadUser} from "../actions/auth";
import { Redirect,withRouter } from 'react-router-dom';


const Transaction = ({ date,amount,price,priceUsd,singleAssetData,_id,deleteTransaction,loadUser,auth}) => {

    const [toggleTransaction, setToggleTransaction] = useState(false);
    const [percentChange, setPercentChange] = useState("");

    const handleToggle = () => {
        setToggleTransaction(!toggleTransaction)
    };

    const calculateUsdPaid = () => {
        return amount * priceUsd;
    };

    const calculateBtcPaid = () => {
        return amount * price;

    };

    const calculateChange = () => {
        if(singleAssetData){
            let priceNow = singleAssetData.market_data.current_price.btc;
            let valueOnPurchasedDay = price;
            let difference =  priceNow - valueOnPurchasedDay;

            let res = (difference / valueOnPurchasedDay ) * 100;
            setPercentChange(res.toFixed(2))
        }
    };

    const checkIfNegative = () => {
        if(percentChange){
            if(percentChange < 0){
                return true
            }
        }
    };

     const handleDeleteTransaction = async () => {
        if(singleAssetData){
            const data = {
                assetId: singleAssetData.id,
                transactionId: _id
            };
            await deleteTransaction(data);
            await loadUser();
        }
    };




    useMemo(() => {
        calculateChange();
    },[singleAssetData]);


    return (
            <div className={classnames("transaction", {
                "transaction--toggled" : toggleTransaction,
                "disable--hover": toggleTransaction
            })}>
                <div onClick={handleToggle} className="transaction--content">
                    <p className="transaction--amount"><Moment format="DD.MM.YYYY HH:mm">{date}</Moment></p>
                    <p className="transaction--value">Price: {price}</p>
                    <p className="transaction--change">Amount: {amount}</p>
                </div>
                <div className={classnames("transaction--content--dropdown", {
                    "make--visible" : toggleTransaction
                })}>
                    <div  className="transaction--content--dropdown--content">
                        <div onClick={handleToggle} className="transaction--content">
                            <p className="transaction--amount--paid">BTC Paid: {calculateBtcPaid().toFixed(8)}</p>
                            <p className="transaction--amount--paid">USD Paid: {calculateUsdPaid().toFixed(2)} $</p>
                            <p className={classnames("transaction--change makeGreen", {
                                "makeRed": checkIfNegative()
                            })}>{percentChange ? percentChange + " %"
                                :
                                "0.00 %"}</p>
                        </div>
                        <div className="transaction--content--dropdown--content--buttons--container">
                            <button onClick={handleDeleteTransaction} className="delete--transaction--button">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };


const mapStateToProps = state => ({
    auth:state.auth,
    singleAssetData: state.assets.singleAssetData,
});

export default  withRouter(connect(mapStateToProps,{ deleteTransaction,loadUser })(Transaction));
