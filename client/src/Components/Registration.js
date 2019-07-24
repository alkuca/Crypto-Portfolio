import React, { useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import logo from "../Images/logo.svg";
import RegistrationForm from "./RegistrationForm";


const Registration = () => {

    return (
        <div className="register--page">
            <div className="login--page--logo--container">
                <Link to="/landing">
                    <img src={logo} alt="logo"/>
                </Link>
            </div>
            <RegistrationForm/>
        </div>
    );
};


export default Registration;
