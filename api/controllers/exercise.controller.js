const Exercise = require('../models/exercise.model')

module.exports.detail = (req, res, next) => {
    Exercise.findById(req.params.id)
        .then((exercise) => {
            if(exercise) {
                res.json(exercise)
            } else {
                res.status(404).json({message: "Exercise not found"})
            }
        })
        .catch((next))
}

module.exports.list = (req, res, next) => {
    const { title, bodyPart, equipment, target, secondaryMuscles, limit = 20, page = 0 } = req.query;

    const criterial = {};

    if (title) criterial.title = title;
    if (bodyPart) criterial.bodyPart = bodyPart;
    if (equipment) criterial.equipment = equipment;
    if (target) criterial.target = target;
    if (secondaryMuscles) criterial.secondaryMuscles = secondaryMuscles;
    
    Exercise.find(criterial)
      .sort({ _id: -1 })
      .skip(page * limit)
      .limit(limit)
      .then((exercises) => res.json(exercises))
      .catch(next);
  };

