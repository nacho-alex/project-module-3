import React from 'react';
import './ExerciseDetail.css';

function ExerciseDetail(props) {
  const { exercise } = props;
  console.log(exercise);

  return (
    <div className="workout-detail-container">
      <div className='workout-detail-box'>
        <div className="workout-image">
          <img src={exercise.gifUrl} alt="Descripción de la imagen" />
        </div>
        
        <div className="workout-text">
                     <h1>{exercise.name}</h1>
                    <div className="wo-detail-big">
                      <strong>Body Part:</strong><p className='workout-p'> {exercise.bodyPart}</p>
                    </div>
                    <div className="wo-detail-big">
                      <strong>Target:</strong><p className='workout-p'> {exercise.target}</p>
                    </div>
                    <div className="wo-detail-big">
                      <strong>Secondary muscles:</strong>
                      {Array.isArray(exercise.secondaryMuscles) ?  (
                        <>
                          {exercise.secondaryMuscles?.map((sec, index) => (
                            <span key={index} className="equipment-item">
                              {index > 0 && ', '}
                              {sec.charAt(0).toUpperCase() + sec.slice(1)}
                            </span>
                          ))}
                        </>
                        ) : (
                          <>
                              {exercise.secondaryMuscles}
                          </>
                        )}
                      

                    
                    </div>
                    <div className="wo-detail-big">
                    <strong>Equipment:</strong>
                    {Array.isArray(exercise.equipment) ?  (
                    <>
                        {exercise.equipment?.map((sec, index) => (
                          <span key={index} className="equipment-item">
                            {index > 0 && ', '}
                            {sec.charAt(0).toUpperCase() + sec.slice(1)}
                          </span>
                        ))}
                    </>
                    ): (
                      <>
                          <span>{exercise.equipment}</span> 
                      </>
                    )}
                    
                  </div>
        </div>

        
      </div>
      <div className="workout-detail-box workout-detail-box2 flex-column">
        <h1>Instructions:</h1>
        {exercise.instructions && Array.isArray(exercise.instructions) && exercise.instructions.map((ins, index) => (
          <div className='instruction' key={index}>
            <span className="instruction-num">{index + 1}</span>
            <span>{ins}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ExerciseDetail;
