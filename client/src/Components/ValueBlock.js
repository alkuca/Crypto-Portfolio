import React, {  } from 'react';
import '../App.css';
import classnames from "classnames";

const ValueBlock = ({ type,value}) => {



    return (
        <div className="value--block">
            <div className="blue--line"/>
            <div className="value--block-content">
                <p className="value--block--value--type">{type}</p>

                <p className={classnames("value--block--value", {
                    "fadeInText": value.length > 0
                })}>{value}</p>

            </div>
        </div>
    );
}

export default ValueBlock;
