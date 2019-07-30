import React, { Component } from 'react';
import '../App.css';
import DarkenScreen from "./DarkenScreen";


class AddNoteModal extends Component {
    constructor(props){
        super(props);
        this.state = {

        };


    }


    render() {
        return (
            <div>
                <DarkenScreen/>
                <div className="add--transaction--modal">
                    <div className="add--transaction--container">
                        <div className="add--transaction--content">
                            <h2 className="add--transaction--title">Add Note for: BTC</h2>
                            <div className="add--note--form">
                                <form>
                                    <label>
                                        Note:
                                        <textarea rows="10" cols="60"
                                            name="note"
                                                  disabled
                                        />
                                    </label>
                                </form>
                            </div>
                            <div className="add--transaction--buttons--container">
                                <button onClick={this.props.toggleAddNoteModal} className="add--transaction--cancel--button">Cancel</button>
                                <button onClick={this.addNote} className="add--transaction--accept--button">Accept</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddNoteModal;
