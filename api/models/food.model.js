const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const foodSchema = new Schema(
    {
    name: {type: String},
    emoji: {type: String},
    calories_kcal:  { type: Number },
    carbohydrates_g: { type: Number },
    totalSugar_g: { type: Number },
    protein_g: { type: Number },
    totalFat_g: { type: Number },
    saturatedFat_g: { type: Number },
    totalFiber_g: { type: Number },
    cholesterol_mg: {type: Number},
    vitaminA_iu: { type: Number },
    vitaminB12_ug: { type: Number },
    vitaminC_mg: { type: Number },
    vitaminD_iu: { type: Number },
    calcium_g:{ type: Number },
    iron_mg: { type: Number },
    magnesium_mg: { type: Number },
    phosphorus_g: { type: Number },
    potassium_g: { type: Number },
  },
);

const Food = mongoose.model("Food", foodSchema);
module.exports = Food;

