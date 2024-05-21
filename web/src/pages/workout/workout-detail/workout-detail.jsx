import React, { useState, useEffect, useContext } from 'react';
import { getWorkout } from '../../../services/api.service';
import { Link, useParams } from 'react-router-dom';
import AuthContext from '../../../contexts/auth.context';
import WeekDay from '../../../components/workouts/WeekDay/WeekDay';
import ExerciseCapsuleAdd from '../../../components/Exercises/ExerciseCapsuleAdd/ExerciseCapsuleAdd';
import WorkoutItem from '../../../components/workouts/Workout-Item/workoutItem';
import './workout-detail.css'

import img1 from '../../../assets/imgSU1.jpg'
import img2 from '../../../assets/imgSU2.jpg'
import img3 from '../../../assets/imgSU3.jpg'
import img4 from '../../../assets/imgSU4.jpg'
import img7 from '../../../assets/imgSU7.jpg'

function Workoutdetail() {

  const context = useContext(AuthContext)
  const [workout, setWorkout] = useState({});
  const params = useParams();
  const [actualDay, setDay] = useState('mon');
  const [randomNum, setRandom] = useState(0);
  const [isLoading, setLoading] = useState(true); // Estado para controlar la carga

  const imgArr = [img1, img2, img3, img4, img7];

  useEffect(() => {
    async function fetchWorkout() {
      window.scrollTo(0, 0);
      setRandom(Math.floor(Math.random() * 5));

      try {
        const workoutData = await getWorkout(params);
        setWorkout(workoutData.data);
        setLoading(false); // Marcamos la carga como completada
      } catch (error) {
        console.error('Error fetching workout:', error);
      } 
    }

    fetchWorkout();
  }, []);

  const handleSetDay = (day) => {
    setDay(day);
  };

  return (
    <div className='detail-page background-stack'>

      
      {!isLoading && (
        <>
          <img className='infinite-bg' src={imgArr[randomNum]} alt="Background" />
          <Link className='back-btn' to={'/list-workout'}><i className="fa-solid fa-arrow-left"></i> Back </Link>
          
          {workout && <WorkoutItem key={workout._id} workout={workout} hideBtns={true} />}

          <div className='plane-box plane-box-black'>
            <h2>description</h2>
            <div className='wo-description-bk'>{workout.description}</div>
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
              )
            }
          </div>
        </>
      )}
    </div>
  );
}

export default Workoutdetail;