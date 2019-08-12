import React, {  } from 'react';
import '../App.css';

const ValueBlock = ({ type,value}) => {



    return (
        <div className="value--block">
            <div className="blue--line"/>
            <div className="value--block-content">
                <p className="value--block--value--type">{type}</p>
                <p className="value--block--value">{value}</p>
            </div>
        </div>
    );
}

export default ValueBlock;
