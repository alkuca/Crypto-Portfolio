import React, { Component } from 'react';
import '../App.css';


class DarkenScreen extends Component {
    constructor(props){
        super(props);

    }

    render() {
        return (
            <div className="darken" onClick={this.props.toggleMenu}/>
        );
    }
}

export default DarkenScreen;
