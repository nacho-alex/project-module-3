const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exercisesWOSchema = new Schema(
    {

        bodyPart: { type: [String]},
        equipment: {type: [String]},
        name: {type: String},
        target: {type: String},
        gifUrl: {type: String},
        secondaryMuscles: {type: [String]},
        instructions: {type: [String]},
        work: {
            sets: {
                type: Number,
                required: true
            },
            reps: {
                type: Number,
                required: true
            }
        },
        day: {
            type: String,
            enum: ["mon","tue", "wed", "thu", "fri", "sat", "sun"]
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
            //minLength: 1,
        },
        time: {
            type: Number,
        },
        owner: { 
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        ownername: {
            type: String
        },
        difficult: {
            type: String
        }
    }
);

const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;