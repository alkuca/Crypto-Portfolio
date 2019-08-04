import React, {  } from 'react';
import '../App.css';
import {connect} from "react-redux";

const Note = ({ note }) => {

        return (
            <div className="note">
                <div className="note--content">
                    <p className="note--title">{note}</p>
                </div>
            </div>
        );
    };

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, {  })(Note);
