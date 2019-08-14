import React, {  } from 'react';
import '../App.css';
import classnames from "classnames";
import NumberFormat from "react-number-format";

const ValueBlock = ({ type,value,toggle,toggleValueBlockUsd,toggleValueBlockBtc, toggleValueBlockPercent,alwaysColored,dollar}) => {



    return (
        <div onClick={toggle} className="value--block">
            <div className="blue--line"/>
            <div className="value--block-content">
                <p className="value--block--value--type">{type}</p>

                <p className={classnames("value--block--value", {
                    "makeRed":  (toggleValueBlockUsd || toggleValueBlockBtc || toggleValueBlockPercent || alwaysColored)  && value < 0,
                    "makeGreen": (toggleValueBlockUsd || toggleValueBlockBtc || toggleValueBlockPercent  || alwaysColored) && value > 0
                })}><NumberFormat value={value} displayType={'text'} thousandSeparator={true}/><span>{alwaysColored ? " %" :null}{dollar? " $" :null}</span></p>

            </div>
        </div>
    );
};

export default ValueBlock;