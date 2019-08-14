import React, {  } from 'react';
import '../App.css';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";


const TabDetails = ({singleAssetData}) => {

    return (
        <div className="more--details--content--details">
            {  singleAssetData ?
                <div>
                    <p><span className="bold">Symbol:</span> {singleAssetData.symbol}</p>
                    <p><span className="bold">Category:</span> {singleAssetData.categories[0]}</p>
                    <p><span className="bold">Country origin:</span> {singleAssetData.country_origin}</p>
                    <p><span className="bold">Description:</span> {singleAssetData.description.en.replace(/(<a.*?>)|<\/a>/g, '')}</p>
                </div>
            :null}
        </div>
    )
};



const mapStateToProps = state => ({
    singleAssetData: state.assets.singleAssetData
});

export default withRouter(connect(mapStateToProps, {  })(TabDetails));


