const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dayjs = require("dayjs")

const workSchema = new Schema(
    {
        reps: {
            type: Number,
        },
        kg: {
            type: Number
        }
    }  
);

const mealSchema = new Schema(
    {
        food: {
            type: [Object],
        },
        name: {
            type: String
        }
    }  
);

const exerciseCESchema = new Schema(
    {
        exercise: {
            type: Object,
        },
        work: {
            type: [workSchema]
        }
    }  
);

const calendarEntrySchema = new Schema(
    {
        
        finishedEx: {
            type: [exerciseCESchema]
        },
        date: {
            type: String,
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        meals: {
            type: [mealSchema]
        }
      },
);

const CalendarEntry = mongoose.model("CalendarEntry", calendarEntrySchema);
module.exports = CalendarEntry;