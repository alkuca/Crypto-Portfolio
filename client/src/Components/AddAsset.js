import React, { Component } from 'react';
import '../App.css';
import liskImg from "../Images/liskImg.png";
import classnames from "classnames";
import { Link } from 'react-router-dom';
import AssetAddedSuccess from "./AssetAddedSuccess";

class AddAsset extends Component {
    constructor(props){
        super(props);
        this.state = {
            assetSuccess: false
        };

        this.addAsset = this.addAsset.bind(this);
    }

    addAsset() {
        this.setState({ assetSuccess: true });
    }

    render() {
        return (
                <div className="add--asset--content">
                    <div className={classnames("add--asset--blue--line", {
                        "asset--added--animate": this.state.assetSuccess
                    })}/>
                    <div className={classnames("add--asset--inner--content", {
                        "fade--out": this.state.assetSuccess
                    })}>
                        <div className="add--asset--content--left">
                            <p className="add-asset--content--left--title">Add Asset to my portfolio</p>
                            <div className="add--asset--select--filter">
                                <form>
                                <input placeholder="Search Asset..." type="search"/>
                                    {/*COINGECKO API*/}
                                </form>
                            </div>
                            <div className="add--asset--select--image--container">
                                <div className="add--asset--select--image--content">
                                    <img className="add--asset--image" alt="lisk image" src={liskImg}/>
                                </div>
                            </div>
                        </div>
                        <div className="vertical--line--add--asset"/>
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
                                <Link to="/">
                                    <button className="add--asset--cancel--button">Cancel</button>
                                </Link>
                                <button onClick={this.addAsset} className="add--asset--accept--button">Accept</button>
                            </div>
                        </div>
                    </div>
                    {this.state.assetSuccess ? <AssetAddedSuccess/> : null}
                </div>
        );
    }
}

export default AddAsset;
