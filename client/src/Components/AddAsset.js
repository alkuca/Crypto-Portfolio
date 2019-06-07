import React, { Component } from 'react';
import '../App.css';
import liskImg from "../Images/liskImg.png";

class AddAsset extends Component {
    constructor(props){
        super(props);

    }

    render() {
        return (
            <div className="add--asset--content">
                <div className="add--asset--blue--line"/>
                <div className="add--asset--content--left">
                    <p className="add-asset--content--left--title">Add Asset to my portfolio</p>
                    <div className="add--asset--select--filter">
                        <input placeholder="Search Asset..." type="search"/>
                    </div>
                    <div className="add--asset--select--image--container">
                        <div className="add--asset--select--image--content">
                            <img className="add--asset--image" alt="lisk" src={liskImg}/>
                        </div>
                    </div>
                </div>
                <div className="vertical--line"/>
                <div className="add--asset--content--right">
                    <div className="add--asset--input--form">
                        <label>
                            Amount:
                            <input/>
                        </label>
                        <label>
                            Price(BTC):
                            <input/>
                        </label>
                        <label>
                            Date:
                            <input/>
                        </label>
                    </div>
                    <div className="add--asset--buttons--container">
                        <button className="add--asset--cancel--button">Cancel</button>
                        <button className="add--asset--accept--button">Accept</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddAsset;
