import React, { Component } from 'react';
import '../App.css';

class Registration extends Component {
    constructor(props){
        super(props);

    }

    render() {
        return (
            <div className="register--page">
                <div className="register--container">
                    <div className="register--content">
                        <div className="register--content--title--container">
                            <h1 className="register--content--title">Sign Up</h1>
                        </div>
                        <div className="register--content--form--container">
                            <form>
                                <label>
                                    <input
                                        type="username"
                                        name="username"
                                        placeholder="Username"
                                    />
                                    <br />
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
                                    <br />
                                    <input
                                        type="password2"
                                        name="password2"
                                        placeholder="Repeat Password"
                                    />
                                </label>
                            </form>
                        </div>
                        <div className="accept--terms--container">
                            <input type="checkbox" name="test" value="test" required/>
                            <label className="accept--terms--label">
                                I Accept <span className="make--blue">Terms and Conditions</span>
                            </label>
                        </div>
                        <div className="sign--up--button--container">
                            <button className="sign--in--button">Sign Up</button>
                        </div>
                        <div className="sign--in--here--container">
                            <p className="sign--in--here">Already Have an Account?</p>
                            <p className="sign--in--here--link">Sign In Here!</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Registration;
