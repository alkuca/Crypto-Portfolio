import React, { useState } from 'react';
import '../App.css';
import logo from "../Images/logo.svg";
import RegistrationForm from "./RegistrationForm";


const Registration = ({}) => {

    return (
        <div className="register--page">
            <div className="login--page--logo--container">
                <img src={logo} alt="logo"/>
            </div>
            <RegistrationForm/>

        </div>
    );
};


export default Registration;
