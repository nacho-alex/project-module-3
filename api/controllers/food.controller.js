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
    Food.find()
        .sort({ name: 1 })
        .then((food) => res.json(food))
        .catch(next);
};