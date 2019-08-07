import React, {  } from 'react';
import '../App.css';
import Note from "./Note";
import {connect} from "react-redux";

const Notes = ({ toggleAddNoteModal,userAssetData ,auth}) => {

        return (
            <div className="notes--container">
                <div className="notes--title--container">
                    <p className="notes--container--title">My Notes:</p>
                    { userAssetData && userAssetData.length ?
                        <button className="add--note--button" onClick={toggleAddNoteModal}>Add Note</button>
                     :null}
                </div>
                <div className="asset--blue--line"/>
                <div className="notes--content">
                    { userAssetData && userAssetData.length ?
                        userAssetData[0].notes.map( note => {
                            return <Note key={note._id} note={note.note}/>
                        })
                        : null}
                </div>
            </div>
        );
    };

const mapStateToProps = state => ({
auth:state.auth.user
});

export default connect(mapStateToProps, {  })(Notes);
