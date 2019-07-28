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
                    <p className="transaction--amount">05.10.2019 18:39</p>
                    <p className="transaction--value">Price: 0.00000278</p>
                    <p className="transaction--change">Amount: 1458</p>
                </div>
            </div>
        );
    }
}

export default Transaction;
