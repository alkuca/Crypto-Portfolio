const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const User = require("../../models/User");


router.post("/", auth, async (req, res) => {

    try{
        const user = await User.findById(req.user.id).select('-password');

        const newAsset = {
            id:req.body.id,
            name:req.body.name,
            symbol:req.body.symbol,
            image:req.body.image,
            transactions:{
                purchasedAmount:req.body.purchasedAmount,
                purchasedPrice:req.body.purchasedPrice,
                purchasedPriceUsd:req.body.purchasedPriceUsd
            }
        };

        await user.assets.unshift(newAsset);

        await user.save();

        res.json(newAsset);

    } catch (err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});


router.post("/transaction", auth, async (req, res) => {
    try{
        const user = await User.findById(req.user.id);

        const newTransaction = {
            purchasedAmount:req.body.purchasedAmount,
            purchasedPrice:req.body.purchasedPrice,
            purchasedPriceUsd:req.body.purchasedPriceUsd
        };

       await user.assets.forEach(asset => {
            if(asset.id === req.body.id){
                asset.transactions.push(newTransaction)
            }
        });

        await user.save();
        res.json(newTransaction)

    } catch (err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.post("/note", auth, async (req, res) => {
    try{
        const user = await User.findById(req.user.id);

        const newNote = {
            note:req.body.note
        };

        await user.assets.forEach(asset => {
            if(asset.id === req.body.id){
                asset.notes.push(newNote)
            }
        });

        await user.save();
        res.json(newNote)

    } catch (err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.delete("/transaction", auth, async (req, res) => {
    try{
        const user = await User.findById(req.user.id);

        await user.assets.forEach((asset,index) => {
            if(asset.id === req.body.assetId){
                asset.transactions.forEach((transaction, index) => {
                    if(JSON.stringify(transaction._id) === JSON.stringify(req.body.transactionId)){
                        asset.transactions.splice(index, 1);
                    }
                });
                if(!asset.transactions.length){
                    user.assets.splice(index,1);
                    res.json(asset.transactions)
                }
            }
        });

        await user.save();

    } catch (err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;
