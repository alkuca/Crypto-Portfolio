import React, {  } from 'react';
import '../App.css';


const DarkenScreen = ({toggleMenu}) => {

    return (
        <div className="darken" onClick={toggleMenu}/>
        );
    };

export default DarkenScreen;
