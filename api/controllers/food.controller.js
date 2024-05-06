const Food = require('../models/food.model')

module.exports.detail = (req, res, next) => {
    Food.findById(req.params.id)
        .then((food) => {
            if(food) {
                res.json(food)
            } else {
                res.status(404).json({message: "Food not found"})
            }
        })
        .catch((next))
}

module.exports.list = (req, res, next) => {
    const {name, limit = 20, page = 0 } = req.query;

    const criterial = {};

    if (name) criterial.name = name;

    Food.find(criterial)
      .sort({ _id: -1 })
      .skip(page * limit)
      .limit(limit)
      .then((food) => res.json(food))
      .catch(next);
  };
