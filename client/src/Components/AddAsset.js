import React, { useState, useEffect } from 'react';
import '../App.css';
import liskImg from "../Images/liskImg.png";
import logoLoader from "../Images/logoLoaderGif.gif";
import classnames from "classnames";
import { Link } from 'react-router-dom';
import AssetAddedSuccess from "./AssetAddedSuccess";
import {getAllAssets, getSingleAssetData, addAssetToUser,assetFetching} from "../actions/assets";
import {connect} from "react-redux";



const AddAsset = ({
                      getAllAssets,
                      allAssets,
                      allAssetsLoading,
                      getSingleAssetData,
                      singleAssetData,
                      singleAssetLoading,
                      addAssetToUser,
                      assetFetching,
                      assetFetchingState
                  }) => {

    const [assetSuccess, setAssetState] = useState(false);
    const [queryFilter, setQueryFilter] = useState("");



    const [formData, setFormData] = useState({
        name:"",
        id:"",
        purchasedAmount: "0",
        purchasedPrice:"0.00000000"
    });



    const { purchasedAmount,purchasedPrice,name,id } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});


    const addAsset = async e => {
        e.preventDefault();

        const data = {
            name:singleAssetData.name,
            symbol:singleAssetData.symbol,
            purchasedAmount:purchasedAmount,
            purchasedPrice:purchasedPrice,
            image:singleAssetData.image.large
        };

        await addAssetToUser(data);

        setAssetState(true);
    };



    const handleClick = (e,id) => {
        assetFetching();
        getSingleAssetData(id);
        setFormData({...formData,
            purchasedPrice:"0.00000000"
        })
    };

    const setQuery = e => {setQueryFilter(e)};


    const fillPriceFormWithCurrentPrice = (e) =>{
        setFormData({...formData,
            purchasedPrice:e.target.innerText
        })
    };



    useEffect(() => {
        getAllAssets();
    }, []);


    return (
        <div className="add--asset--content">
            <div className={classnames("add--asset--blue--line", {
                "asset--added--animate": assetSuccess
            })}/>
            <div className={classnames("add--asset--inner--content", {
                "fade--out": assetSuccess
            })}>
                <div className="add--asset--content--left">
                    <p className="add-asset--content--left--title">Add Asset to my portfolio</p>
                    <div className="add--asset--select--filter">
                        <form>
                            <input list="browsers" placeholder="Search asset by symbol..." type="search"  onChange={e => setQuery(e.target.value)
                            }/>
                            <ul className="all--assets--list">
                                { !allAssetsLoading ?
                                    allAssets.filter(a => a.symbol.toLowerCase().includes(queryFilter.toLowerCase())).map(function(asset) {
                                        return <li key={asset.id}  onClick={e => handleClick(e,asset.id)}>{asset.symbol}</li>
                                    })
                                    : <img className="add--asset--list--loader" src={logoLoader} alt="loader"/>}
                            </ul>
                        </form>
                    </div>
                    <div className="add--asset--select--image--container">
                        <div className="add--asset--select--image--content">
                            <img className="add--asset--image" alt="lisk image" src={liskImg}/>
                        </div>
                    </div>
                </div>
                <div className="vertical--line--add--asset"/>
                <div className="add--asset--content--right">
                    {assetFetchingState ?
                    <div className="add--asset--content--right--loader--background">
                        <img className="add--asset--form--loader" src={logoLoader} alt="loader" />
                    </div>
                    :null}
                    <form onSubmit={addAsset}>
                        <div className="add--asset--input--form">
                            <div>
                                <p>Name:</p>
                                <p>{!singleAssetLoading ? singleAssetData.name : null}</p>
                            </div>
                            <div>
                                <p>Current price:</p>
                                <p
                                    className="add--asset--current--price" onClick={ e => fillPriceFormWithCurrentPrice(e)}>
                                    {!singleAssetLoading ? singleAssetData.market_data.current_price.btc : null}
                                </p>
                            </div>
                            <label>
                                Purchased price:
                                <input
                                    type="text"
                                    name="purchasedPrice"
                                    value={purchasedPrice}
                                    onChange={e => onChange(e)}
                                />
                            </label>
                            <label>
                                Purchased amount:
                                <input
                                    type="text"
                                    name="purchasedAmount"
                                    value={purchasedAmount}
                                    onChange={e => onChange(e)}
                                />
                            </label>
                        </div>
                        <div className="add--asset--buttons--container">
                            <Link to="/home">
                                <button className="add--asset--cancel--button">Cancel</button>
                            </Link>
                            <button className="add--asset--accept--button">Add</button>
                        </div>
                    </form>
                </div>
            </div>
            {assetSuccess ? <AssetAddedSuccess symbol={singleAssetData.symbol} purchasedAmount={purchasedAmount} image={singleAssetData.image.large}/> : null}
        </div>
    );
};

const mapStateToProps = state => ({
    allAssets: state.assets.allAssets,
    allAssetsLoading: state.assets.loading,
    singleAssetData: state.assets.singleAssetData,
    singleAssetLoading: state.assets.singleAssetLoading,
    assetFetchingState: state.assets.assetFetching
});

export default connect(mapStateToProps, { getAllAssets,getSingleAssetData,addAssetToUser,assetFetching})(AddAsset);

