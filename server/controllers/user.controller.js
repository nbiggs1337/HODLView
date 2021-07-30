const { User } = require("../models/user.model");
const { Coin } = require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt.config');

module.exports = {

    register: (req, res) => {
        User.findOne({ email: req.body.email })
            .then(data => {
                if (data) {
                    res.json({ email: { message: "Email already taken" } });
                }
                else {
                    User.create(req.body)
                        .then(data => {
                            res.cookie("usertoken", jwt.sign({ id: data._id }, secret), {
                                httpOnly: true,
                                expires: new Date(Date.now() + 90000000000)
                            }).json({
                                msg: "success",
                                userLogged: {
                                    username: data.username,
                                    _id: data._id
                                }
                            })
                        })
                        .catch(err => {
                            res.json(err)
                        })

                }
            })
            .catch(err => res.json(err.errors))
    },


    login: (req, res) => {
        User.findOne({ email: req.body.email })
            .then(user => {
                if (user === null) {
                    res.json({ msg: "Invalid Login attempt" })
                }
                else {
                    bcrypt.compare(req.body.password, user.password)
                        .then(validPass => {
                            if (validPass) {
                                res.cookie('usertoken', jwt.sign({ _id: user._id }, secret), { httpOnly: true })
                                    .json({ msg: 'success' })
                            }
                            else {
                                res.json({ msg: "Invalid Login attempt" })
                            }
                        })
                        .catch(err => res.json({ msg: 'Invalid Login attempt', err }))
                }
            })
            .catch(err => res.json(err))
    },

    logout: (req, res) => {
        res.clearCookie('usertoken');
        res.sendStatus(200);
    },

    authUser: (req, res) => {
        const decodedJWT = jwt.decode(req.cookies.usertoken, { complete: true });
        User.findById(decodedJWT.payload._id)
            .then(Luser => res.json({ user: Luser }))
            .catch(err => res.json(err))
    },

    manualadd: (req, res) => {
        User.create(req.body)
            .then(newUser => res.json(newUser))
            .catch(err => res.json(err))
    },

    userIndex: (req, res) => {
        User.find()
            .then(data => res.json({ data }))
            .catch(err => res.json({ err }))
    },
    oneUser: (req, res) => {
        User.findOne({ _id: req.params._id })
            .then(data => res.json({ data }))
            .catch(err => res.json({ err }))
    },
    updateUser: (req, res) => {
        User.findOneAndUpdate({ _id: req.params._id }, req.body, { useFindAndModify: true, runValidators: true })
            .then(data => res.json({ data }))
            .catch(err => res.json({ err }))
    },
    updateUserPass: (req, res) => {
        let user = req.body;
        user.password = bcrypt.hash(user.password, 10)
            .then(hash => {user.password = hash
            User.findOneAndUpdate({ _id: req.params._id }, user, { useFindAndModify: true, runValidators: true })
            .then(data => res.json({ data }))
            .catch(err => res.json({ err }))
        });
    },
    
    destroyUser: (req, res) => {
        User.deleteOne({ _id: req.params._id })
            .then(data => res.json({ data }))
            .catch(err => res.json({ err }))
    },

    addUserCoin: (req, res) => {
        console.log(req.body)
        Coin.create(req.body)
            .then(newCoin => {
                console.log(newCoin)
                User.findByIdAndUpdate({ _id: req.params._id }, { $push: { 'cryptos': newCoin } })
                    .then(data => res.json({ data }))
                    .catch(err => res.json({ err }))
            })
            .catch(err => res.json({ err }))
    },
    destroyUserCoin: (req, res) => {
        Coin.findById({ _id: req.params.coinid })
            .then(deadcoin => {
                console.log(deadcoin)
                User.findByIdAndUpdate({ _id: req.params._id }, { $pull: { 'cryptos': deadcoin } })
                    .then(data => res.json({ data }))
                    .catch(err => res.json({ err }))
            })
    },
    updateUserCoin: (req, res) => {
        Coin.findById({ _id: req.params.coinid })
            .then(oldCoin => {
                User.findByIdAndUpdate({ _id: req.params._id }, { $pull: { 'cryptos': oldCoin } })
                    .then(user => {
                        Coin.create(req.body)
                            .then(newCoin => {
                                User.findByIdAndUpdate({ _id: req.params._id }, { $push: { 'cryptos': newCoin } })
                                    .then(res => res.json(res))
                                    .catch(err => res.json(err))
                            })
                            .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err))
            })
            .catch(err => console.log(err))
        // User.findByIdAndUpdate({ _id: req.params._id }, { $pull: { 'cryptos': req.params.coinid } })
        //     .then(user => {
        //         console.log(user)
        //         User.findByIdAndUpdate({ _id: req.params._id }, { $push: { 'cryptos': req.body } })
        //             .then(res => res.json({ res }))
        //             .catch(err => res.json({ err }))
        //     })
        //     .catch(err => res.json({ err }));
    }


}

