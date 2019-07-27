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
            purchasedAmount:req.body.purchasedAmount,
            purchasedPrice:req.body.purchasedPrice,
            image:req.body.image,
            purchasedPriceUsd:req.body.purchasedPriceUsd
        };

        await user.assets.unshift(newAsset);

        await user.save();

        res.json(newAsset);

    } catch (err){
        console.error(err.message);
        res.status(500).send('Server Error');
    }

});


module.exports = router;
