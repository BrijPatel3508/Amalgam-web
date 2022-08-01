const Schema = require('../models/mongooseConnection');
const User = Schema.Users;

exports.getUsers = (req, res) => {
    User.find({})
        .then(users => {
            if (users.length === 0) {
                return res.status(404).send({ message: "Users Not found." });
            }
            const usersList = users.map(user => {
                return {
                    username: user.username,
                    email: user.email,
                    slid: user.slid,
                }
            })
            res.status(200).send({
                message: "Users Found",
                status: "success",
                data: usersList
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.deleteUser = (req, res) => {
    User.deleteOne({
        slid: req.params.slid
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({ status: "Failed", message: "User Not found." });
            }

            res.status(200).send({
                status: "Success",
                message: "Successfully Deleted User",
                data: user
            });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};