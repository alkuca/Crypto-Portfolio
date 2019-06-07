import React, { Component } from 'react';
import '../App.css';

class Note extends Component {
    constructor(props){
        super(props);

    }

    render() {
        return (
            <div className="note">
                <div className="note--content">
                    <p className="note--title">Lorem ipsum adipiscing elit ...</p>
                </div>
            </div>
        );
    }
}

export default Note;
