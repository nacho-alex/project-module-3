const CalendarEntry = require("../models/calendarEntry.model");
const dayjs = require("dayjs");
const User = require("../models/user.model");
const mongoose = require("mongoose")
const moment = require('moment');


module.exports.manage = (req, res, next) => {
    req.body.date = dayjs().format('dddd, D, MMMM, YYYY');
    req.body.owner = req.user.id;
    
    CalendarEntry.findOne({ owner: req.body.owner, date: req.body.date })
        .then(entry => {
            if (!entry) {
                return CalendarEntry.create(req.body)
                    .then(newEntry => {
                        res.json(newEntry);
                    })
                    .catch(err => {
                        res.status(400).json({ message: 'Failed to create entry' });
                        console.log(err);
                    });
            } else {
                const updates = {};

                if (req.body.finishedEx) {
                    updates.$push = { finishedEx: req.body.finishedEx };
                }

                if (req.body.food && req.body.mealIndex !== undefined) {
                    for (let i = 0; i <= req.body.mealIndex; i++) {
                        if (!entry.meals[i]) {
                            entry.meals[i] = { food: [] };
                        }
                    }
                    entry.meals[req.body.mealIndex].food.push(...req.body.food);
                    updates.meals = entry.meals;
                }

                return CalendarEntry.findByIdAndUpdate(entry._id, updates, { new: true })
                    .then(updatedEntry => {
                        res.json(updatedEntry);
                    })
                    .catch(error => {
                        console.error('Error updating entry:', error);
                        res.status(500).json({ error: 'Failed to update entry' });
                    });
            }
        })
        .catch(error => {
            console.error('Error finding entry:', error);
            res.status(500).json({ error: 'Failed to find entry' });
        });
};

module.exports.detail = (req, res, next) => {
    CalendarEntry.findOne({ owner: req.user.id, date: dayjs().format('dddd, D, MMMM, YYYY') })
        .then(entry => {
            res.json(entry);
        })
        .catch(error => {
            console.error('Error fetching entry details:', error);
            res.status(500).json({ error: 'Failed to fetch entry details' });
        });
};

module.exports.edit = (req, res, next) => {
    CalendarEntry.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(updatedEntry => {
            res.json(updatedEntry);
        })
        .catch(error => {
            console.error('Error updating entry:', error);
            res.status(500).json({ error: 'Failed to update entry' });
        });
};

module.exports.delete = (req, res, next) => {
    CalendarEntry.findByIdAndUpdate(req.body._id, req.body, { new: true })
        .then(updatedEntry => {
            if (!updatedEntry) {
                return res.status(404).json({ message: "Entry not found" });
            }
            res.json(updatedEntry);
        })
        .catch(error => {
            console.error("Error updating entry:", error);
            res.status(500).json({ message: "Internal server error" });
        });
};

module.exports.data = (req, res, next) => {
    if (req.query.date) {
        const formattedDate = req.query.date;
        CalendarEntry.find({ "owner": req.user.id, "date": formattedDate })
            .then((entry) => {
                res.json(entry);
            })
            .catch(next);
    } else if (req.query.exercise) {
        const exerciseId = req.query.exercise;

        
        const exerciseObjectId = new mongoose.Types.ObjectId(exerciseId);

        CalendarEntry.find({
            owner: new mongoose.Types.ObjectId(req.user.id), 
            finishedEx: { $elemMatch: { "exercise._id": exerciseObjectId } }
        })
        .then(exData => {

            const dataFilterEx = exData
                .map(entry => {
                    entry.finishedEx = entry.finishedEx.filter(ex => ex.exercise._id.equals(exerciseObjectId));
                    return entry;
                })
                .filter(entry => entry.finishedEx.length > 0);
                
            res.json(dataFilterEx);
        })
        .catch(next);
    } else {
        CalendarEntry.find({ "owner": req.user.id })
            .then(entries => {
                const dateEntries = entries.map(entry => entry.date);
                res.json(dateEntries);
            })
            .catch(next);
    }  
};

module.exports.dataChart = (req, res, next) => {
    if (req.query.info === "body") {
        CalendarEntry.find({ "owner": req.user.id })
            .then(entries => {  
                const bodyPartEntries = entries.reduce((acc, entry) => {
                        entry.finishedEx.forEach(ex => {
                                ex.exercise.bodyPart.forEach(bodyPart => {
                                    acc.push(bodyPart);
                                });   
                        });
                    return acc;
                }, []);

                res.json(bodyPartEntries); 
            })
            .catch(next);
    } else if (req.query.info === "muscle") {
        CalendarEntry.find({ "owner": req.user.id })
        .then(entries => {
            const muscleEntries = entries.reduce((acc, entry) => {
                entry.finishedEx.forEach(ex => {
                acc.push(ex.exercise.target);
                        
            });
                
            return acc;
            }, []);
    
            res.json(muscleEntries);
        })
        .catch(next);
    } else if (req.query.info === "macro") {
        CalendarEntry.find({"owner": req.user.id})
            .then(entries => {
                const macroEntries = entries.reduce((acc, entry) => {
                    entry.meals.forEach(meal => {
                        meal.food.forEach(foodItem => {
                            acc.push(foodItem);
                        });
                    });
                return acc;
                }, []);
                
                const newMacroEntries = macroEntries.map(entry => {
                    const { _id, name, emoji, __v, qty, unit, ...rest } = entry;
                    return rest;
                });

                const totalMacros = newMacroEntries.reduce((acc, obj) => {
                    for (let key in obj) {
                      if (acc[key] === undefined) {
                        acc[key] = 0;
                      }
                      acc[key] += obj[key];
                    }
                    return acc;
                  }, {});
                  
                  res.json(totalMacros);

            })
            .catch(next);
    }
}


module.exports.foodHistory = (req, res, next) => {
    CalendarEntry.find(
        { owner: req.user.id },
        { "meals.food": 1, date: 1 } 
    )
    .then((foods) => {
        foods.sort((a, b) => {
            const dateA = moment(a.date, "dddd, DD, MMM, YYYY").toDate();
            const dateB = moment(b.date, "dddd, DD, MMM, YYYY").toDate();
            return dateA + dateB; 
        });

        const foodItems = foods.reduce((acc, entry) => {
            entry.meals.forEach(meal => {
                acc.push(...meal.food);
            });
            return acc;
        }, []);

        const uniqueFoodItems = Array.from(new Set(foodItems.map(item => JSON.stringify(item))))
            .map(item => JSON.parse(item));

        res.json(uniqueFoodItems.slice(0, 20));
    })
    .catch(next);
};