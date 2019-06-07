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
                        <ValueBlock type="USD" value="$ 372 460.47"/>
                        <ValueBlock type="Bitcoin (BTC)" value="46.23564565"/>
                        {/* replace next div block with ValeBlock Component */}
                        <div className="value--block">
                            <div className="blue--line"/>
                            <div className="value--block-content">
                                <p className="value--block--value--type">Daily Change</p>
                                <p className="value--block--value makeGreen">57.43 %</p>
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
                                        <option value="volvo">Volvo</option>
                                        <option value="saab">Saab</option>
                                        <option value="fiat">Fiat</option>
                                        <option value="audi">Audi</option>
                                    </select>
                                </form>
                            </div>
                        </div>
                        <div className="asset--container">
                            <Asset/>
                            <Asset/>
                            <Asset/>
                            <Asset/>
                            <Asset/>
                            <Asset/>
                            <Asset/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Home;
