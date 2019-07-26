import React, { useState } from 'react';
import '../App.css';
import logoLoaderWhite from "../Images/loaderLogoWhite.gif";
import { Link, Redirect, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import {register, subLoading} from "../actions/auth";

const RegistrationForm = ({ register, registerSuccessful, isAuthenticated,subLoading,submitLoading }) => {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        password2: ""
    });

    const { username, email, password, password2 } = formData;

    const [submit, setSubmit] = useState(false);

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const onSubmit = e => {
        e.preventDefault();
        subLoading();
        if(password !== password2){
            console.log("passwords do not match");
        } else{
            setSubmit(true);
            register({ username, email, password });
        }
    };


    if(submit && registerSuccessful){
        return <Redirect to = "/login"/>
    }

    return (
            <div className="register--container">
                <div className="register--content">
                    <div className="register--content--title--container">
                        <h1 className="register--content--title">Sign Up</h1>
                    </div>
                    <div className="register--content--form--container">
                        <form onSubmit={e => onSubmit(e)}>
                            <label>
                                <input
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    value={username}
                                    onChange={e => onChange(e)}

                                />
                                <br />
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={e => onChange(e)}

                                />
                                <br />
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={e => onChange(e)}

                                />
                                <br />
                                <input
                                    type="password"
                                    name="password2"
                                    placeholder="Repeat Password"
                                    value={password2}
                                    onChange={e => onChange(e)}

                                />
                            </label>
                            <div className="accept--terms--container">
                                <input className="accept--terms--checkbox" type="checkbox" name="test" value="test" required/>
                                <label className="accept--terms--label">
                                    I Accept <span className="make--blue">Terms and Conditions</span>
                                </label>
                            </div>
                            <div className="sign--up--button--container">
                                <button type="submit" className="sign--in--button">
                                    {submit && submitLoading ?
                                        < img className="button--loader--white" src={logoLoaderWhite} alt="loader"/>
                                    : "Sign Up"}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="sign--in--here--container">
                        <p className="sign--in--here">Already Have an Account?</p>
                        <Link to="/login">
                            <p className="sign--in--here--link">Sign In Here!</p>
                        </Link>
                    </div>
                </div>
            </div>
    );
};

const mapStateToProps = state => ({
    registerSuccessful: state.auth.registerSuccessful,
    isAuthenticated: state.auth.isAuthenticated,
    submitLoading: state.auth.submitLoading
});

export default withRouter(connect(mapStateToProps,  { register,subLoading })(RegistrationForm));
