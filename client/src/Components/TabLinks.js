import React, {  } from 'react';
import '../App.css';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";


const TabLinks = ({singleAssetData}) => {

    return (
        <div className="more--details--content--details">
            {singleAssetData ?
                <div>
                    { singleAssetData.links.homepage ?
                        <p><span className="bold">Official Website:</span> <a href={singleAssetData.links.homepage[0]}>{singleAssetData.links.homepage[0]}</a></p>
                        :null}
                    { singleAssetData.links.blockchain_site ?
                        <p><span className="bold">Blockchain Website:</span> <a href={singleAssetData.links.blockchain_site[0]}>{singleAssetData.links.blockchain_site[0]}</a></p>
                        :null}
                    { singleAssetData.links.chat_url[0] ?
                        <p><span className="bold">Chat/Discord:</span> <a href={singleAssetData.links.chat_url[0]}>{singleAssetData.links.chat_url[0]}</a></p>
                        :null}
                    { singleAssetData.links.announcement_url ?
                        <p><span className="bold">Latest Official News:</span> <a href={singleAssetData.links.announcement_url[0]}>{singleAssetData.links.announcement_url[0]}</a></p>
                        :null}
                    { singleAssetData.links.subreddit_url ?
                        <p><span className="bold">Reddit:</span> <a href={singleAssetData.links.subreddit_url}>{singleAssetData.links.subreddit_url}</a></p>
                        :null}
                    { singleAssetData.links.repos_url.github ?
                        <p><span className="bold">Github:</span> <a href={singleAssetData.links.repos_url.github[0]}>{singleAssetData.links.repos_url.github[0]}</a></p>
                        :null}
                </div>
            :null}
        </div>
    )
};



const mapStateToProps = state => ({
    singleAssetData: state.assets.singleAssetData
});

export default withRouter(connect(mapStateToProps, {  })(TabLinks));


