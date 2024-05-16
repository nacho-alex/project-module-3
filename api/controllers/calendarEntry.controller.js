const CalendarEntry = require("../models/calendarEntry.model")
const dayjs = require("dayjs")
const User = require("../models/user.model")

module.exports.manage = (req, res, next) => {
    CalendarEntry.find({"owner": req.body.owner, "date": req.body.date})
        .then((entry) => {
            
            if (entry.length === 0) {
            return CalendarEntry.create(req.body)
                .then((CrEntry)  => {
                    
                    res.json(CrEntry)
                })
                .catch((err) => {
                    res.status(400).json({message: 'fallo al crear entry' })
                    console.log(err)
                })
            } else {
                CalendarEntry.findByIdAndUpdate(entry[0]._id, { $push: { finishedEx: { $each: req.body.finishedEx } } }, {
                    runValidators: true,
                    new: true,
                })
                .then((upEntry) => {
                    res.json(upEntry);
                })
                .catch((error) => {
                    console.error('Error:', error);
                    res.status(400).json({ message: 'Fallo al actualizar entry' });
                });
            }
        
        }
    )
}


module.exports.detail = (req, res, next) => {
    CalendarEntry.find({"owner": req.user.id, "date": dayjs().format('dddd, D, MMMM, YYYY')})
        .then((entry) => {
            res.json(entry[0])
        })
}

module.exports.edit = (req, res, next) => {
    CalendarEntry.findByIdAndUpdate({"exercises": req.body.exercises})
}