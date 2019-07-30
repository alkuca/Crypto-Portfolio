const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const auth = require("../../middleware/auth");

const User = require("../../models/User");

router.post("/",
    [
        check('username', 'Name is required')
            .not()
            .isEmpty(),
        check('email', "Please include a valid Email")
            .isEmail(),
        check('password', "Please enter a password with 6 or more characters")
            .isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password} = req.body;

        try{
            let user = await User.findOne({ email });
            if(user){
               return res.status(400).json({ errors: [{ msg: "user already exists" }] });
            }

            user = new User({
                username,
                email,
                password
            });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                config.get("jwtSecret"),
                {expiresIn: 360000},
                (err, token) => {
                    if(err) throw err;
                    res.json({ token });
                }
            );
        }catch(err) {
            console.log(err.message);
            res.status(500).send("server error")
        }

    });


router.patch("/theme", auth,
    (req, res) => {
        User.findByIdAndUpdate({_id: req.user.id})
            .then(user => {
                if(!user){
                    return res.status(404).json({ message: "User not found" })
                } else {
                    user.theme = req.body.theme
                    user.save()
                    return res.json({ message: "Theme changed" })
                }
            })
            .catch(err => console.log(err))
    }
)



module.exports = router;
