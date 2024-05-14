require('dotenv').config();
require('../configs/db.config');
const foods = require("../data/foods.json")
const exercises = require("../data/exercises.json")
const Food = require('../models/food.model')
const Exercise = require('../models/exercise.model')
const CalendarEntry = require('../models/calendarEntry.model')
const dayjs = require("dayjs")



createExercises()

function createExercises() {
    exercises.forEach((ex, index) => {
        Exercise.create(ex)
            .then(() => console.log(`Exercise created ${index}/${exercises.length}`))
            .catch((error) => console.error(error))
    })
}

// createFoods()

// function createFoods() {
//     foods.forEach((fd, index) => {
//         Food.create(fd)
//             .then(() => console.log(`Food created ${index}/${foods.length}`))
//             .catch((error) => console.error(error))
//     })
// }


