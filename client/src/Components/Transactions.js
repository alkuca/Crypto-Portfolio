import React, { useEffect,useState } from 'react';
import '../App.css';
import Transaction from "./Transaction";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

const Transactions = ({ toggleAddTransactionModal,userAssetData }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true)
    }, []);

    return (
        <div className="transactions--container">
            <div className="transactions--title--container">
                <p className="transactions--container--title">Transactions:</p>
                { userAssetData && userAssetData.length ?
                    <button className="add--transaction--button" onClick={toggleAddTransactionModal}>Add Transaction</button>
                :null}
            </div>
            <div className="asset--blue--line"/>
            <div className="transactions--content">
                <TransitionGroup>
                { userAssetData && userAssetData.length ?
                    userAssetData[0].transactions.map( transaction => {
                       return <CSSTransition
                            key={transaction._id}
                            timeout={300}
                            classNames="fade">
                            <Transaction key={transaction._id} _id={transaction._id} priceUsd={transaction.purchasedPriceUsd} date={transaction.purchasedDate} price={transaction.purchasedPrice} amount={transaction.purchasedAmount}/>
                        </CSSTransition>
                    })
                    : null}
                </TransitionGroup>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({

});

export default withRouter(connect(mapStateToProps, {  })(Transactions));
