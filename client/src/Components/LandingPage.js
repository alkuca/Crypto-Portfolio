import React from 'react';
import '../App.css';
import logo from "../Images/landingPageLogo.svg";
import laptop from "../Images/laptop.png";



const LandingPage = () => {

    return (
        <div className="landing--page">
            <div className="landing--page--first--section">
                <div className="landing--page--first--section--container">
                    <div className="landing--page--navbar">
                        <div className="landing--page--navbar--logo--container">
                            <img alt="logo" className="landing--page--navbar--logo" src={logo} />
                        </div>
                        <div className="landing--page--navbar--links--container">
                            <p className="landing--page--navbar--link">About</p>
                            <p className="landing--page--navbar--link">Solutions</p>
                            <p className="landing--page--navbar--link">Contact</p>
                            <button className="landing--page--navbar--sign--in--button">Sign In</button>
                        </div>
                    </div>
                    <div className="landing--page--first--section--content">
                        <div className="landing--page--first--section--container--left">
                            <h1 className="landing--page--first--section--container--left--title">Lorem Ipsum</h1>
                            <p className="landing--page--first--section--container--left--text">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Duis molestie elit id semper bibendum. Quisque luctus rhoncus
                                elit vel pharetra. Sed orci sapien.
                            </p>
                            <button className="landing--page--first--section--container--left--button">Get Started</button>
                        </div>
                        <div className="landing--page--first--section--container--right">
                            <img alt="laptop" className="landing--page--first--section--container--right--image" src={laptop} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="landing--page--second--section">
                <div className="landing--page--second--section--container">
                    <div className="landing--page--second--section--container--left">
                        <h1>section two</h1>
                    </div>
                    <div className="landing--page--second--section--container--right">

                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
