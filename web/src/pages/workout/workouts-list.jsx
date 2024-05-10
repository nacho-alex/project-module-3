import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { getWorkouts } from '../../services/api.service'
import AuthContext from '../../contexts/auth.context'
import WorkoutItem from '../../components/workouts/workoutItem'
import { postPlan } from '../../services/api.service'
import { Link } from 'react-router-dom'

function ListWorkout() {
const [page, setPage] = useState(1)
const [workouts, setWorkouts] = useState([])
const context = useContext(AuthContext)



useEffect(() => {
    async function fetch() {
        try {
          const workoutsData = await getWorkouts();
          setWorkouts(workoutsData.data);
          
        } catch (error) {
          console.error(error);
        } 
      }
      fetch();
    }, []
);

const handlePage = (page) => {
    setPage(page)
    
}

async function handleSelectedPlan(id) {

    const updatedUser = {...context.user, planning: id}
    try {
        console.log(updatedUser)
        await postPlan(updatedUser)
    }catch(err){
        console.log(err)
    }

}

  return (
    <>
        <h1>Workouts</h1>
        <Link to='/create-workout'>Create workout</Link>
        <div>
            <button onClick={() => handlePage(1)} >All workouts</button>
            <button onClick={() => handlePage(2)} >My workouts</button>
        </div>

        {page === 1 && (
            <>
                <h1>holi</h1>

                {workouts.length > 0 && (
                    workouts.map((workout) => (
                        <WorkoutItem key={workout._id} workout={workout} onSelectWorkout={handleSelectedPlan}/>
                    ))
                )}
               
            </>
        )}

        {page === 2 && (

        <>
            <h1>Hello</h1>

            {workouts.length > 0 && (
                workouts.filter((workout) => workout.owner === context.user.id).map((workout) => (
                    <WorkoutItem key={workout._id} workout={workout} onSelectWorkout={handleSelectedPlan}/>
                ))
            )}

        </>
        )}


    </>
  )
}

export default ListWorkout