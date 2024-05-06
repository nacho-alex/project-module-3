const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exercisesWOSchema = new Schema(
    {
        exercise: {
            type: Schema.Types.ObjectId,
            ref: "Exercise",
            required: true
        },
        sets: {type: Number},
        reps: {
            type: [Number]
        },
        duration: {
            type: Number
        }
    }
)

const workoutSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        image: {
            type: String
        },
        description: {
            type: String,
            required: true
        },
        exercises: {
            type: [exercisesWOSchema],
            required: true,
            min: 1,
        },
        time: {
            type: Number,
        },
        schedule: {
            type: [String],
            enum: ["M","T", "W", "TH", "F", "S", "SU"]
        },
        owner: { 
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    }
);

const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;