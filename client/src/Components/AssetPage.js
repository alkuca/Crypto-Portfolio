import React, { useState } from 'react';
import '../App.css';
import ValueBlock from "./ValueBlock";
import Navbar from "./Navbar";
import AssetDetails from "./AssetDetails";
import TradingViewWidget from 'react-tradingview-widget';
import Transactions from "./Transactions";
import Notes from "./Notes";
import AddTransactionModal from "./AddTransactionModal";
import AddNoteModal from "./AddNoteModal";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";

const AssetPage = ({ singleAssetData }) => {

    const [transactionModal, toggleTransactionModal] = useState(false);
    const [noteModal, toggleNoteModal] = useState(false);


    const toggleAddTransactionModal = () => {
        toggleTransactionModal(!transactionModal)
    };

    const toggleAddNoteModal = () =>  {
        toggleNoteModal(!noteModal)
    };

        return (
            <div>
                <Navbar/>
                <div className="asset--page">
                    {transactionModal ? <AddTransactionModal toggleAddTransactionModal={toggleAddTransactionModal}/> : null}
                    {noteModal ? <AddNoteModal toggleAddNoteModal={toggleAddNoteModal}/> : null}
                    <AssetDetails/>
                    <div className="block--container">
                        <div className="block--container--content">
                            <ValueBlock type="USD" value="0.00 $"/>
                            <ValueBlock type="Bitcoin (BTC)" value="0.00000000"/>
                            {/* replace next div block with ValeBlock Component */}
                            <div className="value--block">
                                <div className="blue--line"/>
                                <div className="value--block-content">
                                    <p className="value--block--value--type">Total Change (BTC)</p>
                                    <p className="value--block--value makeGreen">0.00 %</p>
                                </div>
                            </div>
                            {/* end here */}
                        </div>
                    </div>
                    <div className="graph--container">
                        <div className="graph--inner--container">
                            <div className="graph--content">
                                { singleAssetData ?
                                    <TradingViewWidget interval="240" symbol={singleAssetData.symbol + "BTC"}/>
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
    singleAssetData: state.assets.singleAssetData
});

export default withRouter(connect(mapStateToProps, {  })(AssetPage));


