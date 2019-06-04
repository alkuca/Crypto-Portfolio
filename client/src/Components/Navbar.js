import React, { Component } from 'react';
import '../App.css';
import logo from "../Images/logo.svg";
import menuArrow from "../Images/menu-arrow.svg";

class Navbar extends Component {
    constructor(props){
        super(props);

    }

    render() {
        return (
            <div className="navbar">
                <div className="navbar--wrapper">
                    <div className="navbar--content">
                        <div className="navbar--content--left">
                            <img alt="logo" className="navbar--logo" src={logo} />
                        </div>
                        <div className="navbar--content--right">
                            <p className="navbar--link">ADD ASSET</p>
                            <div className="navbar--user--menu">
                                <p className="navbar--link">USER</p>
                                <img alt="menu arrow" className="menu--arrow" src={menuArrow} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Navbar;
