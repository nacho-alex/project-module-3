import { useEffect, useRef, useState } from "react";
import { getExercises } from "../../../services/api.service";
import ExerciseCapsuleAdd from "../ExerciseCapsuleAdd/ExerciseCapsuleAdd"
import './SearchExercises.css'


function SearchExercises({onAddExercise}) {

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
        setResult(20)
    }



    const handleResult = (e) => {
        e.preventDefault();
        setResult(result + 20)
    }

    const handleAddExercise = (exercise) => {
        onAddExercise(exercise)
    }


  return (
    <>

    <div className="div-filters">
        <div className="input-box-flt">
        <p className="filter-name">Bodypart</p>
        <select name="bodyPart" onChange={handleSearchExercise}>
                <option value="">Select</option>
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
        </div>

        <div className="input-box-flt">
        <p className="filter-name">equipment</p>
            <select name="equipment" onChange={handleSearchExercise}>
                <option value="">Select</option>
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
                <option value="upper body ergometer">Upper body ergometer</option>
                <option value="weighted">Weighted</option>
                <option value="wheel roller">Wheel roller</option>           
            </select>
            </div>
    </div>
       
        <input  type="text" name="name" onChange={handleSearchExercise} className="search-bar" placeholder="Search..." />

        {!filteredExercises.length ? 
            <p className="write-smt">Write something...</p>
            :
            <>
                <p className="write-smt">{filteredExercises.length} results</p>

                {filteredExercises.slice(0, result).map(exercise => (
                    <ExerciseCapsuleAdd 
                    key={exercise._id} 
                    exercise={exercise} 
                    onAddExercise={onAddExercise ? handleAddExercise : null}
                    />                ))}
                {result < filteredExercises.length && <button className="add-ex-btn button" onClick={handleResult}>More results...</button>}
            </>
        }
    </>
  );
}

export default SearchExercises;