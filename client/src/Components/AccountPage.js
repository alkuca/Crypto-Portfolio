import React, { useState } from 'react';
import '../App.css';
import Navbar from "./Navbar";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
import classnames from "classnames";
import {changeTheme,toggleAutoRefresh,changeCandleDuration} from "../actions/auth";
import Moment from 'react-moment';
import ReactTooltip from 'react-tooltip'

const AccountPage = ({ auth,changeTheme,toggleAutoRefresh,changeCandleDuration}) => {


    const [switchToggle, setSwitchToggle] = useState(false);
    const [switchToggleRefresh, setSwitchToggleRefresh] = useState(false);

    const handleSwitchToggle = () => {
        handleThemeChange();
        setSwitchToggle(!switchToggle)
    };


    const handleRefreshSwitchToggle = () => {
        handleRefreshToggle();
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

    const handleRefreshToggle = () => {
        if(auth.autoRefresh){
            toggleAutoRefresh(false)
        }else{
            toggleAutoRefresh(true)
        }
    };

    const handleCandleChange = (e) => {
        changeCandleDuration(e.target.value);
    };

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
                            <div className="information--content same-row more-margin">
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
                                <p data-tip="Auto refresh data on home page every 3 minutes">Auto Refresh: </p>
                                <ReactTooltip place="top" type="dark" effect="float"/>
                                <div className="switch--button">
                                    <div onClick={handleRefreshSwitchToggle} className={classnames("switch",{
                                        "switch-gray" : !auth.autoRefresh
                                    })}>
                                        <div className={classnames("ball",{
                                            "ball-move" : !auth.autoRefresh,
                                            "ball-gray" : !auth.autoRefresh
                                        })}/>
                                    </div>
                                </div>
                            </div>
                            <div className="information--content">
                                <p>Graph time interval (minutes): </p>
                                <div className="candle--duration--buttons">
                                    <div>
                                        <button className={auth.candleDuration === "1" ? 'candle--button--active' : ''} value="1" onClick={e => handleCandleChange(e)}>1</button>
                                        <button className={auth.candleDuration === "5" ? 'candle--button--active' : ''} value="5" onClick={e => handleCandleChange(e)}>5</button>
                                        <button className={auth.candleDuration === "15" ? 'candle--button--active' : ''} value="15" onClick={e => handleCandleChange(e)}>15</button>
                                        <button className={auth.candleDuration === "30" ? 'candle--button--active' : ''} value="30" onClick={e => handleCandleChange(e)}>30</button>
                                        <button className={auth.candleDuration === "60" ? 'candle--button--active' : ''} value="60" onClick={e => handleCandleChange(e)}>60</button>
                                        <button className={auth.candleDuration === "120" ? 'candle--button--active' : ''} value="120" onClick={e => handleCandleChange(e)}>120</button>
                                        <button className={auth.candleDuration === "240" ? 'candle--button--active' : ''} value="240" onClick={e => handleCandleChange(e)}>240</button>
                                        <button className={auth.candleDuration === "1440" ? 'candle--button--active' : ''} value="1440" onClick={e => handleCandleChange(e)}>1d</button>
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

export default withRouter(connect(mapStateToProps, { changeTheme,toggleAutoRefresh,changeCandleDuration })(AccountPage));