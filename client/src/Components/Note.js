import React, { useState } from 'react';
import '../App.css';
import {connect} from "react-redux";
import classnames from "classnames";
import {loadUser} from "../actions/auth";
import {deleteNote} from "../actions/assets";
import Moment from 'react-moment';

const Note = ({ note,singleAssetData,deleteNote,loadUser,_id,date }) => {

    const [toggleNote, setToggleNote] = useState(false);

    const handleToggle = () => {
        setToggleNote(!toggleNote)
    };

    const handleDeleteNote = async () => {
        if(singleAssetData){
            const data = {
                assetId: singleAssetData.id,
                noteId: _id
            };
            await deleteNote(data);
            await loadUser();
        }
    };
        return (
            <div className={classnames("note", {
                "disable--hover": toggleNote
            })}>
                <div onClick={handleToggle} className="note--content">
                    <p className="note--title">{note}</p>
                </div>
                <div className={classnames("note--content--dropdown", {
                    "make--dropdown--visible" : toggleNote
                })}>
                    <div className={classnames("note--content--dropdown--content", {
                    "make--visible" : toggleNote
                })}>
                        <p className="note--date"><Moment format="DD.MM.YYYY">{date}</Moment></p>
                        <button onClick={handleDeleteNote} className="delete--note--button">Delete</button>
                    </div>
                </div>
            </div>
        );
    };

const mapStateToProps = state => ({
    singleAssetData: state.assets.singleAssetData
});

export default connect(mapStateToProps, { loadUser,deleteNote })(Note);
