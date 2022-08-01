const Schema = require('../models/mongooseConnection');
const User = Schema.Users;

const checkDuplicateUsernameOrEmail = (req, res, next) => {
  //UserName
  const reqUser = req.body.user;
  User.findOne({
    username: reqUser.username
  }).then(user => {
    console.log(user);
    if (user) {
      res.status(400).send({
        message: "Failed! Username is already in use!"
      });
      return;
    }

    // Email
    User.findOne({
      email: reqUser.email
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
        return;
      }

      next();
    });
  });
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
};

module.exports = verifySignUp;
