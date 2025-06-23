import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../contexts/auth.context';
import { getPlanning, getEntry, updateEntry, deleteEntry, submitNewMeal, submitNewDayMeal, deleteDayMeal } from '../../services/api.service';
import HomeExCapsule from '../../components/home/HomeExCapsule';
import dayjs from 'dayjs';
import WeekDay from '../../components/workouts/WeekDay/WeekDay';
import { Link } from 'react-router-dom';
import img1 from '../../assets/imgSU1.jpg';
import img2 from '../../assets/imgSU2.jpg';
import img3 from '../../assets/imgSU3.jpg';
import img4 from '../../assets/imgSU4.jpg';
import img7 from '../../assets/imgSU7.jpg';
import SearchExercises from '../../components/Exercises/Search/SearchExercises';
import SearchFood from '../../components/food/search-food/search-food';
import './home.css';

import img404 from '../../assets/exe404.png'

function Home() {
    const context = useContext(AuthContext);
    const [randomNum, setRandom] = useState(0);
    const [page, setPage] = useState(1);
    const actualDay = dayjs().format('dddd, D, MMMM, YYYY');
    const [actualDayView, setDayView] = useState(dayjs().format('dddd, D, MMMM, YYYY').toLowerCase().slice(0, 3));
    const [dayMeals, setDayMeals] = useState(context.user.dayMeals)

    const userAgeMilliseconds = Date.now() - new Date(context.user.birthDate).getTime();
    const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;
    const userAge = Math.floor(userAgeMilliseconds / millisecondsInYear);

    const initialValue = { finishedEx: [], owner: context.user.id, date: dayjs().format('dddd, D, MMMM, YYYY'), meals: [] };
    const [planning, setPlanning] = useState({});
    const [actualFood, setActualFood] = useState({});
    const [fullEntryState, setFullEntry] = useState(initialValue);
    const [saveIndex, setSaveIndex] = useState(null);
    const [mealName, setMealName] = useState(''); 
    const [nutritionData, setNutritionData] = useState({
        goalCalories: 0,
        totalKcal: 0,
        totalCarbs: 0,
        totalProt: 0,
        totalFats: 0,
        caloriesBurned: 0
    });

    const imgArr = [img1, img2, img3, img4, img7];
    
    const circumference = 2 * Math.PI * 90; // Assuming a radius of 90 for your circle
    const defaultProgressLength = 0; // Default value for progressLength if it is undefined or not a number
    
    const isValidNumber = (value) => typeof value === 'number' && !isNaN(value);
    const progressLength = Math.min(((nutritionData.totalKcal - nutritionData.caloriesBurned) / nutritionData.goalCalories) * circumference, circumference);
    const calculatedProgressLength = isValidNumber(progressLength) ? progressLength : defaultProgressLength;
    const validCircumference = isValidNumber(circumference) ? circumference : 0;
    const strokeDashoffset = validCircumference - calculatedProgressLength;
    const overGoal = (nutritionData.totalKcal - nutritionData.caloriesBurned) > nutritionData.goalCalories;

    const handleAddToEntry = (data) => {
        const formattedData = { finishedEx: data };
        handleSubmit(formattedData);
    };

    async function handleSubmit(data) {
        try {
            const response = await updateEntry(data);
            if (response) {
                setFullEntry(response.data);
            }
        } catch (err) {
            console.error('Error al enviar los datos:', err);
        }
    }

    useEffect(() => {
        const goalCalories = calculateCaloriesGoal();
        const { totalKcal, totalCarbs, totalProt, totalFats, caloriesBurned } = calculateMacros();

        setNutritionData({
            goalCalories,
            totalKcal,
            totalCarbs,
            totalProt,
            totalFats,
            caloriesBurned
        });
    }, [fullEntryState, context.user]);

    useEffect(() => {
        handleSubmit(initialValue);
        setRandom(Math.floor(Math.random() * 5));

        if (context.user.planning) {
            async function fetchPlanning() {
                try {
                    const workoutData = await getPlanning(context.user.planning);
                    setPlanning(workoutData.data);
                } catch (error) {
                    console.error('Error fetching planning:', error);
                }
            }
            fetchPlanning();
        }
    }, [context.user.planning]);

    const handleSetDay = (day) => {
        setDayView(day);
    };

    const calculateCaloriesGoal = () => {
        let tmb;
        if (context.user.genre === 'male') {
            tmb = ((10 * context.user.weight) + (6.25 * context.user.height) - (5 * userAge) + 5) * context.user.activityLevel;
        } else {
            tmb = ((10 * context.user.weight) + (6.25 * context.user.height) - (5 * userAge) - 161) * context.user.activityLevel;
        }
        const goalCalories = Math.floor(context.user.goal === 'gain' ? tmb + 400 : tmb - 400);
        return goalCalories;
    };

    const calculateMacros = () => {
        let totalWeight = 0;
        let totalReps = 0;
        let caloriesBurned = 0;

        if (fullEntryState.finishedEx) {
            fullEntryState.finishedEx.forEach(ex => {
                if (Array.isArray(ex.work)) {
                    ex.work.forEach(work => {
                        const { reps, kg } = work;
                        const weightPerEx = reps * kg;
                        totalReps += reps;
                        totalWeight += weightPerEx;
                    });
                }
            });

            const userWeight = context.user.weight;
            const MET = 3 + (totalWeight / 1000);
            const duration = (totalReps * 2) / 3600;

            caloriesBurned = userWeight * MET * duration;
            caloriesBurned = Math.round(caloriesBurned * 3);
        }

        let totalKcal = 0;
        let totalCarbs = 0;
        let totalProt = 0;
        let totalFats = 0;

        if (fullEntryState.meals.length > 0) {
            fullEntryState.meals.forEach(me => {
                me.food.forEach((food) => {
                    const { qty, calories_kcal, carbohydrates_g, protein_g, totalFat_g } = food;

                    const calories = qty * calories_kcal;
                    const carbs = qty * carbohydrates_g;
                    const protein = qty * protein_g;
                    const fats = qty * totalFat_g;

                    totalKcal += calories;
                    totalCarbs += carbs;
                    totalProt += protein;
                    totalFats += fats;
                });
            });
        }

        return { totalKcal, totalCarbs, totalProt, totalFats, caloriesBurned };
    };

    const handleDeleteEntry = async (id, type, event) => {
        event.stopPropagation();
        let updatedFinishedEx = fullEntryState.finishedEx;
        let updatedMeals = fullEntryState.meals;
        let updatedPlanning = planning;

        if (type === 'exercise') {
            updatedFinishedEx = fullEntryState.finishedEx.filter(ex => ex.exercise._id !== id);
            updatedPlanning = {
                ...planning,
                exercises: planning.exercises.filter(ex => ex._id !== id)
            };
        } else if (type === 'food') {
            const [mealIndex, foodIndex] = id.split('-');
            updatedMeals = fullEntryState.meals.map((meal, index) => {
                if (index === parseInt(mealIndex, 10)) {
                    return {
                        ...meal,
                        food: meal.food.filter((_, idx) => idx !== parseInt(foodIndex, 10))
                    };
                }
                return meal;
            });
        }

        const updatedState = {
            ...fullEntryState,
            finishedEx: updatedFinishedEx,
            meals: updatedMeals
        };

        try {
            const response = await deleteEntry(updatedState);
            if (response) {
                setFullEntry(response.data);
                setPlanning(updatedPlanning);
            }
        } catch (err) {
            console.error('Error al borrar la entrada:', err);
        }
    };

    const handleAddExercise = (data) => {
        const newData = { ...data, day: actualDayView };
        setPlanning(prevPlanning => ({
            ...prevPlanning,
            exercises: [...(prevPlanning.exercises || []), newData]
        }));
        setPage(1);
    };
    

    const handlePage = (data) => {
        setPage(data);
    };

    const handleAddFood = (index) => {
        setPage(3);
        setSaveIndex(index);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setActualFood({ ...actualFood, [name]: name === 'qty' ? Number(value) : value });
    };

    const handleAddFoodToMeal = (Food) => {
        const foodArray = Array.isArray(Food) ? Food : [Food];
        const foodData = { mealIndex: saveIndex, food: foodArray };
        handleSubmit(foodData);
        setPage(1);
    };
    
    const handleMealUpdate = () => {
        const foodData = { mealIndex: saveIndex, food: [{ ...actualFood, qty: Number(actualFood.qty) }] };
        handleSubmit(foodData);
        setPage(1);
    };

    const handleSaveMeal = async () => {
        const newMeal = { food: fullEntryState.meals[saveIndex].food, name: mealName };
        setPage(1)
        try {
            const response = await submitNewMeal(newMeal);
            if (response) {
                setMealName(''); 
                setSaveIndex(0)
            }
        } catch (err) {
            console.error('Error al guardar la comida:', err);
        }
    };
    
    const handleDeleteDayMeal = async () => {
      setDayMeals((prevDayMeals) => {
        const updatedDayMeals = prevDayMeals.slice(0, -1);
        return updatedDayMeals;
      });
      deleteDayMeal()
    }
    
    const handleSaveDayMeal = async () => {
      const newMeal = { food: [], name: `Extra meal ${context.user.dayMeals.length + 1}` };
      setDayMeals([...dayMeals, newMeal])
      try {
          const response = await submitNewDayMeal(newMeal);
          if (response) {
              setMealName(''); 
              setSaveIndex(0)
          }
      } catch (err) {
          console.error('Error al guardar la comida:', err);
      }
  };

  const handleExpandNewMeal = (index) => {
    setSaveIndex(index)
    setPage(5)
  }

    return (
        <div className='home-page'>
            <img className='infinite-bg' src={imgArr[randomNum]} alt="Background" />

            <div className="plane-box home ">
                <div className="objetive-circle">
                <div className="circle-container">
                        <h2>{Math.round(nutritionData.goalCalories + nutritionData.caloriesBurned - nutritionData.totalKcal)}</h2>
                        <>
                        { (nutritionData.totalKcal - nutritionData.caloriesBurned) > nutritionData.goalCalories ? (
                            <h3>LEFTOVER</h3>
                        ):(
                            <h3>REMAINING</h3>
                        )}
                        </>
                        
                        <svg className="circle" width="200" height="200">
                            <circle className="background" cx="100" cy="100" r="90"></circle>
                            <circle className="progress" cx="100" cy="100" r="90" style={{
                                strokeDasharray: `${validCircumference} ${validCircumference}`,
                                strokeDashoffset: isValidNumber(strokeDashoffset) ? strokeDashoffset : 0,
                                stroke: overGoal ? 'red' : ''
                            }}></circle>
                        </svg>
                    </div>
                </div>
                <div className="objetive-text">
                    <p className='name-p'><i className="fa-solid fa-address-card"></i>{context.user?.username}</p>
                    <h2>{actualDay}</h2>
                    <div className="objetive-calories">
                        <div className="objetive-item">
                            <i className="fa-brands fa-font-awesome" style={{ color: '#F2A950' }}></i>
                            <p>Goal: <span>{nutritionData.goalCalories}</span></p>
                        </div>
                        <div className="objetive-item">
                            <i className="fa-brands fa-font-awesome" style={{ color: '#4AA2D9' }}></i>
                            <p>Food: <span>{Math.round(nutritionData.totalKcal)}</span></p>
                        </div>
                        <div className="objetive-item">
                            <i className="fa-brands fa-font-awesome" style={{ color: '#84BF04' }}></i>
                            <p>Exercise: <span>-{nutritionData.caloriesBurned.toFixed()}</span></p>
                        </div>
                    </div>

                    {planning.title ? (
                        <p className='plan-p'><strong>Selected Workout:</strong> {planning.title} <Link  to={`/workout/${planning._id}`}>
                        <i className="fa-solid fa-eye"></i></Link></p>
                    ):(
                        <p className='plan-p'><strong>You have not selected a workout yet</strong> <Link className='home-link' to={`/list-workout`}>View all
                        <i className="fa-solid fa-eye"></i></Link></p>
                    )}
                    
                </div>
            </div>
            <div className='plane-box'>
                    <div className='nutrition-bar-div'>
                        <strong>Proteins:</strong>
                        <span>{Math.round(nutritionData.totalProt)}</span>
                        <div className="loading-bar">
                        <div className="loading-fill" style={{
                            width: `${nutritionData.totalProt / (context.user.weight * 2 / 100)}%`,
                            backgroundColor: "#F2A950"
                        }}></div>
                        </div>
                        <span>{context.user.weight * 2}</span>
                    </div>
                    <div className='nutrition-bar-div'>
                        <strong>Carbs:</strong>
                        <span>{Math.round(nutritionData.totalCarbs)}</span>
                        <div className="loading-bar">
                        <div className="loading-fill" style={{
                        width: `${(nutritionData.totalCarbs / (context.user.goal === 'gain' ? context.user.weight * 5 : context.user.weight * 3)) * 100}%`,
                        backgroundColor: "#4AA2D9"
                        }}></div>
                        </div>
                        <span>{context.user.goal === 'gain' ? (context.user.weight * 5): (context.user.weight * 3)}</span>
                    </div>
                    <div className='nutrition-bar-div'>
                        <strong>Fats:</strong>
                        <span>{Math.round(nutritionData.totalFats)}</span>
                        <div className="loading-bar">
                        <div className="loading-fill" style={{
                        width: `${(nutritionData.totalFats / (context.user.weight * 0.75)) * 100}%`,
                        backgroundColor: "#84BF04"
                        }}></div>
                        </div>
                        <span>{Math.round(context.user.weight * 0.75)}</span>
                    </div>
            
                </div>

            <div className='plane-box training-container'>
                <h1 className='today-h1'>Today training</h1>

                <WeekDay actualDay={actualDayView} onSelectDay={handleSetDay}></WeekDay>

                {fullEntryState.finishedEx?.map((ex, index) => (
                    <HomeExCapsule onDeleteEntry={(data, event) => handleDeleteEntry(data, 'exercise', event)} completed={true} key={index} exercise={ex.exercise} onSendEx={handleAddToEntry} />
                ))}
                {planning.exercises?.length >= 0 && (
                
                <>
                {planning.exercises
                    ?.filter(ex =>
                        ex.day === actualDayView &&
                        (!fullEntryState || !fullEntryState.finishedEx?.some(fEx => fEx.exercise._id === ex._id))
                    )
                    .map((ex, index) => (
                        <HomeExCapsule key={index} exercise={ex} onSendEx={handleAddToEntry} />
                    ))}
                </>
                )}
                
                {!planning.exercises?.length > 0 && !fullEntryState.finishedEx?.length > 0 && (
                    <div className="notfound-div">
                        <h3>No exercises are planned for this day</h3>
                        <img src={img404}></img>
 
                    </div>
                    
                )}
    
                <button className="add-ex-btn button" onClick={() => handlePage(2)}><i className="fa-solid fa-plus"></i> add more</button>
            </div>

            {page === 2 && (
                <div className='search-overlay fade-in'>
                    <div className="plane-box overlay">
                        <button className='back-btn back-btn-overlay' onClick={() => handlePage(1)}><i className="fa-solid fa-arrow-left"></i>Back</button>
                        <SearchExercises onAddExercise={handleAddExercise} />
                    </div>
                </div>
            )}

            

            <div className="plane-box">
                <h1 className='today-h1'>Today meals</h1>

              
                {dayMeals.map((meal, index) => (
                    <div key={index} className="plane-box">
                        <div className="meal-header"> 
                            <div>
                                <h1>{meal.name}
                                {index === dayMeals.length - 1 && index  >  2 && (
                                    <button className="delete-btn" onClick={(event) => handleDeleteDayMeal()}><i className="fa-solid fa-trash-can red-text button-trash" /></button>
                                )}
                                </h1>
                            </div>
                            <button className="add-ex-btn button" onClick={() => handleAddFood(index)}><i className="fa-solid fa-plus"></i> Add</button>
                        </div>
                        {fullEntryState.meals && fullEntryState.meals[index] && fullEntryState.meals[index].food && (
                            fullEntryState.meals[index].food.map((me, i) => (
                                <div className='meal-capsule' key={i}>
                                    <div>
                                        <i>{me.emoji}</i>
                                        <h3>{me.name}</h3>
                                    </div>
                                    <div className="qty-div">
                                        <p>{me.qty} {me.unit}</p>
                                        <p><strong>PRO: </strong>{Math.round(me.protein_g * me.qty)}</p>
                                        <p><strong>CAR: </strong> {Math.round(me.carbohydrates_g * me.qty)}</p>
                                        <p><strong>FAT: </strong>{Math.round(me.totalFat_g * me.qty)}</p>
                                        <p>{Math.round(me.calories_kcal * me.qty)} KCAL</p>
                                    </div>
                                    <div>
                                        <button className="delete-btn" onClick={(event) => handleDeleteEntry(`${index}-${i}`, 'food', event)}><i className="fa-solid fa-trash-can red-text button-trash" /></button>
                                    </div>
                                </div>
                            ))
                        )}
                        {fullEntryState.meals[index]?.food.length >= 2 && (
                            <> 
                                <button  onClick={(event) => handleExpandNewMeal(index)} className='expand-cr-food'><i className='fa-solid fa-plus'></i>Save recipe</button>
                            </>
                        )}
                    </div>
                ))}  
                                <button  className='new-daily' type='button' onClick={() => handleSaveDayMeal()}>
                                        <i className="fa-solid fa-plus" /> New daily Meal
                                </button>
 
                            
                       
            </div>
            
            {page === 5 && (
                    <div className='search-overlay fade-in'>
                        <div className="plane-box overlay">

                          <div>
                              <button className='back-btn back-btn-overlay' onClick={() => handlePage(1)}><i className="fa-solid fa-arrow-left"></i>Back</button>
                            
                            <h1>New meal</h1>

                             {fullEntryState && ( fullEntryState.meals[saveIndex].food.map((fd, i) => (
                              
                                <div className='meal-capsule' key={i}>
                                    <div>
                                        <i>{fd.emoji}</i>
                                        <h3>{fd.name}</h3>
                                    </div>
                                    <div className="qty-div">
                                        <p>{fd.qty} {fd.unit}</p>
                                        <p><strong>PRO: </strong>{Math.round(fd.protein_g * fd.qty)}</p>
                                        <p><strong>CAR: </strong> {Math.round(fd.carbohydrates_g * fd.qty)}</p>
                                        <p><strong>FAT: </strong>{Math.round(fd.totalFat_g * fd.qty)}</p>
                                        <p>{Math.round(fd.calories_kcal * fd.qty)} KCAL</p>
                                    </div>
                                </div>

                             )))}
                          </div>
                            

                            <div className='save-meal-inp'>

                                  <input
                                    type="text"
                                    placeholder="Meal name"
                                    value={mealName}
                                    onChange={(e) => setMealName(e.target.value)}
                                    className="meal-name-input"
                                  />
                                   <button type='button' onClick={() => handleSaveMeal()} className='button add-ex-btn'>
                                    <i className="fa-solid fa-save" /> Save meal
                                </button>
                            </div>
                           
                        </div>
                    </div>
               )}
            {page === 3 && (
                <div className='search-overlay'>
                    <div className="plane-box overlay food-box">
                        <button className='back-btn back-btn-overlay' onClick={() => handlePage(1)}><i className="fa-solid fa-arrow-left"></i>Back</button>
                        <SearchFood onAddFood={handleAddFoodToMeal} />
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
