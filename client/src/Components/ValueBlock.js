import React, {  } from 'react';
import '../App.css';
import classnames from "classnames";

const ValueBlock = ({ type,value,toggle,toggleValueBlockUsd,toggleValueBlockBtc, toggleValueBlockPercent,alwaysColored}) => {



    return (
        <div onClick={toggle} className="value--block">
            <div className="blue--line"/>
            <div className="value--block-content">
                <p className="value--block--value--type">{type}</p>

                <p className={classnames("value--block--value", {
                    "makeRed":  (toggleValueBlockUsd || toggleValueBlockBtc || toggleValueBlockPercent || alwaysColored)  && value < 0,
                    "makeGreen": (toggleValueBlockUsd || toggleValueBlockBtc || toggleValueBlockPercent  || alwaysColored) && value > 0
                })}>{value}<span>{alwaysColored ? " %" :null}{toggleValueBlockUsd? " $" :null}</span></p>

            </div>
        </div>
    );
};

export default ValueBlock;