const User = require("../models/user.model");
const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

module.exports.create = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((existingUser) => {
      if (existingUser) {
        return res.status(400).json({ message: 'Username already exists' });
      } else {
        return User.create(req.body)
          .then((user) => {
            res.json(user);
          })
          .catch((err) => {
            if (err instanceof mongoose.Error.ValidationError) {
              res.status(400).json(err.errors);
            } else {
              next(err);
            }
          });
      }
    })
    .catch(next);
};

module.exports.profile = (req, res) => {
  res.json(req.user);
};

module.exports.update = (req, res, next) => {
  console.log(req.body)
  User.findByIdAndUpdate(req.body.id, req.body, {
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

module.exports.login = (req, res, next) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user) {
        user
          .checkPassword(req.body.password)
          .then((match) => {
            if (match) {
              const accessToken = jwt.sign(
                {
                  sub: user.id,
                  exp: Date.now() / 1000 + 5000,
                },
                process.env.JWT_SECRET
              );
              res.json({ accessToken });
            } else {
              res.status(401).json({ message: "invalid password" });
            }
          })
          .catch(next);
      } else {
        res.status(401).json({ message: "invalid username" });
      }
    })
    .catch(next);
};


module.exports.newMeal = (req, res, next) => {
  
  User.findByIdAndUpdate(
    req.user.id,
    { $push: { myMeals: req.body } }, 
    { runValidators: true, new: true }
  )
    .then((updatedUser) => {
      res.status(200).json(updatedUser);
      console.log(updatedUser)})
    .catch(next);
};


module.exports.dayMeal = (req, res, next) => {
  
  User.findByIdAndUpdate(
    req.user.id,
    { $push: { dayMeals: req.body } }, 
    { runValidators: true, new: true }
  )
    .then((updatedUser) => {
      res.status(200).json(updatedUser);
      console.log(updatedUser)})
    .catch(next);
};


module.exports.dayMealDelete = (req, res, next) => {
  console.log('hola')
  User.findByIdAndUpdate(
    req.user.id,
    { $pop: { dayMeals: 1 } }, 
    { new: true }
  )
    .then((updatedUser) => {
      res.status(200).json(updatedUser);
      console.log(updatedUser);
    })
    .catch(next);
};
