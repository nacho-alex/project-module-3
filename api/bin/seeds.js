const mongoose = require('mongoose');
const axios = require('axios');
const Exercise = require('../models/exercise.model');

async function connectDB() {
  try {
    await mongoose.connect('mongodb+srv://nachopuerto95:dgHK9hMvaGUS7HAj@cluster0.bbrsgbc.mongodb.net/project-module-3', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Conectado a MongoDB');
  } catch (err) {
    console.error('Error conectando a MongoDB:', err);
  }
}

// async function updateGifUrls() {
//   try {
//     const localExercises = await Exercise.find({});
//     console.log(`Encontrados ${localExercises.length} ejercicios locales`);

//     for (const localEx of localExercises) {
//       try {
//         const response = await axios.get(`https://exercisedb.p.rapidapi.com/exercises/exercise/${localEx.id}`, {
//           headers: {
//             'x-rapidapi-key': '852794340cmshc301f67134ceb85p182b01jsn27823c259696',
//             'x-rapidapi-host': 'exercisedb.p.rapidapi.com'
//           }
//         });

//         const apiExercise = response.data;
//         if (!apiExercise || !apiExercise.gifUrl) {
//           console.log(`No se encontró gifUrl para id ${localEx.id}`);
//           continue;
//         }

//         localEx.gifUrl = apiExercise.gifUrl;
//         await localEx.save();
//         console.log(`Ejercicio ${localEx.name} actualizado con gifUrl nuevo.`);
//       } catch (apiErr) {
//         console.error(`Error buscando o guardando ejercicio id ${localEx.id}:`, apiErr.message);
//       }
//     }
//     console.log('Actualización completa');
//   } catch (dbErr) {
//     console.error('Error accediendo a la base de datos:', dbErr.message);
//   }
// }

// (async () => {
//   await connectDB();
//   await updateGifUrls();
//   mongoose.connection.close();
// })();
