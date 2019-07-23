import React, { Component } from 'react';
import '../App.css';
import liskImg from "../Images/liskImg.png";
import {Link} from "react-router-dom";

class Asset extends Component {
    constructor(props){
        super(props);

    }

    render() {
        return (
            <Link to="/asset">
                <div className="asset">
                    <div className="asset--blue--line"/>
                    <div className="asset--content">
                        <div className="asset--image--name--container">
                            <img alt="asset" className="asset--image" src={liskImg} />
                            <p className="asset--name">{this.props.name}</p>
                        </div>
                        <p className="asset--amount">{this.props.amount}</p>
                        <p className="asset--value">{this.props.value}</p>
                        <p className="asset--change">{this.props.change}</p>
                    </div>
                </div>
            </Link>
        );
    }
}

export default Asset;
