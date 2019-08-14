import React, {  } from 'react';
import '../App.css';
import {withRouter} from "react-router-dom";
import logoLoader from "../Images/logoLoaderGif.gif";
import logoLoaderWhite from "../Images/loaderLogoWhite.gif";
import {connect} from "react-redux";
import NumberFormat from "react-number-format";


const AssetDetails = ({ singleAssetData,auth }) => {

    return (
        <div className="asset--details--container">
            <div className="asset--details--inner--container">
                <div className="asset--blue--line"/>
                { singleAssetData ?
                    <div className="asset--details--content">
                        <div className="asset--details--image--name--container">
                            <img alt="asset" className="asset--details--image"
                                 src={singleAssetData.image.large}/>
                            <p className="asset--details--name">{singleAssetData.name}</p>
                        </div>
                        <div>
                            <p className="asset--detail--header">Market Cap</p>
                            <p><NumberFormat value={singleAssetData.market_data.market_cap.usd} displayType={'text'} thousandSeparator={true}/> $</p>
                            <p><NumberFormat value={singleAssetData.market_data.market_cap.btc} displayType={'text'} thousandSeparator={true}/> BTC</p>
                        </div>
                        <div>
                            <p className="asset--detail--header">Total Volume</p>
                            <p><NumberFormat value={singleAssetData.market_data.total_volume.usd} displayType={'text'} thousandSeparator={true}/> $</p>
                            <p><NumberFormat value={singleAssetData.market_data.total_volume.btc} displayType={'text'} thousandSeparator={true}/> BTC</p>
                        </div>
                        <div>
                            <p className="asset--detail--header">Circulating Supply</p>
                            <p><NumberFormat value={singleAssetData.market_data.circulating_supply.toFixed(2)} displayType={'text'} thousandSeparator={true}/> {singleAssetData.symbol}</p>
                        </div>
                        <div>
                            <p className="asset--detail--header">Rank</p>
                            <p>{singleAssetData.market_data.market_cap_rank}</p>
                        </div>

                    </div>
                    :
                    <div className="asset--detials--loader--container">
                        <img className="asset--details--top--loader" src={auth.theme === "LIGHT" ? logoLoader : logoLoaderWhite} alt="loader"/>
                    </div>}
            </div>
        </div>
    )
};



const mapStateToProps = state => ({
    auth: state.auth,
    singleAssetData: state.assets.singleAssetData
});

export default withRouter(connect(mapStateToProps, {  })(AssetDetails));


