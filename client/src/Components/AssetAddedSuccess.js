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
                    <h1>Succesfully added 753.32 Lisk to your Portfolio</h1>
                    <img alt="lisk image" src={liskImg}/>
                    <Link to="/">
                        <button>Continue</button>
                    </Link>
                </div>
            </div>
        );
    }
}

export default AssetAddedSuccess;
