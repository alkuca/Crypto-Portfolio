import React, { Component } from 'react';
import '../App.css';
import Transaction from "./Transaction";

class Transactions extends Component {
    constructor(props){
        super(props);

    }

    render() {
        return (
            <div className="transactions--container">
                <div className="transactions--title--container">
                    <p className="transactions--container--title">Transactions:</p>
                    <button className="add--transaction--button" onClick={this.props.toggleAddTransactionModal}>Add Transaction</button>
                </div>
                <div className="asset--blue--line"/>
                <div className="transactions--content">
                    <Transaction/>
                    <Transaction/>
                    <Transaction/>
                </div>
            </div>
        );
    }
}

export default Transactions;
