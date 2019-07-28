import React, { Component } from 'react';
import '../App.css';
import asset from "../Images/btc.svg";

class AssetDetails extends Component {
    constructor(props){
        super(props);

    }

    render() {
        return (
            <div className="asset--details--container">
                <div className="asset--details--inner--container">
                    <div className="asset--blue--line"/>
                    <div className="asset--details--content">
                        <div className="asset--details--image--name--container">
                            <img alt="asset" className="asset--details--image" src={asset} />
                            <p className="asset--name">Bitcoin</p>
                        </div>
                        <div>
                            <p className="asset--detail--header">Market Cap</p>
                            <p>$136,981,982,734 USD</p>
                            <p>17,744,187 BTC </p>
                        </div>
                        <div>
                            <p className="asset--detail--header">Volume (24h)</p>
                            <p>$19,062,833,481 USD </p>
                            <p>2,477,969 BTC</p>
                        </div>
                        <div>
                            <p className="asset--detail--header">Circulating Supply</p>
                            <p>106,379,476 ETH</p>
                        </div>
                        <div>
                            <p className="asset--detail--header">Rank</p>
                            <p>31 / 2221</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AssetDetails;
