import React, { useState } from 'react';
import '../App.css';
import DarkenScreen from "./DarkenScreen";
import {connect} from "react-redux";
import {addTransactionToUserAsset} from "../actions/assets";
import {loadUser} from "../actions/auth";

const AddTransactionModal = ({ toggleAddTransactionModal,userAssetData,singleAssetData,singleAssetLoading,addTransactionToUserAsset }) => {

    const [formData, setFormData] = useState({
        name:"",
        id:"",
        purchasedAmount: "0",
        purchasedPrice:"0.00000000",
        purchasedPriceUsd:"0.00"
    });


    const { purchasedAmount,purchasedPrice,purchasedPriceUsd } = formData;

    const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});


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


    const addTransactionToUser = async e => {
        e.preventDefault();
        if(singleAssetData) {
            const data = {
                id: userAssetData[0].id,
                purchasedAmount: purchasedAmount,
                purchasedPrice: purchasedPrice,
                purchasedPriceUsd: singleAssetData.market_data.current_price.usd
            };
            if(formData.purchasedAmount > 0 && (formData.purchasedPrice > 0 || formData.purchasedPriceUsd > 0)) {
                await addTransactionToUserAsset(data);
                loadUser();
                toggleAddTransactionModal();
            }else{
                alert("values must be greater than zero");
            }
        }
    };


        return (
            <div>
                <DarkenScreen/>
                <div className="add--transaction--modal">
                    <div className="add--transaction--container">
                        <div className="add--transaction--content">
                            <h2 className="add--transaction--title">Add Transaction for: {userAssetData[0].symbol} </h2>
                            <div className="add--transaction--form">
                                <form onSubmit={addTransactionToUser}>
                                    <div className="add--transaction--current--price">
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
                                    <br />
                                    <label>
                                        Purchased amount
                                        <input
                                            type="text"
                                            name="purchasedAmount"
                                            value={purchasedAmount}
                                            onChange={e => onChange(e)}
                                            required
                                        />
                                    </label>
                                    <div className="add--transaction--buttons--container">
                                        <button onClick={toggleAddTransactionModal} className="add--transaction--cancel--button">Cancel</button>
                                        <button className="add--transaction--accept--button">Accept</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }


const mapStateToProps = state => ({
    singleAssetData: state.assets.singleAssetData,
    singleAssetLoading: state.assets.singleAssetLoading,
});

export default connect(mapStateToProps, { addTransactionToUserAsset })(AddTransactionModal);
