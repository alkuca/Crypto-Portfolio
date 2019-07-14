import React, { Component } from 'react';
import '../App.css';
import DarkenScreen from "./DarkenScreen";


class AddTransactionModal extends Component {
    constructor(props){
        super(props);
        this.state = {

        };


    }



    render() {
        return (
            <div>
                <DarkenScreen/>
                <div className="add--transaction--modal">
                    <div className="add--transaction--container">
                        <div className="add--transaction--content">
                            <h2>Add Transaction for: BTC </h2>
                            <div className="add--transaction--form">
                                <form>
                                    <label>
                                        Quantity:
                                        <input
                                            name="quantity"
                                        />
                                    </label>
                                    <br />
                                    <label>
                                        Date:
                                        <input
                                            name="date"
                                        />
                                    </label>
                                    <br />
                                    <label>
                                        Price:
                                        <input
                                            type="number"
                                            name="price"
                                        />
                                    </label>
                                </form>
                            </div>
                            <div className="add--transaction--buttons--container">
                                <button onClick={this.props.toggleAddTransactionModal} className="add--transaction--cancel--button">Cancel</button>
                                <button onClick={this.addTransaction} className="add--transaction--accept--button">Accept</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddTransactionModal;
