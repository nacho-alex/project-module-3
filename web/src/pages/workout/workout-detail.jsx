import React from 'react'
import { useState, useEffect, useContext } from 'react';
import { getWorkout } from '../../services/api.service';
import { useParams } from 'react-router-dom';
import AuthContext from '../../contexts/auth.context';

function Workoutdetail() {

const context = useContext(AuthContext)
const [workout, setWorkout] = useState({})
const params = useParams();


useEffect(() => {
    async function fetch() {
        try {
          const workoutData = await getWorkout(params);
          setWorkout(workoutData.data);
        } catch (error) {
         
        } 
      }
      fetch();
    
    }, []
);

  return (
    <>
        <div>{workout.title}</div>
        <div>{workout.description}</div>
    </>
    
  )
}

export default Workoutdetail