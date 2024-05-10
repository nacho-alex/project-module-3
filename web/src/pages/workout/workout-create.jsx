import { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import ExerciseDetail from "../../components/Exercises/Detail/ExerciseDetail";
import ExerciseCapsuleAdd from "../../components/Exercises/ExerciseCapsuleAdd/ExerciseCapsuleAdd";
import { createWorkout, getExercises } from "../../services/api.service";
import AuthContext from '../../contexts/auth.context'




function CreateWorkout() {
    const context = useContext(AuthContext)
    const initialState = {
        image:'',
        title: '',
        description: '',
        exercises: [],
    }
    
   

    const [page, setPage] = useState(1);
    const [formData, setFormData] = useState(initialState);
    const [exercises, setExercises] = useState();
    const [filteredExercises, setFilteredExercises] = useState([]);
    const [result, setResult] = useState(20)

    useEffect(() => {
        async function fetch() {
            try {
              const exercisesData = await getExercises();
              setExercises(exercisesData.data);
            } catch (error) {
              console.error(error);
            } 
          }
          fetch();
        }, []
    );
        
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
        setFilteredExercises([]);
    }

    const nameFilter = useRef("");
    const bodyPartFilter = useRef("");
    const targetFilter = useRef("");
    const equipmentFilter = useRef("");

    const handleSearchExercise = (event) => {
        const {name, value} = event.currentTarget
    
         if (name === "name") {
            nameFilter.current = value;
        } else if (name === "bodyPart") {
            bodyPartFilter.current = value;
        } else if (name === "target") {
            targetFilter.current = value;
        } else if (name === "equipment") {
            equipmentFilter.current = value;
        }

        const filtered = exercises.filter((exercise) => {
            const matchesName = exercise.name.toLowerCase().includes(nameFilter.current.toLowerCase());
            const matchesBodyPart = exercise.bodyPart === bodyPartFilter.current;
            const matchesTarget = exercise.target === targetFilter.current;
            const matchesEquipment = exercise.equipment === equipmentFilter.current;
            return (matchesName || !nameFilter.current) && (matchesBodyPart || !bodyPartFilter.current) && (matchesTarget || !targetFilter.current) && (matchesEquipment || !equipmentFilter.current);
        });

        setFilteredExercises(filtered);
    }
    const handleResult = (e) => {
        e.preventDefault();
        setResult(result + 20)
    }

    const handleAddExercise = (exercise) => {
        const exist = formData.exercises.some(ex => ex._id === exercise._id);
            if (!exist) {
            const updatedExercises = [...formData.exercises, exercise];
                setFormData({...formData, exercises: updatedExercises});
                setPage(1)
                console.log(formData)
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

    async function handleSubmit(e) {
        e.preventDefault();
        setFormData({...formData, owner: context.user.id, ownername: context.user.name})

        try {
            const response = await createWorkout(formData)
        } catch (err) {
            console.log(err)
        }
    };
  
    return (
        <>
            <h2>New workout</h2>

            

                {page === 1 && (
                    <form onSubmit={handleSubmit}>
                    
                        <div className="container">
                            <input type="text" name="image" value={formData.image} placeholder="image URL" onChange={handleChange}/>
                            <input type="text" name="title" value={formData.title} placeholder="title" onChange={handleChange}/>
                            <textarea name="description" value={formData.description} placeholder="description" onChange={handleChange}/>
                        </div>
                        <div>
                            <h4>Exercises</h4>
                            <p>Add exercise</p>

                            {formData.exercises.map((ex) => 
                            
                            <ExerciseCapsuleAdd key={ex._id} exercise={ex}  onEditWork={handleEditWork} onRemove={handleRemove}>  </ExerciseCapsuleAdd>
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
                        <select name="bodyPart" onChange={handleSearchExercise}>
                            <option value="">Select body part</option>
                            <option value="back">Back</option>
                            <option value="cardio">Cardio</option>
                            <option value="chest">Chest</option>
                            <option value="lower arms">Lower arms</option>
                            <option value="lower legs">Lower legs</option>
                            <option value="neck">Neck</option>
                            <option value="shoulders">Shoulders</option>
                            <option value="upper arms">Upper arms</option>
                            <option value="upper legs">Upper legs</option>
                            <option value="waist">Waist</option>           
                        </select>
                        <select name="target" onChange={handleSearchExercise}>
                            <option value="">Select target</option>
                            <option value="abductors">Abductors</option>
                            <option value="abs">Abs</option>
                            <option value="adductors">Adductors</option>
                            <option value="biceps">Biceps</option>
                            <option value="calves">Calves</option>
                            <option value="cardiovascular system">Cardiovascular system</option>
                            <option value="delts">Delts</option>
                            <option value="forearms">Forearms</option>
                            <option value="glutes">Glutes</option>
                            <option value="hamstrings">Hamstrings</option>
                            <option value="lats">Lats</option>
                            <option value="levator scapulae">Levator scapulae</option>
                            <option value="pectorals">Pectorals</option>
                            <option value="quads">Quads</option>
                            <option value="serratus anterior">Serratus anterior</option>
                            <option value="spine">Spine</option>
                            <option value="traps">Traps</option>
                            <option value="triceps">Triceps</option>
                            <option value="upper back">Upper back</option>           
                        </select>
                        <select name="equipment" onChange={handleSearchExercise}>
                            <option value="">Select equipment</option>
                            <option value="assisted">Assisted</option>
                            <option value="band">Band</option>
                            <option value="barbell">Barbell</option>
                            <option value="body weight">Body weight</option>
                            <option value="bosu ball">Bosu ball</option>
                            <option value="cable">Cable</option>
                            <option value="dumbbell">Dumbbel</option>
                            <option value="elliptical machine">Elliptical machine</option>
                            <option value="ez barbell">Ez barbell</option>
                            <option value="hammer">Hammer</option>
                            <option value="kettlebell">Kettlebell</option>
                            <option value="leverage machine">Leverage machine</option>
                            <option value="medicine ball">Medicine ball</option>
                            <option value="olympic barbell">Olympic barbell</option>
                            <option value="resistance band">Resistance band</option>
                            <option value="roller">Roller</option>
                            <option value="rope">Rope</option>
                            <option value="skierg machine">Skierg machine</option>
                            <option value="sled machine">Sled machine</option>
                            <option value="smith machine">Smith machine</option>
                            <option value="stability ball">Stability ball</option>
                            <option value="stationary bike">Stationary bike</option>
                            <option value="stepmill machine">Stepmill machine</option>
                            <option value="tire">Tire</option>
                            <option value="trap bar">Trap bar</option>
                            <option value="upper body ergometer">Upper body ergometerr</option>
                            <option value="weighted">weighted</option>
                            <option value="wheel roller">Wheel roller</option>           
                        </select>
                        <input type="text" onChange={handleSearchExercise} className="form-control" placeholder="Search..." />
                        
                        {!filteredExercises.length ? 
                            <p>Busca un ejercicio</p>
                            :
                            <>
                                <p>{filteredExercises.length} results</p>

                                {filteredExercises.slice(0, result).map(exercise => (
                                    <ExerciseCapsuleAdd key={exercise._id} exercise={exercise} onAddExercise={handleAddExercise} ></ExerciseCapsuleAdd>
                                ))}
                                <button onClick={handleResult}>+ Resultados</button>
                            </>
                        }
                        
                    </>
                )}

            
        </>
    );
}

export default CreateWorkout;