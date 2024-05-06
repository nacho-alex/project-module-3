const User = require("../models/user.model")
const mongoose = require('mongoose')

module.exports.create = (req, res, next) => {
    User.create(req.body)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).json(err.errors);
        console.log(err)
      } else {
        next(err);
      }
    });
}

module.exports.profile = (req, res) => {
  res.json(req.user);
};

module.exports.update = (req, res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  })
    .then((user) => {
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).json(err.errors);
      } else {
        next(err);
      }
    });
};

module.exports.delete = (req, res, next) => {
  User.findByIdAndDelete(req.params.id)
    .then((user) => {
      if (user) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "User not found" });
      }
    })
    .catch(next);
};
