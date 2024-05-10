import React from 'react'
import { Link } from 'react-router-dom'

function WorkoutItem(props) {
    const {workout, onSelectWorkout} = props
    
    const handleAdd = () => {
        onSelectWorkout(workout._id)
    }
  return (
    <div className='workout-item'>
        <div className="workout-image">
            <img src={workout.image}></img>
        </div>
        <div className="workout-text">
            <h1>{workout.title}</h1>
            <p>{workout.description}</p>
            <p>{workout.ownername}</p>
        </div>
        <button type='button' onClick={handleAdd}>Add to my plan</button>
        <Link to={`/workout/${workout._id}`}><button type='button'>Go to workout</button></Link> 
    </div>
  )
}

export default WorkoutItem