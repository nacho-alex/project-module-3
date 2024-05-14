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
import SpeechError from "../../../components/UI/speechError";
import exampleImg from '../../../assets/gain.png'
import jumboImg from '../../../assets/imgSU2.jpg'


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
    const [errors, setValidateErrors] = useState({});
     
    const handleChange = (event) => {
        const{name, value} = event.currentTarget;
        setFormData({...formData, [name]: value});
    }

    const handlePageAddExercise = (event) => {
        event.preventDefault();
        setPage(2)
        window.scrollTo(0, 0);
    }

    const handlePageBack = (event) => {
        event.preventDefault();
        setPage(1);
    }

    const handleAddExercise = (exercise) => {
        exercise.day = actualDay;
        const exist = formData.exercises.some(ex => ex.day === exercise.day && ex._id === exercise._id);
        

        if (!exist) {
            const updatedExercises = [...formData.exercises, {...exercise,  work: { sets: '', reps: '' }}];
            setFormData({...formData, exercises: updatedExercises});
            setPage(1);
        } else {
            alert(`${exercise.name} has already been added to your workout`);
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
   
        const validateErrors = {};
        if (!formData.title) validateErrors.title = "Title is required";
        if (!formData.description) validateErrors.description = "Description is required";
        if (!formData.exercises.length) validateErrors.exercises = "Add at least 1 exercise";

        if (formData.exercises.length) {
            formData.exercises.forEach(exercise => {
                if (!exercise.work || !exercise.work.sets) validateErrors.sets = `sets is required`;
                if (!exercise.work || !exercise.work.reps) validateErrors.reps = `reps is required`;
            });
        }
        
        if (!Object.keys(validateErrors).length) {
            setFormData({...formData, owner: context.user.id, ownername: context.user.name})

            try {
                await createWorkout(formData);
                setFormData(initialState);
                setValidateErrors({});
                navigate('/list-workout')
            } catch (err) {
                console.log(err)
            }
        } else {
            setValidateErrors(validateErrors);
        } 
    }
  

    return (
        <>
            <div className="create-page">

            {Object.values(errors).length > 0 ? <SpeechError errors={errors} direction='right' y='20' x='12'/> : null }

        
            <div className="jumbo">
                <div className="h1-div">
                    <h1 className='page-title'>Create workout</h1>
                </div>
                
                <img src={jumboImg} alt="" />
                <div className="create-links">
                </div>
            </div>

            
            {page === 1 && (
                
                <form onSubmit={handleSubmit}>
                    <Link className="back-btn" to={'/list-workout'}> <i className="fa-solid fa-arrow-left"></i> Back </Link>
                
                    <div className="edit-container">
                        <div className="create-img">
                            <img src={formData.image ? formData.image : exampleImg} alt="" />
                        </div>
                        
                        <div className="workout-main">

                            <div className="edit-group1">
                                    <div className="input-box">
                                        <p className="workout-p">
                                            <strong>Image URL:</strong> 
                                        </p>
                                        <input type="text" name="image" value={formData.image} placeholder="image URL" onChange={handleChange}/>
                                    </div>

                                    <div className="input-box">
                                        <p className="workout-p">
                                            <strong>Workout name:</strong> 
                                        </p>
                                        <input type="text" name="title" value={formData.title} placeholder="title" onChange={handleChange}/>
                                    </div>

                                    <div className="input-box-diff">
                                        <p className="workout-p">
                                            <strong>Difficult:</strong> 
                                        </p>
                                        <FiresInput handleDifficult={handleDifficult}></FiresInput>
                                    </div>
                                    
                            </div>
                            

                            
                            
                            
                        </div>
                    </div>
                    <div className='plane-box' style={{ backgroundColor: 'rgba(46, 46, 46, 0.894)', color: 'white' }}>
                            <div className="input-box">
                                <h2>Edit Description</h2>
                                <textarea name="description" value={formData.description} placeholder="description" onChange={handleChange}/>
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
                            {formData.exercises && formData.exercises
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
        </div>
        </>
    );
}

export default CreateWorkout;