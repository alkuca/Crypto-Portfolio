import React, { useState, useEffect } from 'react';
import '../App.css';
import liskImg from "../Images/liskImg.png";
import classnames from "classnames";
import { Link } from 'react-router-dom';
import AssetAddedSuccess from "./AssetAddedSuccess";
import {getAllAssets, getSingleAssetData} from "../actions/assets";
import {connect} from "react-redux";



const AddAsset = ({
                      getAllAssets,
                      allAssets,
                      allAssetsLoading,
                      getSingleAssetData,
                      singleAssetData,
                      singleAssetLoading
}) => {

    const [assetSuccess, setAssetState] = useState(false);
    const [queryFilter, setQueryFilter] = useState("");



    const [formData, setFormData] = useState({
        name:"",
        id:"",
        amount: "",
        price: "",
        date:""
    });



    const { amount,price,name,id,date } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});


    const addAsset = e => {
        e.preventDefault();

        setAssetState(true);
    };




    const handleClick = (e,id) => {
        getSingleAssetData(id);
        if(!singleAssetLoading){
            setFormData({...formData,
                price: singleAssetData.market_data.current_price.btc,
                id: singleAssetData.id,
                name:singleAssetData.name,
                date:Date.now()
            });
        }
    };


    const setQuery = e => {setQueryFilter(e)};



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
                                    <ul>
                                        { !allAssetsLoading ?
                                            allAssets.filter(a => a.symbol.toLowerCase().includes(queryFilter.toLowerCase())).map(function(asset) {
                                                return <li key={asset.id}  onClick={e => handleClick(e,asset.id)}>{asset.symbol}</li>
                                            })
                                            : null}
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
                            <form onSubmit={addAsset}>
                                <div className="add--asset--input--form">
                                    <label>
                                        Name
                                        <input
                                            type="text"
                                            name="amount"
                                            disabled
                                            value={name}
                                            onChange={e => onChange(e)}
                                        />
                                    </label>
                                    <label>
                                        Price(BTC):
                                        <input
                                            type="text"
                                            name="price"
                                            value={price}
                                            onChange={e => onChange(e)}
                                        />
                                    </label>
                                    <label>
                                        Amount:
                                        <input
                                            type="text"
                                            name="amount"
                                            value={amount}
                                            onChange={e => onChange(e)}
                                        />
                                    </label>
                                </div>
                                <div className="add--asset--buttons--container">
                                    <Link to="/">
                                        <button className="add--asset--cancel--button">Cancel</button>
                                    </Link>
                                    <button className="add--asset--accept--button">Accept</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    {assetSuccess ? <AssetAddedSuccess/> : null}
                </div>
        );
};

const mapStateToProps = state => ({
    allAssets: state.assets.allAssets,
    allAssetsLoading: state.assets.loading,
    singleAssetData: state.assets.singleAssetData,
    singleAssetLoading: state.assets.singleAssetLoading
});

export default connect(mapStateToProps, { getAllAssets,getSingleAssetData })(AddAsset);

