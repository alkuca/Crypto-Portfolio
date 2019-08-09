import React, {  } from 'react';
import '../App.css';
import Note from "./Note";
import {connect} from "react-redux";
import {
    CSSTransition,
    TransitionGroup,
} from 'react-transition-group';

const Notes = ({ toggleAddNoteModal,userAssetData }) => {

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
                    <TransitionGroup>
                    { userAssetData && userAssetData.length ?
                        userAssetData[0].notes.map( note => {
                            return <CSSTransition
                                    key={note._id}
                                    timeout={300}
                                    classNames="fade">
                                    <Note _id={note._id} key={note._id} note={note.note}/>
                                    </CSSTransition>
                        })
                        : null}
                    </TransitionGroup>
                </div>
            </div>
        );
    };

const mapStateToProps = state => ({
auth:state.auth.user
});

export default connect(mapStateToProps, {  })(Notes);
