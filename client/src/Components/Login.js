import React, { Component } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

class Login extends Component {
    constructor(props){
        super(props);

    }

    render() {
        return (
            <div className="login--page">
                <div className="login--container">
                    <div className="login--content">
                        <div className="login--content--title--container">
                            <h1 className="login--content--title">Sign In</h1>
                        </div>
                        <div className="login--content--form--container">
                            <form>
                                <label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                    />
                                    <br />
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                    />
                                </label>
                                <div className="login-buttons-container">

                                </div>
                            </form>
                        </div>
                        <div className="remember--me--container">
                            <input className="remember--me--checkbox" type="checkbox" name="test" value="test" required/><label className="remember--me--label">Remember Me</label>
                            <label className="forgot--password--label">Forgot Password?</label>
                        </div>
                        <div className="sign--in--button--container">
                            <Link to="/">
                                <button className="sign--in--button">Sign In</button>
                            </Link>
                        </div>
                        <div className="sign--up--here--container">
                            <p className="sign--up--here">Don't Have an Account?</p>
                            <Link to="register">
                                <p className="sign--up--here--link">Sign Up Here!</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
