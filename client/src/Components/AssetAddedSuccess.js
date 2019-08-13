import React, {  } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

const AssetAddedSuccess = ({purchasedAmount,symbol,image}) => {

    return (
        <div className="asset--added--success--container">
            <div className="asset--added--success--content">
                <h1>{purchasedAmount + " " + symbol}</h1>
                <div className="asset--added--success--image--content">
                    <img className="add--asset--image--success" alt="asset" src={image}/>
                </div>
                <h2 className="asset--added--success-title">Successfully added to your Portfolio</h2>
                <Link to="/home">
                    <button>Continue</button>
                </Link>
            </div>
        </div>
    );
};

export default AssetAddedSuccess;
