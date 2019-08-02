import React from 'react';
import '../App.css';
import logo from "../Images/navbarLogo.png";
import logoMobile from "../Images/navbarLogoMobile.png";
import logoSecond from "../Images/landingPageSecondLogo.svg";
import laptop from "../Images/laptop.png";
import arrowRight from "../Images/arrowRight.svg";
import RegistrationForm from "./RegistrationForm";
import { Link } from 'react-router-dom';


const LandingPage = () => {

    return (
        <div className="landing--page">
            <div className="landing--page--first--section">
                <div className="landing--page--first--section--container">
                    <div className="landing--page--navbar">
                        <div className="landing--page--navbar--logo--container">
                            <img alt="logo" className="landing--page--navbar--logo" src={logo} />
                            <img alt="logo" className="landing--page--navbar--logo--mobile" src={logoMobile} />
                        </div>
                        <div className="landing--page--navbar--links--container">
                            <Link to="/login">
                                <button className="landing--page--navbar--sign--in--button">Sign In<img alt="button-arrow" className="button--arrow" src={arrowRight} /></button>
                            </Link>
                        </div>
                    </div>
                    <div className="landing--page--first--section--content">
                        <div className="landing--page--first--section--container--left">
                            <h1 className="landing--page--first--section--container--left--title">Track your assets</h1>
                            <p className="landing--page--first--section--container--left--text">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                Duis molestie elit id semper bibendum. Quisque luctus rhoncus
                                elit vel pharetra. Sed orci sapien.
                            </p>
                            <div className="landing--page--get--started--button">
                                <Link to="/register">
                                    <button className="landing--page--first--section--container--left--button">Get Started</button>
                                </Link>
                            </div>
                        </div>
                        <div className="landing--page--first--section--container--right">
                            <img alt="laptop" className="landing--page--first--section--container--right--image" src={laptop} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="landing--page--second--section">
                <div className="landing--page--second--section--container">
                    <div className="landing--page--second--section--content">
                        <div className="landing--page--second--section--container--left">
                            <RegistrationForm/>
                        </div>
                        <div className="landing--page--second--section--container--right">
                            <img alt="logoSecond" className="landing--page--second--logo" src={logoSecond} />
                            <p className="landing--page--second--section--container--right--subtitle">THE PERSONAL CRYPTO PORTFOLIO</p>
                            <p className="landing--page--second--section--container--right--text">
                                Sign up for your account in AltPosit.
                                <br/>
                                Access all your favorite data soruces in
                                one place.
                            </p>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LandingPage;
