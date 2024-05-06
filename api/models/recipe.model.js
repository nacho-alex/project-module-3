const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ingredientSchema = new Schema({
    food: {
        type: Schema.Types.ObjectId,
        ref: "Food",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    }
});

const recipeSchema = new Schema(
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
        ingredients: {
            type: [ingredientSchema],
            required: true,
            min: 1,
        },
        steps: {
            type: [String],
            required: true
        },
        time: {
            type: Number,
            max: 300
        },
        owner: { 
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamp: true
    }
);

const Recipe = mongoose.model("Recipe", recipeSchema);
module.exports = Recipe;