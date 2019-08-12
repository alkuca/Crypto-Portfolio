import React, { useState } from 'react';
import '../App.css';
import { Link,Redirect } from 'react-router-dom';
import logo from "../Images/navbarLogo.png";
import {connect} from "react-redux";
import {requestPasswordEmail,subLoading} from "../actions/auth";
import logoLoaderWhite from "../Images/loaderLogoWhite.gif";


const PasswordResetEmail = ({ requestPasswordEmail,errors,subLoading,submitLoading,successMessage }) => {

    const [submit, setSubmit] = useState(false);

    const [formData, setFormData] = useState({
        email: ""
    });


    const { email } = formData;


    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});


    const onSubmit = async e => {
        e.preventDefault();
        setSubmit(true);
        subLoading();
        await requestPasswordEmail(email);
    };



    return (
        <div className="login--page">
            <div className="login--page--logo--container">
                <Link to="/">
                    <img className="login--page--logo"  src={logo} alt="logo"/>
                </Link>
            </div>
            <div className="register--container">
                <div className="register--content">
                    <div className="register--content--title--container">
                        <h1 className="register--content--title">Request Password Reset</h1>
                    </div>
                    <div className="register--content--form--container">
                        <form onSubmit={e => onSubmit(e)}>
                            <label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={e => onChange(e)}
                                    required
                                />
                            </label>
                            {errors && errors.length ?
                                <div className="error--message">
                                    <p>{errors[0].msg}</p>
                                </div>
                                :null}
                            {successMessage ?
                                <div className="success--message">
                                    <p>{successMessage}</p>
                                    <p>Check your spam folder or try again later</p>
                                </div>
                                :null}
                            <div className="sign--in--button--container">
                                <button type="submit" className="reset--password--button">
                                    {submit && submitLoading ?
                                        < img className="button--loader--white" src={logoLoaderWhite} alt="loader"/>
                                        : "Send"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    submitLoading:state.auth.submitLoading,
    passwordReset:state.auth.passwordReset,
    requestedPasswordReset:state.auth.requestedPasswordReset,
    errors:state.auth.errors,
    successMessage:state.auth.successMessage
});

export default connect(mapStateToProps, { requestPasswordEmail,subLoading })(PasswordResetEmail);
