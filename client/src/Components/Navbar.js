import React, { useState,useEffect} from 'react';
import '../App.css';
import logo from "../Images/logo.svg";
import menuArrow from "../Images/menu-arrow.svg";
import DarkenScreen from "./DarkenScreen";
import classnames from "classnames";
import { Link } from 'react-router-dom';
import {connect} from "react-redux";
import {logout,changeTheme} from "../actions/auth";
import Headroom from "react-headroom";

const Navbar = ({ logout,auth,changeTheme }) => {

    const [menu, setMenu] = useState(false);

    function toggleMenu() {
        setMenu(!menu);
    }

    const handleThemeToggle = () => {
        toggleMenu();
        handleThemeChange();
    };


    const handleThemeChange = () => {
        let dark = "DARK";
        let light = "LIGHT";

        if(auth.theme === "LIGHT"){
            changeTheme(dark);
        }else if(auth.theme === "DARK"){
            changeTheme(light);
        }
        document.documentElement.setAttribute("data-theme", auth.theme);
    }



    useEffect(() => {
        document.documentElement.setAttribute("data-theme", auth.theme);
    }, [auth.theme]);


    return (
            <div>
                {menu ? <DarkenScreen toggleMenu={toggleMenu}/> : null}
                <Headroom>
                <div className="navbar">
                    <div className="navbar--wrapper">
                        <div className="navbar--content">
                            <div className="navbar--content--left">
                                <Link to="/home">
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
                                        <p className="dropdown--menu--link">My Account</p>
                                    </Link>
                                    <Link to="/home">
                                        <p className="dropdown--menu--link">Home</p>
                                    </Link>
                                    <a onClick={handleThemeToggle} className="toggle--theme">
                                        <p className="dropdown--menu--link">{auth.theme === "LIGHT" ? "Dark Mode" : "Light Mode" }</p>
                                    </a>
                                    <Link to="/login">
                                        <p className="dropdown--menu--link" onClick={logout}>Logout</p>
                                    </Link>
                                </div>
                            </div>
                        : null
                        }
                    </div>
                </div>
                </Headroom>
            </div>
        );
    };

const mapStateToProps = state => ({
    auth: state.auth,
});

export default connect(mapStateToProps, { logout,changeTheme })(Navbar);

