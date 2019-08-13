import React, { useState, useEffect } from 'react';
import '../App.css';
import logoLoader from "../Images/logoLoaderGif.gif";
import logoLoaderWhite from "../Images/loaderLogoWhite.gif";
import classnames from "classnames";
import { Link } from 'react-router-dom';
import AssetAddedSuccess from "./AssetAddedSuccess";
import {getAllAssets, getSingleAssetData, addAssetToUser, assetFetching, resetLiveData,setLoading} from "../actions/assets";
import {connect} from "react-redux";


const AddAsset = ({
                      getAllAssets,
                      allAssets,
                      getSingleAssetData,
                      singleAssetData,
                      singleAssetLoading,
                      addAssetToUser,
                      assetFetching,
                      assetFetchingState,
                      auth,
                      resetLiveData,
                      setLoading,
                      assetAddingLoading
                  }) => {

    const [assetSuccess, setAssetState] = useState(false);
    const [queryFilter, setQueryFilter] = useState("");
    const [excludeSymbols, setExcludeSymbols] = useState("");


    const [formData, setFormData] = useState({
        name:"",
        id:"",
        purchasedAmount: "0",
        purchasedPrice:"0.00000000",
        purchasedPriceUsd:"0.00"
    });



    const { purchasedAmount,purchasedPrice,purchasedPriceUsd } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});


    const addAsset = async e => {
        e.preventDefault();
        if(singleAssetData) {
            const data = {
                id: singleAssetData.id,
                name: singleAssetData.name,
                symbol: singleAssetData.symbol,
                purchasedAmount: purchasedAmount,
                purchasedPrice: purchasedPrice,
                image: singleAssetData.image.large,
                purchasedPriceUsd: singleAssetData.market_data.current_price.usd
            };

            if(formData.purchasedAmount > 0 && (formData.purchasedPrice > 0 || formData.purchasedPriceUsd > 0)){
                await setLoading();
                await addAssetToUser(data);
                await setAssetState(true);
            }else{
                alert("values must be greater than zero")
            }
        }
    };



    const handleClick = (e,id) => {
        assetFetching();
        getSingleAssetData(id);
        setFormData({...formData,
            purchasedPrice:"0.00000000",
            purchasedPriceUsd:"0.00"
        })
    };


    const setQuery = e => {setQueryFilter(e)};


    const fillPriceFormWithCurrentPrice = (e) =>{
        setFormData({...formData,
            purchasedPrice:e.target.innerText
        })
    };

    const fillPriceFormWithCurrentPriceUsd = (e) =>{
        setFormData({...formData,
            purchasedPriceUsd:e.target.innerText
        })
    };

    const userAssetSymbols = () => {
        if(auth.user){
            let all = auth.user.assets.map(asset => asset.symbol);
            setExcludeSymbols(all)
        }
    };


    useEffect(() => {
        getAllAssets(excludeSymbols);
    }, [excludeSymbols]);

    useEffect( () => {
        userAssetSymbols();
    },[auth.user]);

    useEffect( () => {
        resetLiveData();
    },[]);



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
                    <div className="add--asset--input--container">
                        <input list="assets" className="add--asset--select--filter--input" placeholder="Search asset by symbol..." type="search"
                               onChange={e => setQuery(e.target.value)}/>
                    </div>
                    <div className="add--asset--select--filter">
                        <form>
                            <ul className="all--assets--list">
                                { allAssets ?
                                    allAssets.filter(a => a.symbol.toLowerCase().includes(queryFilter.toLowerCase())).map(function(asset) {
                                        return <li key={asset.id} onClick={e => handleClick(e,asset.id)}>{asset.symbol}</li>
                                    })
                                    : <img className="add--asset--list--loader" src={auth.theme === "LIGHT" ? logoLoader : logoLoaderWhite} alt="loader"/>}
                            </ul>
                        </form>
                    </div>
                </div>
                <div className="vertical--line--add--asset"/>
                <div className="add--asset--content--right">
                    {assetFetchingState ?
                    <div className="add--asset--content--right--loader--background">
                        <img className="add--asset--form--loader" src={auth.theme === "LIGHT" ? logoLoader : logoLoaderWhite} alt="loader" />
                    </div>
                    :null}
                    <form onSubmit={addAsset}>
                        <div className="add--asset--input--form">
                            <div>
                                <p>Name:</p>
                                <p>{!singleAssetLoading ? singleAssetData.name : null}</p>
                            </div>
                            <div>
                                <p>Current price {!singleAssetLoading && singleAssetData.id === "bitcoin" ?
                                    "(usd)": "(btc)"}:
                                </p>
                                {!singleAssetLoading && singleAssetData.id === "bitcoin" ?
                                    <p
                                        className="add--asset--current--price" onClick={ e => fillPriceFormWithCurrentPriceUsd(e)}>
                                        {!singleAssetLoading ? singleAssetData.market_data.current_price.usd.toFixed(2) : null}
                                    </p>
                                :
                                    <p
                                        className="add--asset--current--price" onClick={ e => fillPriceFormWithCurrentPrice(e)}>
                                        {!singleAssetLoading ? singleAssetData.market_data.current_price.btc.toFixed(8) : null}
                                    </p>
                                }
                            </div>
                            <label>
                                Purchased price {!singleAssetLoading && singleAssetData.id === "bitcoin" ?
                                "(usd)": "(btc)"}:
                                {!singleAssetLoading && singleAssetData.id === "bitcoin" ?
                                    <input
                                    type="text"
                                    name="purchasedPriceUsd"
                                    value={purchasedPriceUsd}
                                    onChange={e => onChange(e)}
                                    required
                                    />
                                :
                                    <input
                                        type="text"
                                        name="purchasedPrice"
                                        value={purchasedPrice}
                                        onChange={e => onChange(e)}
                                        required
                                    />
                                }
                            </label>
                            <label>
                                Purchased amount:
                                <input
                                    type="text"
                                    name="purchasedAmount"
                                    value={purchasedAmount}
                                    onChange={e => onChange(e)}
                                    required
                                />
                            </label>
                        </div>
                        <div className="add--asset--buttons--container">
                            <Link to="/home">
                                <button className="add--asset--cancel--button">Cancel</button>
                            </Link>
                            <button className="add--asset--accept--button">{!assetAddingLoading ?"Add" : <img className="button--loader--white" src={logoLoaderWhite} alt="loader"/>}</button>
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
    assetFetchingState: state.assets.assetFetching,
    auth: state.auth,
    assetAddingLoading:state.assets.assetAddingLoading
});

export default connect(mapStateToProps, { getAllAssets,getSingleAssetData,addAssetToUser,assetFetching,resetLiveData,setLoading})(AddAsset);

