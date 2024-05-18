require('dotenv').config();
require('../configs/db.config');
const foods = require("../data/foods.json");
const exercises = require("../data/exercises.json");
const Food = require('../models/food.model');
const Exercise = require('../models/exercise.model');
const CalendarEntry = require('../models/calendarEntry.model');

const dayjs = require("dayjs");

const Workout = require('../models/workout.model')


async function getExercises(workId) {
  try {
    const workout = await Workout.findById(workId);
    return workout.exercises;
  } catch (error) {
    console.error('Error fetching exercises:', error);
    throw error;
  }
}

async function createCalendarEntry(data, index) {
  try {
    await CalendarEntry.create(data);
    console.log(`Entry created ${index}`);
  } catch (error) {
    console.error(error);
  }
}

function getRandomDays(totalDays, numberOfDays) {
  const days = [];
  while (days.length < numberOfDays) {
    const randomDay = Math.floor(Math.random() * totalDays) + 1;
    if (!days.includes(randomDay)) {
      days.push(randomDay);
    }
  }
  return days.sort((a, b) => a - b);
}

function getDayOfWeek(year, month, day) {
  const date = new Date(year, month - 1, day);
  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return daysOfWeek[date.getDay()];
}

const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

async function createEntriesForMonth(year, month, totalDays, exercises) {
  for (let i = 1; i <= totalDays; i++) {
    const finishedEx = [];

    const meanKg = 10 + ((20 - 10) / (totalDays - 1)) * (i - 1);
    const kg = Math.random() * 4 - 2 + meanKg;

    const dayOfWeek = getDayOfWeek(year, month, i);
    const dayAbbreviation = dayOfWeek.slice(0, 3).toLowerCase();

    // Filtra los ejercicios correspondientes al día de la semana
    const exercisesForDay = exercises.filter(exercise => exercise.day === dayAbbreviation);

    if (exercisesForDay.length > 0) {
      exercisesForDay.forEach(exercise => {
        const work = Array.from({ length: 4 }, () => ({ reps: 8, kg: Math.round(kg) }));
        finishedEx.push({ exercise, work });
      });

      const monthName = monthNames[month - 1];
      const data = {
        finishedEx: finishedEx,
        date: `${dayOfWeek}, ${i}, ${monthName}, ${year}`,
        owner: "663a78c0547ed82f87502add"
      };

      await createCalendarEntry(data, i);
    }
  }
}

async function createEntries(workId) {
  try {
    const exercises = await getExercises(workId);
    await createEntriesForMonth(2024, 3, 31, exercises); // March
    await createEntriesForMonth(2024, 4, 30, exercises); // April
    await createEntriesForMonth(2024, 5, 31, exercises); // May
  } catch (error) {
    console.error('Error creating entries:', error);
  } finally {
    mongoose.connection.close();
    console.log('Database connection closed');
  }
}

// Llama a la función createEntries con el ID del workout

  
  // Llama a la función createEntries con el ID del workout
  createEntries('66487de9e538db030ee1e6ad'); // Reemplaza 'yourWorkoutIdHere' con el ID real del workouty



// async function createCalendarEntry(data, index) {
//     try {
//         await CalendarEntry.create(data);
//         console.log(`Entry created ${index}`);
//     } catch (error) {
//         console.error(error);
//     }
// }


// function getRandomDays(totalDays, numberOfDays) {
//     const days = [];
//     while (days.length < numberOfDays) {
//         const randomDay = Math.floor(Math.random() * totalDays) + 1;
//         if (!days.includes(randomDay)) {
//             days.push(randomDay);
//         }
//     }
//     return days.sort((a, b) => a - b);
// }


// function getDayOfWeek(year, month, day) {
//     const date = new Date(year, month - 1, day);
//     const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//     return daysOfWeek[date.getDay()];
// }

// const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


// async function createEntriesForMonth(year, month, numberOfDays, totalDays) {
//     const randomDays = getRandomDays(totalDays, numberOfDays);

//     for (let index = 0; index < randomDays.length; index++) {
//         const i = randomDays[index];
//         const finishedEx = [];
//         let finishedExItem = [];

//         const meanKg = 10 + ((20 - 10) / (totalDays - 1)) * (i - 1);
//         const kg = Math.random() * 4 - 2 + meanKg; 

//         const dayOfWeek = getDayOfWeek(year, month, i);

//         if (dayOfWeek === "Monday") {
//             finishedExItem = [
//                 {
//                     exercise: {
//                         bodyPart: ["chest"],
//                         name: "barbell decline pullover",
//                         _id: "663e70ee711b1d91aa55755c",
//                         target: "",
//                         secondaryMuscles: [],
//                         work: { sets: 4, reps: 10 }
//                     },
//                     work: [
//                         { reps: 8, kg: Math.round(kg) },
//                         { reps: 8, kg: Math.round(kg) },
//                         { reps: 8, kg: Math.round(kg) },
//                         { reps: 8, kg: Math.round(kg) }
//                     ]
//                 },
//                 {
//                     exercise: {
//                         bodyPart: ["lower legs"],
//                         name: "barbell floor calf raise",
//                         _id: "663e70ee711b1d91aa557560",
//                         target: "",
//                         secondaryMuscles: [],
//                         work: { sets: 4, reps: 10 }
//                     },
//                     work: [
//                         { reps: 8, kg: Math.round(kg) },
//                         { reps: 8, kg: Math.round(kg) },
//                         { reps: 8, kg: Math.round(kg) },
//                         { reps: 8, kg: Math.round(kg) }
//                     ]
//                 }
//             ];
//         } else if (dayOfWeek === "Tuesday") {
//             finishedExItem = [{
//                 exercise: {
//                     bodyPart: ["lower arms"],
//                     name: "barbell reverse wrist curl v. 2",
//                     _id: "663e70ee711b1d91aa557597",
//                     target: "",
//                     secondaryMuscles: [],
//                     work: { sets: 4, reps: 10 }
//                 },
//                 work: [
//                     { reps: 8, kg: Math.round(kg) },
//                     { reps: 8, kg: Math.round(kg) },
//                     { reps: 8, kg: Math.round(kg) },
//                     { reps: 8, kg: Math.round(kg) }
//                 ]
//             }];
//         } else if (dayOfWeek === "Wednesday") {
//             finishedExItem = [{
//                 exercise: {
//                     bodyPart: ["lower legs"],
//                     name: "barbell floor calf raise",
//                     _id: "663e70ee711b1d91aa557560",
//                     target: "",
//                     secondaryMuscles: [],
//                     work: { sets: 4, reps: 10 }
//                 },
//                 work: [
//                     { reps: 8, kg: Math.round(kg) },
//                     { reps: 8, kg: Math.round(kg) },
//                     { reps: 8, kg: Math.round(kg) },
//                     { reps: 8, kg: Math.round(kg) }
//                 ]
//             }];
//         } else if (dayOfWeek === "Thursday") {
//             finishedExItem = [{
//                 exercise: {
//                     bodyPart: ["shoulders"],
//                     name: "barbell front raise",
//                     _id: "663e70ee711b1d91aa557562",
//                     target: "",
//                     secondaryMuscles: [],
//                     work: { sets: 4, reps: 10 }
//                 },
//                 work: [
//                     { reps: 8, kg: Math.round(kg) },
//                     { reps: 8, kg: Math.round(kg) },
//                     { reps: 8, kg: Math.round(kg) },
//                     { reps: 8, kg: Math.round(kg) }
//                 ]
//             }];
//         } else if (dayOfWeek === "Friday") {
//             finishedExItem = [{
//                 exercise: {
//                     bodyPart: ["waist"],
//                     name: "barbell press sit-up",
//                     _id: "663e70ee711b1d91aa55758e",
//                     target: "",
//                     secondaryMuscles: [],
//                     work: { sets: 4, reps: 10 }
//                 },
//                 work: [
//                     { reps: 8, kg: Math.round(kg) },
//                     { reps: 8, kg: Math.round(kg) },
//                     { reps: 8, kg: Math.round(kg) },
//                     { reps: 8, kg: Math.round(kg) }
//                 ]
//             }];
//         } else if (dayOfWeek === "Saturday") {
//             finishedExItem = [{
//                 exercise: {
//                     bodyPart: ["upper legs"],
//                     name: "barbell bench squat",
//                     _id: "663e70ee711b1d91aa557550",
//                     target: "",
//                     secondaryMuscles: [],
//                     work: { sets: 4, reps: 10 }
//                 },
//                 work: [
//                     { reps: 8, kg: Math.round(kg) },
//                     { reps: 8, kg: Math.round(kg) },
//                     { reps: 8, kg: Math.round(kg) },
//                     { reps: 8, kg: Math.round(kg) }
//                 ]
//             }];
//         } else if (dayOfWeek === "Sunday") {
//             finishedExItem = [{
//                 exercise: {
//                     bodyPart: ["upper arms"],
//                     name: "barbell drag curl",
//                     _id: "663e70ee711b1d91aa55755f",
//                     target: "",
//                     secondaryMuscles: [],
//                     work: { sets: 4, reps: 10 }
//                 },
//                 work: [
//                     { reps: 8, kg: Math.round(kg) },
//                     { reps: 8, kg: Math.round(kg) },
//                     { reps: 8, kg: Math.round(kg) },
//                     { reps: 8, kg: Math.round(kg) }
//                 ]
//             }];
//         }

//         finishedEx.push(...finishedExItem);

//         const monthName = monthNames[month - 1];
//         const data = {
//             finishedEx: finishedEx,
//             date: `${dayOfWeek}, ${i}, ${monthName}, ${year}`,
//             owner: "663a78c0547ed82f87502add"
//         };

//         await createCalendarEntry(data, index + 1);
//     }
// }


// async function createEntries() {
//     await createEntriesForMonth(2024, 3, 20, 31); // March
//     await createEntriesForMonth(2024, 4, 20, 30); // April
//     await createEntriesForMonth(2024, 5, 20, 31); // May
// }

// createEntries();


// createExercises()

// function createExercises() {
//     exercises.forEach((ex, index) => {
//         Exercise.create(ex)
//             .then(() => console.log(`Exercise created ${index}/${exercises.length}`))
//             .catch((error) => console.error(error))
//     })
// }

// createFoods()

// function createFoods() {
//     foods.forEach((fd, index) => {
//         Food.create(fd)
//             .then(() => console.log(`Food created ${index}/${foods.length}`))
//             .catch((error) => console.error(error))
//     })
// }
