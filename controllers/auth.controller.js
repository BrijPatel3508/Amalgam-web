const Schema = require('../models/mongooseConnection');
const config = require("../configs/auth.config");
const User = Schema.Users;
const { v4: uuidv4 } = require('uuid');

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    // Save User to Database
    const reqUser = req.body.user;
    User.create({
        username: reqUser.username,
        email: reqUser.email,
        userType: reqUser.userType,
        slid: uuidv4(),
        password: bcrypt.hashSync(reqUser.password, 8)
    })
        .then(user => {
            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 3600 // 1 hour
            });

            const userFinal = {
                id: user.id,
                username: user.username,
                email: user.email,
                accessToken: token
            }

            res.status(200).send({
                status: "Success",
                message: "User registered successfully!",
                data: userFinal
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.signin = (req, res) => {
    User.findOne({
        username: { $regex: new RegExp("^" + req.body.username.toLowerCase(), "i") }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ status: "Failed", message: "User Not found." });
            }
            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    accessToken: null,
                    status: "Failed",
                    message: "Password is Invalid Try Again",
                });
            }

            var token = jwt.sign({ id: user.id }, config.secret, {
                expiresIn: 3600 // 1 hour
            });

            const userFinal = {
                id: user.id,
                username: user.username,
                email: user.email,
                accessToken: token
            }

            res.status(200).send({
                status: "Success",
                message: "Successfully Logged In",
                data: userFinal
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};
