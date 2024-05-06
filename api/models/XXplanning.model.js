const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const planningSchema = new Schema(
    {
        schedule: {
            type: [String],
            enum: ["M","T", "W", "TH", "F", "S", "SU"]
        },
        workout: {
            type: Schema.Types.ObjectId,
            ref: "Workout"
        },
        tags: { type: [String]},
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
    },
);

const Planning = mongoose.model("Planning", planningSchema);
module.exports = Planning;