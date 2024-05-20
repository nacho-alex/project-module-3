import React, { useState } from 'react';
import './HomeExCapsule.css';
import ExerciseDetail from '../Exercises/Detail/ExerciseDetail';
import ChartLine from '../charts/line-chart/line-chart.jsx'

function HomeExCapsule(props) {
    const { exercise, onSendEx, completed, onDeleteEntry } = props;
    const [sets, setSets] = useState(exercise.work.sets);
    const [exerciseData, setExerciseData] = useState(Array.from({ length: sets }, () => ({ reps: exercise.work.reps, kg: 0, isChecked: false})));
    const [expandedExercises, setExpandedExercises] = useState([]);
    const [expandedDetails, setDetailExercises] = useState([]);
    const [showChart, setShowChart] = useState(false);

    const handleAddSet = () => {
        setSets(prevSets => prevSets + 1);
        setExerciseData(prevData => [...prevData, { reps: 0, kg: 0, isChecked: false }]);
    };

    const handleRemoveSet = () => {
        setSets(prevSets => prevSets - 1);
        setExerciseData(prevData => prevData.slice(0, -1)); 
        handleSubmit(exerciseData.slice(0, -1));
    };

    const toggleExerciseExpansion = (exerciseId) => {
        if (expandedExercises.includes(exerciseId)) {
            setExpandedExercises(expandedExercises.filter(id => id !== exerciseId));
        } else {
            setExpandedExercises([...expandedExercises, exerciseId]);
        }
    };

    const toggleDetailExpansion = (exerciseId) => {
        if (expandedDetails.includes(exerciseId)) {
            setDetailExercises(expandedDetails.filter(id => id !== exerciseId));
        } else {
            setDetailExercises([...expandedDetails, exerciseId]);
        }
    };
    
    const handleChange = (index, fieldName, event) => {
        const newExerciseData = [...exerciseData];
        newExerciseData[index] = {
            ...newExerciseData[index],
            [fieldName]: event.target.value
        };
        setExerciseData(newExerciseData);
    };

    const handleDelete = (type, event) => {
        onDeleteEntry(exercise._id, type ,event);
    };
    
    const handleCheckSet = (index, event) => {
        const isChecked = event.target.checked;
        const newExerciseData = [...exerciseData];
        newExerciseData[index] = {
            ...newExerciseData[index],
            isChecked: isChecked
        };
        setExerciseData(newExerciseData);
        const isReady = newExerciseData.some(ex => ex.isChecked === false);
        if (!isReady) {
            const finishedEx = {exercise: exercise, work: newExerciseData};
            onSendEx(finishedEx);
            setExerciseData(Array.from({ length: sets }, () => ({ reps: exercise.work.reps, kg: 0, isChecked: false })));
        }
    };

    const toggleShowChart = () => {
        setShowChart(!showChart)
    }
    
    return (
        <div className={`home-capsule-container ${completed && 'completed'}`}>
            <div className="home-capsule-main">
                <div className='title-icon'>
                    {Array.isArray(exercise.equipment) && exercise.equipment.some(eq => eq.includes('body')) && (
                        <i className="fa-solid fa-child-reaching"></i>
                    )}
                    {Array.isArray(exercise.equipment) && exercise.equipment.some(eq => eq.includes('machine')) && (
                        <i className="fa-solid fa-gears"></i>
                    )}
                    {Array.isArray(exercise.equipment) && !exercise.equipment.some(eq => eq.includes('machine')) && !exercise.equipment.some(eq => eq.includes('body')) && (
                        <i className="fa-solid fa-dumbbell"></i>
                    )}
                    {!Array.isArray(exercise.equipment)  &&  exercise.equipment?.includes('body') && (
                        <i className="fa-solid fa-child-reaching"></i>
                    )}
                    {!Array.isArray(exercise.equipment) && exercise.equipment?.includes('machine') && (
                        <i className="fa-solid fa-gears"></i>
                    )}
                    {!Array.isArray(exercise.equipment) && !exercise.equipment?.includes('machine') && !exercise.equipment?.includes('body') && (
                        <i className="fa-solid fa-dumbbell"></i>
                    )}
                    <h1>{exercise.name}</h1>
                    <button type="button" onClick={() => toggleDetailExpansion(exercise._id)}>
                            {expandedDetails.includes(exercise._id) ? <i className="fa-solid fa-angle-up"></i> : ''} <i className="fa-solid fa-circle-info"></i>
                        </button>
                </div>

                {!completed ? (
                    <div>
                       
                         <button type="button" value={showChart} onClick={toggleShowChart}><i className="fa-solid fa-chart-simple"></i></button>
                        <button type="button" onClick={() => toggleExerciseExpansion(exercise._id)}>
                            {expandedExercises.includes(exercise._id) ? <i className="fa-solid fa-angle-up"></i> : ''} <i className="fa-solid fa-eye"></i>
                        </button>
                        
                    </div>
                ) : (
                    
                    <div className='completed-button-div'>
                        <button type="button" value={showChart} onClick={toggleShowChart}><i className="fa-solid fa-chart-simple"></i></button>
                       
                    {onDeleteEntry && (
                        <button type="button" onClick={handleDelete}>
                        <i className="fa-solid fa-trash-can red-text button-trash"></i>
                    </button>
                    )}
                        <i className="fa-solid fa-square-check completed-button"></i>
                    </div>
                )}
            </div>
            {!completed && (
                <>
                    {expandedExercises.includes(exercise._id) && (
                        <div className='home-sets'>
                            {[...Array(sets)].map((_, index) => (
                                <div key={exercise.name + index} className='d-flex home-capsule-set'>
                                    <p>set {index + 1}</p>
                                    <div>
                                        <p>reps: <input type="number" value={exerciseData[index]?.reps || exercise.work.reps} onChange={(event) => handleChange(index, 'reps', event)} /></p>
                                        <p>Weight<input type="number" placeholder="Kg..." value={exerciseData[index]?.kg} onChange={(event) => handleChange(index, 'kg', event)} /></p>
                                        <input
                                            className='check-inp'
                                            type="checkbox"
                                            name=""
                                            id={`${exercise.name}Set${index + 1}`}
                                            onChange={(event) => handleCheckSet(index, event)}
                                        />
                                    </div>
                                </div>
                            ))}
                            <div className="edit-wo-btns">
                                <button className="add-ex-btn button mb-0" onClick={handleAddSet}><i className="fa-solid fa-plus"></i> Add set</button>
                                <button className="add-ex-btn button red mb-0" onClick={(event) => handleDelete('food', event)}><i className="fa-solid fa-floppy-disk"> </i> Remove set</button>  
                            </div>
                        </div>
                    )}
                </>
            )}
            <div className="exercise-details">
                {expandedDetails.includes(exercise._id) && (
                    <ExerciseDetail exercise={exercise}></ExerciseDetail>
                )}
            </div>
            <div className="exercise-details">
                {showChart && (
                    <ChartLine exerciseId={exercise._id}></ChartLine>
                )}
            </div>
        </div>
    );
}

export default HomeExCapsule;
