import React, { useState } from 'react';
import '../App.css';
import Navbar from "./Navbar";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import classnames from "classnames";
import {changeTheme} from "../actions/auth";
import Moment from 'react-moment';


const AccountPage = ({ auth,changeTheme}) => {


    const [switchToggle, setSwitchToggle] = useState(false);
    const [switchToggleRefresh, setSwitchToggleRefresh] = useState(false);

    const handleSwitchToggle = () => {
        handleThemeChange();
        setSwitchToggle(!switchToggle)
    };

    const handleRefreshSwitchToggle = () => {
        setSwitchToggleRefresh(!switchToggleRefresh)
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

    return (
        <div>
            <Navbar/>
            <div className="account--page">
                <div className="account--page--container">
                    <div className="account--page--inner--container">
                        <div className="information--container">
                            <div className="information--title--container">
                                <p className="information--title">BASIC INFORMATION</p>
                            </div>
                            <div className="information--content">
                                <p className="information--text">Email: {auth.user !== null ? auth.user.email : null}</p>
                                <p className="information--text">Username: {auth.user !== null ? auth.user.username : null}</p>
                                <p className="information--text">Member since: {auth.user !== null ? <Moment format="DD.MM.YYYY">{auth.user.date}</Moment>: null}</p>
                            </div>
                        </div>
                        <div className="information--container">
                            <div className="information--title--container">
                                <p className="information--title">SETTINGS</p>
                            </div>
                            <div className="information--content same-row">
                                <p className="information--text">Dark/Light Theme: </p>
                                <div className="switch--button">
                                    <div className="switch" onClick={handleSwitchToggle}>
                                        <div className={classnames("ball",{
                                            "ball-move" : switchToggle
                                        })}/>
                                    </div>
                                </div>
                            </div>
                            <div className="information--content same-row">
                                <p className="information--text">Auto Refresh: </p>
                                <div className="switch--button">
                                    <div onClick={handleRefreshSwitchToggle} className={classnames("switch",{
                                        "switch-gray" : switchToggleRefresh,
                                    })}>
                                        <div className={classnames("ball",{
                                            "ball-move" : switchToggleRefresh,
                                            "ball-gray" : switchToggleRefresh
                                        })}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};


const mapStateToProps = state => ({
    auth: state.auth,
});

export default withRouter(connect(mapStateToProps, { changeTheme })(AccountPage));