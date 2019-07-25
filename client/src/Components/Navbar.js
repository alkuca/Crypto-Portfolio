import React, { useState} from 'react';
import '../App.css';
import logo from "../Images/logo.svg";
import menuArrow from "../Images/menu-arrow.svg";
import DarkenScreen from "./DarkenScreen";
import classnames from "classnames";
import { Link } from 'react-router-dom';
import {connect} from "react-redux";
import {logout} from "../actions/auth";

const Navbar = ({ logout,auth }) => {

    const [menu, setMenu] = useState(false);

    function toggleMenu() {
        setMenu(!menu);
    }


        return (
            <div>
                {menu ? <DarkenScreen toggleMenu={toggleMenu}/> : null}
                <div className="navbar">
                    <div className="navbar--wrapper">
                        <div className="navbar--content">
                            <div className="navbar--content--left">
                                <Link to="/">
                                    <img alt="logo" className="navbar--logo" src={logo} />
                                </Link>
                            </div>
                            <div className="navbar--content--right">
                                <Link to="/addasset">
                                    <button className="navbar--link--button">ADD ASSET</button>
                                </Link>
                                <div className="navbar--user--menu" onClick={toggleMenu}>
                                    { auth.user !== null ?
                                        <p className="navbar--link">{auth.user.username}</p>
                                    :null}
                                    <img src={menuArrow} className={classnames("menu--arrow",{
                                        "rotate-arrow" : menu})}
                                         alt="drop-down-arrow"/>
                                </div>
                            </div>
                        </div>
                        { menu ?
                            <div className={classnames("navbar--dropdown--container", {
                                "menu-collapsed": menu
                            })}>
                                <div className={classnames("navbar--dropdown--content", {
                                    "fadeIn": menu
                                })}>
                                    <Link to="/account">
                                        <p className="dropdown--menu--link">MY ACCOUNT</p>
                                    </Link>
                                    <Link to="/">
                                        <p className="dropdown--menu--link">PORTFOLIO</p>
                                    </Link>
                                    <Link to="/login">
                                        <p className="dropdown--menu--link" onClick={logout}>LOGOUT</p>
                                    </Link>
                                </div>
                            </div>
                        : null
                        }
                    </div>
                </div>
            </div>
        );
    };

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navbar);

