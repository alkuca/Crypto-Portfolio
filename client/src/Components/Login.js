import React, { useState } from 'react';
import '../App.css';
import { Link, Redirect } from 'react-router-dom';
import logoLoaderWhite from "../Images/loaderLogoWhite.gif";
import logo from "../Images/navbarLogo.png";
import {connect} from "react-redux";
import {loadUser, login, subLoading, registerSuccessfullToFalse} from "../actions/auth";


const Login = ({ login, isAuthenticated, submitLoading,subLoading,isConfirmed,errors}) => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const {  email, password } = formData;

    const [submit, setSubmit] = useState(false);

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = async e => {
        e.preventDefault();
        setSubmit(true);
        subLoading();
        await login(email, password);
    };


    if(isAuthenticated && isConfirmed){
        return <Redirect to = "/home"/>
    }




    return (
        <div className="login--page">
            <div className="login--page--logo--container">
                <Link to="/">
                    <img className="login--page--logo"  src={logo} alt="logo"/>
                </Link>
            </div>
            <div className="login--container">
                <div className="login--content">
                    <div className="login--content--title--container">
                        <h1 className="login--content--title">Sign In</h1>
                    </div>
                    <div className="login--content--form--container">
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
                                <br />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => onChange(e)}
                                    required
                                />
                            </label>
                            {errors && errors.length ?
                                <div className="error--message">
                                    <p>{errors[0].msg}</p>
                                </div>
                                :null}

                            <div className="remember--me--container">
                                <Link to="/enter_email">
                                    <label className="forgot--password--label">Forgot Password?</label>
                                </Link>
                            </div>
                            <div className="sign--in--button--container">
                                <button type="submit" className="sign--in--button">
                                    {submit && submitLoading ?
                                        < img className="button--loader--white" src={logoLoaderWhite} alt="loader"/>
                                        : "Sign In"}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="sign--up--here--container">
                        <p className="sign--up--here">Don't Have an Account?</p>
                        <Link to="/register">
                            <p className="sign--up--here--link">Sign Up Here!</p>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isConfirmed: state.auth.isConfirmed,
    submitLoading:state.auth.submitLoading,
    errors:state.auth.errors
});

export default connect(mapStateToProps, { login,subLoading,loadUser,registerSuccessfullToFalse})(Login);
