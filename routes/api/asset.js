const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

const User = require("../../models/User");


router.post("/", auth, async (req, res) => {

    try{

        const user = await User.findById(req.user.id).select('-password');

        const newAsset = {
            name:req.body.name,
            amount:req.body.amount
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
