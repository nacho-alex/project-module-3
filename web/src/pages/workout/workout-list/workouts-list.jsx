import React from 'react'
import { useState, useEffect, useContext } from 'react'
import { getWorkouts } from '../../../services/api.service'
import AuthContext from '../../../contexts/auth.context'
import WorkoutItem from '../../../components/workouts/Workout-Item/workoutItem'
import { Link } from 'react-router-dom'
import './workout-list.css'
import jumboImg from '../../../assets/banner2.jpg'

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



  return (
    <div className='wo-list-page'>
        <div className="jumbo jumbo-list">
            <div className="h1-div">
                <h1 className='page-title'>Workouts</h1>
            </div>
            
            <img src={jumboImg} alt="" />
            <div className="create-links">
            <Link to={'/create-workout'}> <div className="link-create"><i className="fa-solid fa-plus"></i><span className="create-link-text red-border">Create Workout</span></div></Link>
            </div>
        </div>
        

        
        <div className='workouts-filter-div'>
            <button className={page === 1 ? 'selected-filter' : ''}  onClick={() => handlePage(1)} >All workouts</button>
            <button className={page === 2 ? 'selected-filter' : ''} onClick={() => handlePage(2)} >My workouts</button>
        </div>

        

        {page === 1 && (
            <>
            
                <div className='workout-results'>

                    {workouts.length > 0 && (
                        workouts.map((workout) => (
                            <WorkoutItem key={workout._id} hideBtns={true} hideView={true} workout={workout} />
                        ))
                    )}
                </div>

                
               
            </>
        )}

        {page === 2 && (

        <>
            <div className="workout-results">

                {workouts.length > 0 && (
                    workouts.filter((workout) => workout.owner === context.user.id).map((workout) => (
                        
                        <WorkoutItem key={workout._id} hideBtns={false}  hideView={true} workout={workout} clickable={true}/>
                    ))
                )}
            </div>
            

        </>
        )}


    </div>
  )
}

export default ListWorkout