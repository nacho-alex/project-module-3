import { useState, useEffect, useContext } from 'react';
import Calendar from 'react-calendar';
import './Calendar.css';
import { getCalendarEntry } from '../../services/api.service';
import AuthContext from '../../contexts/auth.context';
import dayjs from 'dayjs';
import HomeExCapsule from '../../components/home/HomeExCapsule';
import { Link } from 'react-router-dom';
import img1 from '../../assets/imgSU1.jpg';
import img2 from '../../assets/imgSU2.jpg';
import img3 from '../../assets/imgSU3.jpg';
import img4 from '../../assets/imgSU4.jpg';
import img7 from '../../assets/imgSU7.jpg';

function CalendarPage() {
    const context = useContext(AuthContext);
    const [value, setValue] = useState(new Date());
    const [entry, setEntry] = useState([]);
    const [entryDates, setEntryDates] = useState([]);
    const [randomNum, setRandom] = useState(0);
    const [planning, setPlanning] = useState({});
    const [nutritionData, setNutritionData] = useState({
        goalCalories: 0,
        totalKcal: 0,
        totalCarbs: 0,
        totalProt: 0,
        totalFats: 0,
        caloriesBurned: 0
    });
    const circumference = 2 * Math.PI * 100;
    const progressLength = Math.min(((nutritionData.totalKcal - nutritionData.caloriesBurned) / nutritionData.goalCalories) * circumference, circumference);
    const overGoal = (nutritionData.totalKcal - nutritionData.caloriesBurned) > nutritionData.goalCalories;
    const imgArr = [img1, img2, img3, img4, img7];


    const userAgeMilliseconds = Date.now() - new Date(context.user.birthDate).getTime();
    const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;
    const [dayMeals, setDayMeals] = useState(context.user.dayMeals)
    const userAge = Math.floor(userAgeMilliseconds / millisecondsInYear);


    useEffect(() => {
        setRandom(Math.floor(Math.random() * 5));
    }, {})

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
    }, [entry, context.user]);

    
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

        if (entry?.finishedEx) {
            entry.finishedEx.forEach(ex => {
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

        if (entry?.meals?.length > 0) {
            entry.meals.forEach(me => {
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

    const fetchCalendarEntry = async (date) => {
        try {
            if (date) {
                const formattedDate = dayjs(date).format('dddd, D, MMMM, YYYY');
                const entryData = await getCalendarEntry(context.user.id, formattedDate);
                setEntry(entryData.data[0]);
            } else {
                const dates = await getCalendarEntry(context.user.id);
                const formattedDates = dates.data.map(dateStr => dayjs(dateStr, 'dddd, D, MMMM, YYYY').format('YYYY-MM-DD'));
                setEntryDates(formattedDates);
            }
        } catch (error) {
            console.error('Error fetching...:', error);
        }
    };

    const handleDateChange = (date) => {
        setValue(date);
        fetchCalendarEntry(date);
    };


    useEffect(() => {
        fetchCalendarEntry(value);
        fetchCalendarEntry();
    }, [value]);

    const tileInfo = ({ date, view }) => {
        if (view === 'month') {
            const formattedDate = dayjs(date).format('YYYY-MM-DD');
            if (entryDates.includes(formattedDate)) {
                return <i class="fa-solid fa-circle"></i>;
            }
        }
        return null;
    };

    return (
        <>
        <div className='calendar-page'>
        <img className='infinite-bg' src={imgArr[randomNum]} alt="Background" />

            <div className="plane-box homer">
                <Calendar onChange={handleDateChange} value={value} minDetail="year" locale="en-en" tileContent={tileInfo} />
            </div>

        { entry ? (

        <>

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
                            <circle  className="progress" cx="100" cy="100" r="90" style={{
                            strokeDasharray: `${circumference} ${circumference}`,
                            strokeDashoffset: circumference - progressLength,
                            stroke: overGoal ? 'red' : ''
                        }}></circle>
                        </svg>
                    </div>
                </div>
                <div className="objetive-text">
                    <p className='name-p'><i className="fa-solid fa-address-card"></i>{context.user?.username}</p>
                    <h2>{entry.date}</h2>
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
                    <p className='plan-p'><strong>Selected Workout:</strong> {planning.title} <Link to={`/workout/${planning._id}`}>
                        <i className="fa-solid fa-eye"></i></Link></p>
                </div>
            </div>

            <div className='plane-box'>
                    <div className='nutrition-bar-div'>
                        <strong>Proteins:</strong>
                        <span>{Math.round(nutritionData.totalProt)}</span>
                        <div class="loading-bar">
                        <div class="loading-fill" style={{
                            width: `${nutritionData.totalProt / (context.user.weight * 2 / 100)}%`,
                            backgroundColor: "#F2A950"
                        }}></div>
                        </div>
                        <span>{context.user.weight * 2}</span>
                    </div>
                    <div className='nutrition-bar-div'>
                        <strong>Carbs:</strong>
                        <span>{Math.round(nutritionData.totalCarbs)}</span>
                        <div class="loading-bar">
                        <div class="loading-fill" style={{
                        width: `${(nutritionData.totalCarbs / (context.user.goal === 'gain' ? context.user.weight * 5 : context.user.weight * 3)) * 100}%`,
                        backgroundColor: "#4AA2D9"
                        }}></div>
                        </div>
                        <span>{context.user.goal === 'gain' ? (context.user.weight * 5): (context.user.weight * 3)}</span>
                    </div>
                    <div className='nutrition-bar-div'>
                        <strong>Fats:</strong>
                        <span>{Math.round(nutritionData.totalFats)}</span>
                        <div class="loading-bar">
                        <div class="loading-fill" style={{
                        width: `${(nutritionData.totalFats / (context.user.weight * 0.75)) * 100}%`,
                        backgroundColor: "#84BF04"
                        }}></div>
                        </div>
                        <span>{Math.round(context.user.weight * 0.75)}</span>
                    </div>
            
                </div>

                    
            <div className='plane-box training-container'>
                <h1 className='today-h1'>Training</h1>

                {entry.finishedEx?.length === 0 && (
                    <div className="notfound-div">
                        <h3>No exercises for this day</h3>
                        <img src={img404}></img>
                    </div>
                    
                )}
                
                {entry.finishedEx?.map((finishedEx, finExIndex) => (
                    <div key={finExIndex}>
                        <HomeExCapsule completed={true} key={finExIndex} exercise={finishedEx.exercise} />
                    </div>
                ))}
            </div>


                        
            <div className="plane-box">
                <h1 className='today-h1'>Meals</h1>
                {dayMeals.map((meal, index) => (
                    <div key={index} className="plane-box">
                        <div className="meal-header"> 
                            <div>
                                <h1>{meal.name} </h1>
                            </div>
                        </div>
                        {entry.meals && entry.meals[index] && entry.meals[index].food && (
                            entry.meals[index].food.map((me, i) => (
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
                                    </div>
                                </div>
                            ))
                        )}
                        
                    </div>
                ))}  
            </div>
            </>
        ):(
            <div className="plane-box">
                <p>No entries found for this date.</p>
            </div>
        )}
            
                
            </div>

        <div className='home-page'>

            


            

        

            

            
        
            
        </div>
        </>
    );
}

export default CalendarPage;