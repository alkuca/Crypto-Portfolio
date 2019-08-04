import React, {  } from 'react';
import '../App.css';
import Transaction from "./Transaction";
import {connect} from "react-redux";




const Transactions = ({ toggleAddTransactionModal,userAssetData }) => {

    return (
        <div className="transactions--container">
            <div className="transactions--title--container">
                <p className="transactions--container--title">Transactions:</p>
                <button className="add--transaction--button" onClick={toggleAddTransactionModal}>Add Transaction</button>
            </div>
            <div className="asset--blue--line"/>
            <div className="transactions--content">
                { userAssetData ?
                    userAssetData[0].transactions.map( transaction => {
                        return <Transaction key={transaction._id} date={transaction.purchasedDate} price={transaction.purchasedPrice} amount={transaction.purchasedAmount}/>
                    })
                    : null}
            </div>
        </div>
    );
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, {  })(Transactions);
