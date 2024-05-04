const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({});

const Exercise = mongoose.model("Exercise", exerciseSchema);
module.exports = Exercise;




bodyPart:"waist"
equipment:"body weight"
gifUrl:"https://v2.exercisedb.io/image/UcvY9fRgNeiV4m"
id:"0001"
name:"3/4 sit-up"
target:"abs"
secondaryMuscles:[]
instructions:[]
