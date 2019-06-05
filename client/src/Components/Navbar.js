import React, { Component } from 'react';
import '../App.css';
import logo from "../Images/logo.svg";
import menuArrow from "../Images/menu-arrow.svg";
import DarkenScreen from "./DarkenScreen";
import classnames from "classnames";

class Navbar extends Component {
    constructor(props){
        super(props);
        this.state = {
            menuIsOpen: false,
        };

        this.toggleMenu = this.toggleMenu.bind(this);
    }

    toggleMenu() {
        this.setState({ menuIsOpen: !this.state.menuIsOpen });
    }

    render() {
        return (
            <div>
                {this.state.menuIsOpen ? <DarkenScreen toggleMenu={this.toggleMenu}/> : null}
                <div className="navbar">
                    <div className="navbar--wrapper">
                        <div className="navbar--content">
                            <div className="navbar--content--left">
                                <img alt="logo" className="navbar--logo" src={logo} />
                            </div>
                            <div className="navbar--content--right">
                                <button className="navbar--link-button">ADD ASSET</button>
                                <div className="navbar--user--menu" onClick={this.toggleMenu}>
                                    <p className="navbar--link">USER</p>
                                    <img src={menuArrow} className={classnames("menu--arrow",{
                                        "rotate-arrow" : this.state.menuIsOpen})}
                                         alt="drop-down-arrow"/>
                                </div>
                            </div>
                        </div>
                        { this.state.menuIsOpen ?
                            <div className={classnames("navbar--dropdown--container", {
                                "menu-collapsed": this.state.menuIsOpen
                            })}>
                                <div className={classnames("navbar--dropdown--content", {
                                    "fadeIn": this.state.menuIsOpen
                                })}>
                                    <p className="dropdown--menu--link">MY ACCOUNT</p>
                                    <p className="dropdown--menu--link">PORTFOLIO</p>
                                    <p className="dropdown--menu--link">SETTINGS</p>
                                    <p className="dropdown--menu--link">SIGN OUT</p>
                                </div>
                            </div>
                        : null
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Navbar;
