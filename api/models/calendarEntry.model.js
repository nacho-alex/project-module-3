const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const dayjs = require("dayjs")

const exerciseCESchema = new Schema(
    {
        exercise: {
            type: Schema.Types.ObjectId,
            ref: "Exercise",
            required: true
        },
        reps: {
            type: [Number],
            default: 0
        },
        weight: {
            type: [Number],
            default: 0
        },
        done: {
            type: Boolean,
            default: false
        }
    }  
);

const calendarEntrySchema = new Schema(
    {
        workout: {
            type: Schema.Types.ObjectId,
            ref: "Workout"
        },
        exercises: {
            type: [exerciseCESchema]
        },
        date: {
            type: String,
            default: dayjs().format('dddd, D, MMMM, YYYY')
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
      },
);

const CalendarEntry = mongoose.model("CalendarEntry", calendarEntrySchema);
module.exports = CalendarEntry;