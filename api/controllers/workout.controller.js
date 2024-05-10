const Workout = require("../models/workout.model")
const mongoose = require('mongoose')

module.exports.create = (req, res, next) => {
    Workout.create(req.body)
    .then((work) => {
      res.json(work);
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

    Workout.find(criterial)
      .sort({ _id: -1 })
      .skip(page * limit)
      .limit(limit)
      .then((work) => res.json(work))
      .catch(next);
  };

module.exports.detail = (req, res, next) => {
    Workout.findById(req.params.id)
        .then((work) => {
            if (work) {
                res.json(work);
              } else {
                res.status(404).json({ message: "Workout not found" });
              }
        })
        .catch((error) => {
          console.log(error)
        })
};

module.exports.update = (req, res, next) => {
  Workout.findByIdAndUpdate(req.params.id, req.body, {
    runValidators: true,
    new: true,
  })
    .then((work) => {
      if (work) {
        res.json(work);
      } else {
        res.status(404).json({ message: "Workout not found" });
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
  Workout.findByIdAndDelete(req.params.id)
    .then((work) => {
      if (work) {
        res.status(204).send();
      } else {
        res.status(404).json({ message: "Workout not found" });
      }
    })
    .catch(next);
};
