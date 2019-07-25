import React, { useState,useEffect } from 'react';
import '../App.css';
import ValueBlock from "./ValueBlock";
import Asset from "./Asset";
import Navbar from "./Navbar";
import {connect} from "react-redux";
import {loadUser} from "../actions/auth";




const Home = ({ loading,auth,loadUser }) => {

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <div>
            <Navbar/>
            <div className="block--container">
                <div className="block--container--content">
                    <ValueBlock type="USD" value="$ 0.00"/>
                    <ValueBlock type="Bitcoin (BTC)" value="0.00000000"/>
                    {/* replace next div block with ValeBlock Component */}
                    <div className="value--block">
                        <div className="blue--line"/>
                        <div className="value--block-content">
                            <p className="value--block--value--type">Daily Change</p>
                            <p className="value--block--value makeGreen">0.00 %</p>
                        </div>
                    </div>
                    {/* end here */}
                </div>
            </div>

            <div className="assets--container">
                <div className="assets--inner--container">
                    <div className="assets--search--filter-container">
                        <div className="assets--search--filter">
                            <input placeholder="Search..." type="search"/>
                        </div>
                        <div className="assets--sort--filter">
                            <form>
                                <select name="test">
                                    <option value="test">test</option>
                                    <option value="test">test</option>
                                    <option value="test">test</option>
                                    <option value="test">test</option>
                                </select>
                            </form>
                        </div>
                    </div>
                    <div className="asset--container">
                        { auth.user !== null ?
                            auth.user.assets.map(function(asset) {
                                return <Asset key={asset._id} name={asset.name} value="0.00 $" amount={asset.purchasedAmount} image={asset.image} change="0.00 %"/>
                            })
                            : null}
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    loading: state.auth.loading,
    auth: state.auth
});

export default connect(mapStateToProps, {loadUser})(Home);

