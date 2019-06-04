import React, { Component } from 'react';
import '../App.css';
import asset from "../Images/btc.svg";

class Asset extends Component {
    constructor(props){
        super(props);

    }

    render() {
        return (
            <div className="asset">
                <div className="asset--blue--line"/>
                <div className="asset--content">
                    <div className="asset--image--name--container">
                        <img alt="asset" className="asset--image" src={asset} />
                        <p className="asset--name">Bitcoin</p>
                    </div>
                    <p className="asset--amount">3.424532345</p>
                    <p className="asset--value">12 234.32 $</p>
                    <p className="asset--change">7.51 %</p>
                </div>
            </div>
        );
    }
}

export default Asset;
