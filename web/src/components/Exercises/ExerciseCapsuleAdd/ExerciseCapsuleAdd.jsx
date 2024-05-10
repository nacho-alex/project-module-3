import React from 'react'
import './ExerciseCpsuleAdd.css'
import { useState } from 'react';
import ExerciseDetail from '../Detail/ExerciseDetail';

function ExerciseCapsule(props) {
const {exercise, onAddExercise, onRemove, onEditWork } = props
const [expandedExercises, setExpandedExercises] = useState([]);
const [exerciseWork, setExerciseWork] = useState({})



const toggleExerciseExpansion = (exerciseId) => {
    if (expandedExercises.includes(exerciseId)) {
    setExpandedExercises(expandedExercises.filter(id => id !== exerciseId));
    } else {
    setExpandedExercises([...expandedExercises, exerciseId]);
    }
};


const handleChange = (event) => {
  const { name, value } = event.currentTarget;
  setExerciseWork((prevExerciseWork) => ({
      ...prevExerciseWork,
      [name]: value,
  }));
};

const handleBlur = () => {
  if (onEditWork) {
      onEditWork(exerciseWork, exercise._id);
  }
};

  return (
    <div >
        <p>{exercise.name}</p>
        <button type="button" onClick={() => toggleExerciseExpansion(exercise._id)}>
        {expandedExercises.includes(exercise._id) ? '-' : '+'} Detalles
        </button>

        {onEditWork && 
        <>
          <input name='sets' type="number" placeholder='Sets...' onChange={handleChange} onBlur={handleBlur} value={exerciseWork.sets || ''}/>
          <input name='reps' type="number" placeholder='Reps...' onChange={handleChange} onBlur={handleBlur} value={exerciseWork.reps || ''}/>
        </>
        }

        {onAddExercise &&
        <button type="button" onClick={() => onAddExercise(exercise)}>
            add
        </button>
        }

        {onRemove &&
          <button type="button" onClick={() => onRemove(exercise._id)}>
              remove
          </button>
        }
        
        {expandedExercises.includes(exercise._id) && (
        <ExerciseDetail exercise={exercise}></ExerciseDetail>
        )}
    </div>
  )
}

export default ExerciseCapsule