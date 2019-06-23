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
                    <h1>753.32 LISK</h1>
                    <div className="asset--added--success--image--content">
                        <img className="add--asset--image--success" alt="lisk image" src={liskImg}/>
                    </div>
                    <h2>Successfully added to your Portfolio</h2>
                    <Link to="/">
                        <button>Continue</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default AssetAddedSuccess;
