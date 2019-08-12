

const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator/check');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const auth = require("../../middleware/auth");

const User = require("../../models/User");

const nodemailer = require("nodemailer");


const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: keys.user,
        pass: keys.pass
    }
})


router.post("/",
    [
        check('username', 'username is required')
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
               return res.status(400).json({ errors: [{ msg: "Email is already taken" }] });
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
            };

            jwt.sign(
                payload,
                keys.jwtSecret,
                {expiresIn: 360000},
                (err, token) => {
                    if(err) throw err;
                    res.json({ token });
                }
            );

            const emailToken = jwt.sign(
                payload,
                keys.jwtSecret,
                {
                    expiresIn: 360000
                }
            );

            const url = `http://localhost:5000/users/confirmation/${emailToken}`;

            await transporter.sendMail ({
                to: user.email,
                subject: 'Confirm your Email',
                html: `Please click the link to confirm your email and login <a href="${url}">${url}</a>`
            });


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
);

router.patch("/refresh", auth,
    (req, res) => {
        User.findByIdAndUpdate({_id: req.user.id})
            .then(user => {
                if(!user){
                    return res.status(404).json({ message: "User not found" })
                } else {
                    user.autoRefresh = req.body.autoRefresh;
                    user.save();
                    return res.json({ message: "auto refresh toggled" })
                }
            })
            .catch(err => console.log(err))
    }
);




router.get("/confirmation/:token", async (req, res) => {
    try{
        const decoded = jwt.verify(req.params.token,keys.jwtSecret,);
        req.user = decoded.user;
        User.findByIdAndUpdate({_id: req.user.id})
            .then(user => {
                if(!user){
                    return res.status(404).json({ message: "User not found" })
                } else {
                    user.emaillConfirmed = true
                    user.save()
                    return res.redirect("http://altposit.com/login")
                }
            })
            .catch(err => console.log(err))

    }catch{
        res.send("error")
    }
});


router.post("/request_password_reset",
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email } = req.body;

        try{
            let user = await User.findOne({ email });
            if(!user){
                return res.status(400).json({ errors: [{ msg: "user does not exists" }] });
            }


            const payload = {
                user: {
                    id: user.id
                }
            };

            const emailToken = jwt.sign(
                payload,
                keys.jwtSecret,
                {
                    expiresIn: 360000
                }
            );



            const url = `http://altposit.com/users/request_password_reset/${emailToken}`;

            await transporter.sendMail ({
                to: user.email,
                subject: 'Password Reset',
                html: `Please click the link to reset your password: <a href="${url}">${url}</a>`
            });

            await res.json(`Email sent to ${user.email}`)



        }catch(err) {
            console.log(err.message);
            res.status(500).send("server error")
        }

    });


router.get("/request_password_reset/:token", async (req, res) => {
    try{
        const decoded = jwt.verify(req.params.token,keys.jwtSecret,);
        req.user = decoded.user;
        User.findByIdAndUpdate({_id: req.user.id})
            .then(user => {
                if(!user){
                    return res.status(404).json({ message: "User not found" })
                } else {
                    user.requestedPasswordReset = true;
                    user.save();

                    return res.redirect(`http://altposit.com/reset/${req.params.token}`)
                }
            })
            .catch(err => console.log(err))

    }catch{
        res.send("error")
    }
});



//Reset password
router.patch("/reset",
    [
        check('newPassword', "Please enter a password with 6 or more characters")
            .isLength({ min: 6 })
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { newPassword, token } = req.body;

        try{
            const decoded = jwt.verify(token,keys.jwtSecret,);
            req.user = decoded.user;

            let user = await User.findByIdAndUpdate({ _id: req.user.id });

            const salt = await bcrypt.genSalt(10);

            user.password = await bcrypt.hash(newPassword, salt);

            await user.save();

            await res.json("password changed")

        }catch(err) {
            console.log(err.message);
            res.status(500).send("server error")
        }

    });




module.exports = router;
