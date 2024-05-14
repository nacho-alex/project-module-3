import { useState, useContext, useEffect} from "react";
import ExerciseCapsuleAdd from "../../../components/Exercises/ExerciseCapsuleAdd/ExerciseCapsuleAdd";
import AuthContext from '../../../contexts/auth.context'
import SearchExercises from "../../../components/Exercises/Search/SearchExercises";
import { Link, useParams } from "react-router-dom";
import WeekDay from "../../../components/workouts/WeekDay/WeekDay";
import { updateWorkout, getWorkout } from "../../../services/api.service";
import { useNavigate } from "react-router-dom";
import jumboImg from '../../../assets/banner3.jpg'
import './workout-edit.css'
import FiresInput from "../../../components/workouts/FiresInput/FiresInput";
import '../../../components/workouts/Workout-Item/workoutItem.css'
import SpeechError from "../../../components/UI/speechError";




function EditWorkout(props) {
    
    const initialState = {
        image: '',
        title: '',
        description:'',
        exercises: [],
    }
    const params = useParams();
    const [workout, setWorkout] = useState(initialState);
    const context = useContext(AuthContext);
    const navigate = useNavigate();

    const [page, setPage] = useState(1);
    const [actualDay, setDay] = useState('mon')
    const [errors, setValidateErrors] = useState({});



    useEffect(() => {
        async function fetch() {
            try {
              const workoutData = await getWorkout(params);
              setWorkout(workoutData.data);
            } catch (error) {
             console.log(error)
            } 
          }
          fetch();
        }, []
    );

   

    const handleChange = (event) => {
        const{name, value} = event.currentTarget;
        setWorkout({...workout, [name]: value});
        console.log(workout)
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
        const exist = workout.exercises.some(ex => ex.day === exercise.day && ex._id === exercise._id);
    
        if (!exist) {
            const updatedExercises = [...workout.exercises, exercise];
            setWorkout({...workout, exercises: updatedExercises});
            setPage(1);
        } else {
            return;
        }
    }

    const handleRemove = (id) => {
        const updatedExercises = workout.exercises.filter(ex => ex._id !== id);
        setWorkout({...workout, exercises: updatedExercises});
        setPage(1);

    }

    const handleEditWork = (exerciseWork, id) => {
        const updatedExercises = workout.exercises.map(exercise => {
            if (exercise._id === id) {
                return {...exercise, work: exerciseWork};
            }
            return exercise;
        });
        setWorkout({...workout, exercises: updatedExercises});
    }
    const handleSetDay = (day) => {
        setDay(day)
    }

    const handleDifficult = (index) => {
        setWorkout({...workout, difficult: index + 1})
    }

    async function handleSubmit(e) {
        e.preventDefault();
        console.log(workout)
        
        const validateErrors = {};
        if (!workout.title) validateErrors.title = "Title is required";
        if (!workout.description) validateErrors.description = "Description is required";
        if (!workout.exercises.length) validateErrors.exercises = "Add at least 1 exercise";

        if (workout.exercises.length) {
            workout.exercises.forEach(exercise => {
                if (!exercise.work || !exercise.work.sets) validateErrors.sets = `sets is required`;
                if (!exercise.work || !exercise.work.reps) validateErrors.reps = `reps is required`;
            });
        }
        
        if (!Object.keys(validateErrors).length) {
            setWorkout({...workout, owner: context.user.id, ownername: context.user.name})

            try {
                const response = await updateWorkout(params, workout)
                setValidateErrors({});
                navigate(`/workout/${params.id}`)
            } catch (err) {
                console.log(err)
            }
        } else {
            setValidateErrors(validateErrors);
        }
    }

    
  
    return (
        <>
        
            <div className="jumbo">
                <div className="h1-div">
                    <h1 className='page-title'>Edit workout</h1>
                </div>
                
                <img src={jumboImg} alt="" />
                <div className="create-links">
                </div>
            </div>

            {Object.values(errors).length > 0 ? <SpeechError errors={errors} direction='right' y='20' x='10'/> : null }

            
            {page === 1 && (
                
                
                <form onSubmit={handleSubmit}>
                    <Link className="back-btn" to={'/list-workout'}> <i className="fa-solid fa-arrow-left"></i> Back </Link>
                
                    <div className="edit-container">
                        
                        <img src={workout.image} alt="" />
                        <div className="workout-main">

                            <div className="edit-group1">
                                    <div className="input-box">
                                        <p className="workout-p">
                                            <strong>Image URL:</strong> 
                                        </p>
                                        <input type="text" name="image" value={workout.image} placeholder="image URL" onChange={handleChange}/>
                                    </div>

                                    <div className="input-box">
                                        <p className="workout-p">
                                            <strong>Workout name:</strong> 
                                        </p>
                                        <input type="text" name="title" value={workout.title} placeholder="title" onChange={handleChange}/>
                                    </div>

                                    <div className="input-box-diff">
                                        <p className="workout-p">
                                            <strong>Difficult:</strong> 
                                        </p>

                                        
                                            <FiresInput prevState={workout.difficult} handleDifficult={handleDifficult}></FiresInput>
                                        

                                    </div>
                                    
                            </div>
                            

                            
                            
                            
                        </div>
                    </div>
                    <div className='plane-box' style={{ backgroundColor: 'rgba(46, 46, 46, 0.894)', color: 'white' }}>
                            <div className="input-box">
                                <h2>Edit Description</h2>
                                <textarea name="description" value={workout.description} placeholder="description" onChange={handleChange}/>
                                <div id="editor">
                                    
                                </div>
                            </div>
 
                    </div>
                    <div>

                    <div className="exercises-div">
                        <div className="h4-and-btn">
                        <h2>Exercises</h2>
                        </div>
                                             
                        <WeekDay onSelectDay={handleSetDay} actualDay={actualDay}></WeekDay>
                        <div className="exercises-container">
                            {workout.exercises && workout.exercises
                                    .filter(ex => ex.day === actualDay)
                                    .map((ex) => 
                                        <ExerciseCapsuleAdd 
                                            key={ex._id + ex.day} 
                                            exercise={ex}  
                                            onEditWork={handleEditWork} 
                                            onRemove={handleRemove}
                                        />
                                )}
                        </div>

                            
                        <div className="edit-wo-btns">
                            <button className="add-ex-btn button" onClick={handlePageAddExercise}><i className="fa-solid fa-plus"></i> add more</button>
                            <button className="add-ex-btn button red" type="submit"><i className="fa-solid fa-floppy-disk"></i> Save changes</button>  
                        </div>
                        
                    </div>
                             
                </div>
                        

                    
                </form>
            )}

            {page=== 2 && (
                <>
                <div className="exercises-div">
                    <div>
                        <button className='back-btn' onClick={handlePageBack}><i className="fa-solid fa-arrow-left"></i>Back</button>
                    </div>
                    <SearchExercises onAddExercise={handleAddExercise}/>
                </div>
                
                </>
            )} 
        </>
    );
}

export default EditWorkout;