import { useState, useContext } from "react";
import ExerciseCapsuleAdd from "../../../components/Exercises/ExerciseCapsuleAdd/ExerciseCapsuleAdd";
import { createWorkout } from "../../../services/api.service";
import AuthContext from '../../../contexts/auth.context'
import SearchExercises from "../../../components/Exercises/Search/SearchExercises";
import { Link } from "react-router-dom";
import WeekDay from "../../../components/workouts/WeekDay/WeekDay";
import './workout-create.css'
import { useNavigate } from "react-router-dom";
import FiresInput from "../../../components/workouts/FiresInput/FiresInput";


function CreateWorkout() {
    
    const context = useContext(AuthContext)
    const initialState = {
        image:'',
        title: '',
        description: '',
        exercises: [],
        schedule: [],
        owner: context.user.id,
        ownername: context.user.username,
        difficult: 0,
        work: {}
    }
    
    const [page, setPage] = useState(1);
    const [formData, setFormData] = useState(initialState);
    const [actualDay, setDay] = useState('mon')
    const navigate = useNavigate();
     
    const handleChange = (event) => {
        const{name, value} = event.currentTarget;
        setFormData({...formData, [name]: value});
    }

    const handlePageAddExercise = (event) => {
        event.preventDefault();
        setPage(2)
    }

    const handlePageBack = (event) => {
        event.preventDefault();
        setPage(1);
    }

    const handleAddExercise = (exercise) => {
        exercise.day = actualDay;
        const exist = formData.exercises.some(ex => ex.day === exercise.day && ex._id === exercise._id);
        

        if (!exist) {
            const updatedExercises = [...formData.exercises, exercise];
            setFormData({...formData, exercises: updatedExercises});
            setPage(1);
        } else {
            return;
        }
    }

    const handleRemove = (id) => {
        const updatedExercises = formData.exercises.filter(ex => ex._id !== id);
        setFormData({...formData, exercises: updatedExercises});
        setPage(1);
        console.log(formData);
    }

    const handleEditWork = (exerciseWork, id) => {
        const updatedExercises = formData.exercises.map(exercise => {
            if (exercise._id === id) {
                return {...exercise, work: exerciseWork};
            }
            return exercise;
        });
        setFormData({...formData, exercises: updatedExercises});
    }
    const handleSetDay = (day) => {
        setDay(day)
    }

    const handleDifficult = (index) => {
        setFormData({...formData, difficult: index + 1})
    }
    async function handleSubmit(e) {
        e.preventDefault();
   
        try {
            await createWorkout(formData)
            
        } catch (err) {
            console.log(err)
        }
        navigate('/list-workout')
        
    }
  
    return (
        <>
            <h2>New workout</h2>

            
            {page === 1 && (
                
                <form onSubmit={handleSubmit}>
                    <Link className='back-btn' to={'/list-workout'}><i className="fa-solid fa-arrow-left"></i> Back </Link>
                
                    <div className="container">
                        <input type="text" name="image" value={formData.image} placeholder="image URL" onChange={handleChange}/>
                        <input type="text" name="title" value={formData.title} placeholder="title" onChange={handleChange}/>
                        <textarea name="description" value={formData.description} placeholder="description" onChange={handleChange}/>
                        <div>
                            <FiresInput prevState={formData.difficult} handleDifficult={handleDifficult}></FiresInput>
                        </div>
                    </div>
                    <div>
                        <h4>Exercises</h4>
                        <p>Add exercise</p>

                        <WeekDay onSelectDay={handleSetDay} actualDay={actualDay}></WeekDay>


                            {formData.exercises
                                .filter(ex => ex.day === actualDay)
                                .map((ex) => 
                                    <ExerciseCapsuleAdd 
                                        key={ex._id + ex.day} 
                                        exercise={ex}  
                                        onEditWork={handleEditWork} 
                                        onRemove={handleRemove} 
                                        
                                    />
                            )}
                        
                        <button onClick={handlePageAddExercise}>+</button>
                    </div>
                    <button type="submit"> Create rutine</button>
                    
                </form>
            )}

            {page=== 2 && (
                <>
                    <div>
                        <button onClick={handlePageBack}>Back</button>
                    </div>
                    <SearchExercises handleChange={handleChange} onAddExercise={handleAddExercise}/>
                </>
            )} 
        </>
    );
}

export default CreateWorkout;