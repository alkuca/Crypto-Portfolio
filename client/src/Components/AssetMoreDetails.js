import React, {useState} from 'react';
import '../App.css';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import TabDetails from "./TabDetails";
import TabLinks from "./TabLinks";
import TabSocial from "./TabSocial";
import classnames from "classnames";

const AssetMoreDetails = () => {

    const [tabDetails, setTabDetails] = useState(true);
    const [tabLinks, setTabLinks] = useState(false);
    const [tabSocial, setTabSocial] = useState(false);

    const toggleDetails = () => {
        setTabDetails(true);
        setTabLinks(false);
        setTabSocial(false);
    };

    const toggleLinks = () => {
        setTabDetails(false);
        setTabLinks(true);
        setTabSocial(false);
    };

    const toggleSocial = () => {
        setTabDetails(false);
        setTabLinks(false);
        setTabSocial(true);
    };



    return (
        <div className="more--details--container">
            <div className="more--details--inner--container">
                <div className="asset--blue--line z--index--1"/>
                <div className="more--details--content">
                    <div className="more--details--content--navbar">
                        <p onClick={toggleDetails} className={classnames("more--details--content--navbar--tab--button", {
                            "tab--active": tabDetails
                        })}>Details</p>
                        <p onClick={toggleLinks} className={classnames("more--details--content--navbar--tab--button", {
                            "tab--active": tabLinks
                        })}>Links</p>
                        <p onClick={toggleSocial} className={classnames("more--details--content--navbar--tab--button", {
                            "tab--active": tabSocial
                        })}>Social</p>
                    </div>
                    { tabDetails ?
                        <TabDetails/>
                        :
                        null
                    }
                    { tabLinks ?
                        <TabLinks/>
                        :
                        null
                    }
                    { tabSocial ?
                        <TabSocial/>
                        :
                        null
                    }
                </div>
            </div>
        </div>
    )
};



const mapStateToProps = state => ({
    auth: state.auth,
    singleAssetData: state.assets.singleAssetData
});

export default withRouter(connect(mapStateToProps, {  })(AssetMoreDetails));


