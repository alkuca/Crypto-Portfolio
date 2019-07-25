import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import liskImg from "../Images/liskImg.png";

class AssetAddedSuccess extends Component {
    constructor(props){
        super(props);

    }

    render() {
        return (
            <div className="asset--added--success--container">
                <div className="asset--added--success--content">
                    <h1>{this.props.purchasedAmount + " " + this.props.symbol}</h1>
                    <div className="asset--added--success--image--content">
                        <img className="add--asset--image--success" alt="lisk image" src={this.props.image}/>
                    </div>
                    <h2>Successfully added to your Portfolio</h2>
                    <Link to="/home">
                        <button>Continue</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default AssetAddedSuccess;
