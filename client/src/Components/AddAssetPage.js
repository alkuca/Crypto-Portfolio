import React, { Component } from 'react';
import '../App.css';
import Navbar from "./Navbar";
import AddAsset from "./AddAsset";

class AddAssetPage extends Component {
    constructor(props){
        super(props);

    }

    render() {
        return (
            <div>
                <Navbar/>
                <div className="add--asset--page">
                    <div className="add--asset--container">
                        <AddAsset/>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddAssetPage;
