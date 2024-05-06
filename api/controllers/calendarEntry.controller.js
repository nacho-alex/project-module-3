const CalendarEntry = require("../models/calendarEntry.model")
const dayjs = require("dayjs")
const User = require("../models/user.model")

module.exports.create = (req, res, next) => {
    CalendarEntry.find({"owner": req.user.id, "date": dayjs().format('dddd, D, MMMM, YYYY')})
        .then((entry) => {
            if (!entry) {
                return User.findById(req.user.id)
                    .populate({
                        path: 'planning',
                        populate: {
                                path: 'exercises.exercise',
                                model: 'Exercise'
                            }
                        })
                    .then((user) => {
                        return CalendarEntry.create({exercises: user.planning.exercises, date: dayjs().format('dddd, D, MMMM, YYYY'), owner: req.user.id})
                    })
            }
        })
}


module.exports.detail = (req, res, next) => {
    CalendarEntry.find({"owner": req.user.id, "date": dayjs().format('dddd, D, MMMM, YYYY')})
        .then((entry) => {
            res.json(entry)
        })
}

module.exports.edit = (req, res, next) => {
    CalendarEntry.findByIdAndUpdate({"exercises": req.body.exercises})
}