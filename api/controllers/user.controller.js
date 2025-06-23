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
  
  User.findByIdAndUpdate(req.user.id, req.body, {
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


module.exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return res.status(401).json({ message: "invalid username" });

    const match = await user.checkPassword(req.body.password);
    if (!match) return res.status(401).json({ message: "invalid password" });

    const accessToken = jwt.sign(
      {
        sub: user.id,
        exp: Math.floor(Date.now() / 1000) + 9000,
      },
      process.env.JWT_SECRET
    );

    res.json({ accessToken });

    // Aquí rellenas la base de datos sin bloquear el login
    const { createEntries } = require("../bin/seeds.js");
    try {
      await createEntries(user.id);
      console.log("Datos de prueba insertados");
    } catch (error) {
      console.warn("Error insertando datos de prueba:", error);
    }
  } catch (error) {
    next(error);
  }
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

module.exports.mymeals = (req, res, next) => {
    User.findById(req.user.id)
      .then((user) => {
        const myMeals = user.myMeals
        res.json(myMeals) 
      })
}

module.exports.deleteMeal =  (req, res, next) => {
  const userId = req.user.id; 
  const mealName = req.params.name;

    
    User.findOneAndUpdate(
          { _id: userId },
          { $pull: { myMeals: { name: mealName } } },
          { new: true } 
      )
      .then((updatedUser) => {
        res.json(updatedUser);
      })
      .catch(next)

};

