import React, { Component } from 'react';
import '../App.css';

class Transaction extends Component {
    constructor(props){
        super(props);

    }

    render() {
        return (
            <div className="transaction">
                <div className="transaction--content">
                    <p className="transaction--amount">05.10.2018 18:39</p>
                    <p className="transaction--value">Price: 4859.82 USD</p>
                    <p className="transaction--change">Amount: 2.5790567467 BTC</p>
                </div>
            </div>
        );
    }
}

export default Transaction;
