import React, { Component } from 'react';
import '../App.css';
import ValueBlock from "./ValueBlock";
import Asset from "./Asset";
import Navbar from "./Navbar";



class Home extends Component {
    constructor(props){
        super(props);

    }

    render() {
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
                                    <select name="cars">
                                        <option value="test">test</option>
                                        <option value="test">test</option>
                                        <option value="test">test</option>
                                        <option value="test">test</option>
                                    </select>
                                </form>
                            </div>
                        </div>
                        <div className="asset--container">
                            <Asset name="Lisk" amount="0" value="0.00 $" change="0.00 %"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
