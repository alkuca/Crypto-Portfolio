import React, { Component } from 'react';
import '../App.css';
import Note from "./Note";

class Notes extends Component {
    constructor(props){
        super(props);

    }

    render() {
        return (
            <div className="notes--container">
                <p className="notes--container--title">My Notes:</p>
                <div className="asset--blue--line"/>
                <div className="notes--content">
                    <Note/>
                    <Note/>
                    <Note/>
                    <Note/>
                </div>
            </div>
        );
    }
}

export default Notes;
