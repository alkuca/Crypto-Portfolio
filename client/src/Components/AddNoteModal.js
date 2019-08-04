import React, { useState } from 'react';
import '../App.css';
import DarkenScreen from "./DarkenScreen";
import {connect} from "react-redux";
import {addNoteToUserAsset} from "../actions/assets";

const AddNoteModal = ({ toggleAddNoteModal,addNoteToUserAsset,singleAssetData,userAssetData }) => {

    const [formData, setFormData] = useState({
        note:"",
        id:""
    });

    const { note } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

    const addNoteToUser = async e => {
        e.preventDefault();
        if(singleAssetData) {
            const data = {
                id: userAssetData[0].id,
                note: note,
            };
            await addNoteToUserAsset(data);
            toggleAddNoteModal();
        }
    };


        return (
            <div>
                <DarkenScreen/>
                <div className="add--transaction--modal">
                    <div className="add--transaction--container">
                        <div className="add--transaction--content">
                            <h2 className="add--transaction--title">Add Note for: BTC</h2>
                            <div className="add--note--form">
                                <form onSubmit={addNoteToUser}>
                                    <label>
                                        Note:
                                        <textarea rows="10" cols="60"
                                                  name="note"
                                                  value={note}
                                                  onChange={e => onChange(e)}
                                                  required
                                        />
                                    </label>
                                    <div className="add--transaction--buttons--container">
                                        <button onClick={toggleAddNoteModal} className="add--transaction--cancel--button">Cancel</button>
                                        <button className="add--transaction--accept--button">Accept</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

const mapStateToProps = state => ({
    singleAssetData: state.assets.singleAssetData,
    singleAssetLoading: state.assets.singleAssetLoading,
});

export default connect(mapStateToProps, { addNoteToUserAsset })(AddNoteModal);
