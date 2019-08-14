import React, {  } from 'react';
import '../App.css';
import {withRouter} from "react-router-dom";
import {connect} from "react-redux";
import { TwitterTimelineEmbed } from 'react-twitter-embed';
import NumberFormat from 'react-number-format';


const TabSocial = ({singleAssetData}) => {

    return (
        <div className="more--details--content--details">
            {singleAssetData ?
                <div>
                    {singleAssetData.community_data.facebook_likes > 0 ?
                        <p><span className="bold">Facebook likes: </span>
                            <NumberFormat value={singleAssetData.community_data.facebook_likes} displayType={'text'} thousandSeparator={true}/>
                        </p>
                        : null}
                    {singleAssetData.community_data.twitter_followers > 0 ?
                        <p><span className="bold">Twitter followers: </span>
                            <NumberFormat value={singleAssetData.community_data.twitter_followers} displayType={'text'} thousandSeparator={true} />
                        </p>
                        : null}
                    {singleAssetData.community_data.reddit_average_posts_48h ?
                        <p><span
                            className="bold">Reddit average posts(48h): </span>
                            {singleAssetData.community_data.reddit_average_posts_48h}
                        </p>
                        : null}
                    {singleAssetData.community_data.reddit_average_comments_48h ?
                        <p><span
                            className="bold">Reddit average comments(48h): </span>
                            {singleAssetData.community_data.reddit_average_comments_48h}
                        </p>
                        : null}
                    {singleAssetData.community_data.reddit_subscribers ?
                        <p><span
                            className="bold">Reddit subscribers: </span>
                            <NumberFormat value={singleAssetData.community_data.reddit_subscribers} displayType={'text'} thousandSeparator={true} />
                        </p>
                        : null}
                    {singleAssetData.community_data.telegram_channel_user_count > 0 ?
                        <p><span
                            className="bold">Telegram users: </span>
                            <NumberFormat value={singleAssetData.community_data.telegram_channel_user_count} displayType={'text'} thousandSeparator={true} />
                        </p>
                        : null}
                </div>
            :null}
            <div className="twitter--embed">
                <TwitterTimelineEmbed
                    sourceType="profile"
                    screenName={singleAssetData.links.twitter_screen_name? singleAssetData.links.twitter_screen_name : null}
                    options={{height: 700}}
                />
            </div>
        </div>
    )
};



const mapStateToProps = state => ({
    singleAssetData: state.assets.singleAssetData
});

export default withRouter(connect(mapStateToProps, {  })(TabSocial));


