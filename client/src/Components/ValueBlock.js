import React, { Component } from 'react';
import '../App.css';

class ValueBlock extends Component {
    constructor(props){
        super(props);

    }

    render() {
        return (
            <div className="value--block">
                <div className="blue--line"/>
                <div className="value--block-content">
                    <p className="value--block--value--type">{this.props.type}</p>
                    <p className="value--block--value">{this.props.value}</p>
                </div>
            </div>
        );
    }
}

export default ValueBlock;
