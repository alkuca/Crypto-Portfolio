import React, { Component } from 'react';
import '../App.css';
import ValueBlock from "./ValueBlock";
import Navbar from "./Navbar";
import AssetDetails from "./AssetDetails";
import TradingViewWidget from 'react-tradingview-widget';
import Transactions from "./Transactions";
import Notes from "./Notes";

class AssetPage extends Component {
    constructor(props){
        super(props);

    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="asset--page">
                    <AssetDetails/>
                    <div className="block--container">
                        <div className="block--container--content">
                            <ValueBlock type="USD" value="$ 12 342,21"/>
                            <ValueBlock type="Bitcoin (BTC)" value="3.41421456"/>
                            {/* replace next div block with ValeBlock Component */}
                            <div className="value--block">
                                <div className="blue--line"/>
                                <div className="value--block-content">
                                    <p className="value--block--value--type">Total Change (BTC)</p>
                                    <p className="value--block--value makeGreen">68.34 %</p>
                                </div>
                            </div>
                            {/* end here */}
                        </div>
                    </div>
                    <div className="graph--container">
                        <div className="graph--inner--container">
                            <div className="graph--content">
                                <TradingViewWidget symbol="MATICBTC" />
                            </div>
                        </div>
                    </div>
                    <div className="transactions--and--notes--container">
                        <div className="transactions--and--notes--inner--container">
                            <div className="transactions--and--notes--content">
                                <Transactions/>
                                <Notes/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AssetPage;
