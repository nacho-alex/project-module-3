import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { getWorkout } from '../../../services/api.service';
import { Link, useParams } from 'react-router-dom';
import AuthContext from '../../../contexts/auth.context';
import WeekDay from '../../../components/workouts/WeekDay/WeekDay';
import ExerciseCapsuleAdd from '../../../components/Exercises/ExerciseCapsuleAdd/ExerciseCapsuleAdd';
import WorkoutItem from '../../../components/workouts/Workout-Item/workoutItem';
import './workout-detail.css'

function Workoutdetail() {

const context = useContext(AuthContext)
const [workout, setWorkout] = useState({})
const params = useParams();
const [actualDay, setDay] = useState('mon')
const hideBtns = true;



useEffect(() => {
    async function fetch() {
        try {
          const workoutData = await getWorkout(params);
          setWorkout(workoutData.data);
          console.log(workoutData)
        } catch (error) {
         
        } 
      }
      fetch();
    
    }, []
);

const handleSetDay = (day) => {
  setDay(day)
}

  return (
    <div className='detail-page'>
      <Link className='back-btn' to={'/list-workout'}><i className="fa-solid fa-arrow-left"></i> Back </Link>

                    {workout  && (
                       <WorkoutItem key={workout._id} workout={workout} hideBtns={hideBtns} />                 
                    )}

        <div className='plane-box' style={{ backgroundColor: 'rgba(46, 46, 46, 0.894)', color: 'white' }}>
          <h2>description</h2>
          <div>{workout.description}</div>
        </div>
        
        <div className='plane-box'>
          <h2>Exercises</h2>
          <WeekDay onSelectDay={handleSetDay} actualDay={actualDay}></WeekDay>
          
          {workout.exercises && workout.exercises
            .filter(ex => ex.day === actualDay)
            .map((ex) => 
                <ExerciseCapsuleAdd 
                    key={ex._id + ex.day} 
                    exercise={ex}  
                />
        )}

        </div>

        


        
    </div>
    
  )
}

export default Workoutdetail