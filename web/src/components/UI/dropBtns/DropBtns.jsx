import React from 'react'
import './DropBtns.css'
import { useContext, useState } from 'react'
import AuthContext from '../../../contexts/auth.context'
import { Link } from 'react-router-dom'
import { postPlan } from '../../../services/api.service'
import { delWorkout } from '../../../services/api.service'


function DropBtns(props) {
const { workout, onSelectWorkout, onDeleteWorkout, hideBtns} = props

const {user} = useContext(AuthContext)

const [text, setText] = useState('Selected workout');
const [icon, setIcon] = useState('fa-solid fa-circle-check')
const [isAddedToPlanning, setIsAddedToPlanning] = useState(user.planning === workout._id);




const handleMouseEnter = () => {
    setText('Remove planning');
    setIcon('fa-solid fa-circle-xmark')
}

const handleMouseLeave = () => {
    setText('Selected workout');
    setIcon('fa-solid fa-circle-check')
}


const handleDelete = () => {
    delWorkout(workout._id)
    window.location.reload();
}

async function handleSelectedPlan() {

    if (isAddedToPlanning) {
        window.location.reload();
        const updatedUser = {...user, planning: null}
        setIsAddedToPlanning(false)
        try {
            await postPlan(updatedUser)
        }catch(err){
            console.log(err)
        }
    } else {
        window.location.reload();
        const updatedUser = {...user, planning: workout._id}
        setIsAddedToPlanning(true)
        try {
            await postPlan(updatedUser)
        }catch(err){
            console.log(err)
        }
    }
    

}

  return (
    <div className="drop-btn-div">
{isAddedToPlanning ? (
    <button className='drop-btn' type='button'>
        <div className="selected-workout" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} onClick={handleSelectedPlan}>
            <i className={icon}></i>
            <span>{text}</span>
        </div>
    </button>
) : (
    <button className='drop-btn' type='button' onClick={handleSelectedPlan}>
        <div className="link-drop">
            <i className="fa-solid fa-circle-check"></i>
            <span className="drop-link-text">Add to my plan</span>
        </div>
    </button>
)}
{workout.owner !== user._id && (
    <>
        <button className='drop-btn' type='button'>
            <Link to={`/edit-workout/${workout._id}`}>
                <div className="link-drop">
                <i className="fa-solid fa-pen"></i>
                    <span className="drop-link-text">Edit workout</span>
                </div>
            </Link>
        </button>
        <button className='drop-btn' type='button' onClick={handleDelete}>
            <div className="link-drop selected-trash">
                <i className="fa-solid fa-trash-can red-text"></i>
                <span className="trash-link-text">Delete</span>
            </div>
    </button>
    </>  
)}

{!hideBtns && (
    <button className='drop-btn' type='button'>
    <Link to={`/workout/${workout._id}`}>
        <div className="link-drop">
            <i className="fa-solid fa-eye"></i>
            <span className="drop-link-text">Go to workout</span>
        </div>
    </Link>
    </button>
)}

</div> 
  )
}

export default DropBtns