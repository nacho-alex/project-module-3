import React from 'react'
import './ExerciseCapsuleAdd.css'
import { useState } from 'react';
import ExerciseDetail from '../Detail/ExerciseDetail';

function ExerciseCapsule(props) {
const {exercise, onAddExercise, onRemove, onEditWork } = props
const [expandedExercises, setExpandedExercises] = useState([]);



const toggleExerciseExpansion = (exerciseId) => {
    if (expandedExercises.includes(exerciseId)) {
    setExpandedExercises(expandedExercises.filter(id => id !== exerciseId));
    } else {
    setExpandedExercises([...expandedExercises, exerciseId]);
    }
};


const handleChange = (event) => {
  const { name, value } = event.currentTarget;
  const updatedExercise = { ...exercise };

  updatedExercise.work = {
      ...updatedExercise.work,
      [name]: value
  };

  if (onEditWork) {
      onEditWork(updatedExercise.work, exercise._id);
  }

};



const handleBlur = () => {
  if (onEditWork) {
      onEditWork(exercise.work, exercise._id);
  }
};

  return (
    <div className='exercise-capsule'>
      <div className="capsule-main">
          <div className='ex-title'>
            
          {exercise.equipment && (
            <>
              {Array.isArray(exercise.equipment) && exercise.equipment.some(eq => eq.includes('body')) && (
                <i className="fa-solid fa-child-reaching"></i>
              )}
              {Array.isArray(exercise.equipment) && exercise.equipment.some(eq => eq.includes('machine')) && (
                <i className="fa-solid fa-gears"></i>
              )}
              {Array.isArray(exercise.equipment) && !exercise.equipment.some(eq => eq.includes('machine')) && !exercise.equipment.some(eq => eq.includes('body')) && (
                <i className="fa-solid fa-dumbbell"></i>
              )}
              {!Array.isArray(exercise.equipment)  &&  exercise.equipment.includes('body') && (
                <i className="fa-solid fa-child-reaching"></i>
              )}
              {!Array.isArray(exercise.equipment) && exercise.equipment.includes('machine') && (
                <i className="fa-solid fa-gears"></i>
              )}
              {!Array.isArray(exercise.equipment) && !exercise.equipment.includes('machine') && !exercise.equipment.includes('body') && (
                <i className="fa-solid fa-dumbbell"></i>
              )}
            </>
          )}
            
            
            <h1>{exercise.name}</h1>
          </div>

         
          

          <div className="buttons-capsule">
          <div className="info-ex">
            <strong>Part:</strong><p>{exercise.bodyPart}</p>
            <strong>Equipment:</strong><p>{exercise.equipment}</p>
           
          </div>


               
                <div className='work-div'>
                      
                      {onEditWork &&
                      <>
                        <p>Work:</p>
                        <input value={exercise.work.sets} name='sets' type="number" placeholder='Sets...' onChange={handleChange} onBlur={handleBlur} />
                        <input value={exercise.work.reps} name='reps' type="number" placeholder='Reps...' onChange={handleChange} onBlur={handleBlur} />
                      </>
                      }

                      {!onEditWork && exercise.work && exercise.work.reps !== 0 && exercise.work.sets !== 0 &&
                              <>
                                <div className="sets-div">
                                  <p>Work:</p>
                                  <p>S: {exercise.work.sets}</p>
                                  <p>R: {exercise.work.reps}</p>
                                </div>
                              </>
                      }

              </div>

                
                              
                <button type="button" onClick={() => toggleExerciseExpansion(exercise._id)}>
                {expandedExercises.includes(exercise._id) ? <i className="fa-solid fa-angle-up"></i> : <i className="fa-solid fa-angle-down"></i>} <i className="fa-solid fa-eye"></i>
                </button>



                {onAddExercise && 
                <button type="button" onClick={() => onAddExercise(exercise)}>
                    <i className="fa-solid fa-plus"></i>
                </button>
                }

                {onRemove &&
                  <button type="button" onClick={() => onRemove(exercise._id)}>
                      <i className="fa-solid fa-trash-can red-text button-trash"></i>
                  </button>
                }
          </div>
        </div>
        

      <div className="exercise-details">
        {expandedExercises.includes(exercise._id) && (
          <ExerciseDetail exercise={exercise}></ExerciseDetail>
          )}
      </div>
    </div>
  )
}

export default ExerciseCapsule