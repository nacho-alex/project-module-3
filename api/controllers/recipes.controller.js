const Recipe = require("../models/recipe.model");
const mongoose = require('mongoose');

module.exports.create = (req, res, next) => {
    Recipe.create(req.body)
    .then((recip) => {
      res.json(recip);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        res.status(400).json(err.errors);
      } else {
        next(err);
      }
    });
}

module.exports.list = (req, res, next) => {
    const {name, limit = 20, page = 0 } = req.query;

    const criterial = {};

    if (name) criterial.name = name;

    Recipe.find(criterial)
      .sort({ _id: -1 })
      .skip(page * limit)
      .limit(limit)
      .then((recipes) => res.json(recipes))
      .catch(next);
  };

module.exports.detail = (req, res) => {
    Recipe.findById(req.params.id)
        .then((rec) => {
            if (rec) {
                res.json(rec);
              } else {
                res.status(404).json({ message: "Recipe not found" });
              }
        })
        .catch(next)
};

module.exports.update = (req, res, next) => {
  Recipe.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  })
    .then((rec) => {
      if (rec) {
        res.json(rec);
      } else {
        res.status(404).json({ message: "Recipe not found" });
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
  Recipe.findByIdAndDelete(req.params.id)
    .then((rec) => {
      if (rec) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Recipe not found" });
      }
    })
    .catch(next);
};
