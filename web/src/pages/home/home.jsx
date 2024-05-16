import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../contexts/auth.context';
import { getPlanning, getEntry } from '../../services/api.service';
import HomeExCapsule from '../../components/home/HomeExCapsule';
import './home.css'
import { updateEntry } from '../../services/api.service';
import dayjs from 'dayjs';
import WeekDay from '../../components/workouts/WeekDay/WeekDay';
import { Link } from 'react-router-dom';

import img1 from '../../assets/imgSU1.jpg'
import img2 from '../../assets/imgSU2.jpg'
import img3 from '../../assets/imgSU3.jpg'
import img4 from '../../assets/imgSU4.jpg'
import img7 from '../../assets/imgSU7.jpg'



function Home() {

    const context = useContext(AuthContext);
    const [randomNum, setRandom] = useState(0);
    const actualDay = dayjs().format('dddd, D, MMMM, YYYY')
    const [actualDayView, setDayView] = useState(dayjs().format('dddd, D, MMMM, YYYY').toLowerCase().slice(0, 3))
    const userAgeMilliseconds = Date.now() - new Date(context.user.birthDate).getTime();
    const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;
    const userAge = Math.floor(userAgeMilliseconds / millisecondsInYear);

    const [objetive, setObjetive] = useState(0)
    const [caloriesCount, setCal] = useState(0)
    const [planning, setPlanning] = useState({})

    const initialValue = {finishedEx: [], owner: context.user.id, date: dayjs().format('dddd, D, MMMM, YYYY')}
    const [entryState, setEntry] = useState(initialValue)
    const [fullEntryState, setFullEntry] = useState([])

    const imgArr = [img1, img2, img3, img4, img7];

    const circumference = 2 * Math.PI * 100; 
    const progressLength = (50 / 100) * circumference;
    
    

       const handleAddToEntry = (data) => {

          const updatedEntry = {
            ...entryState, 
            finishedEx: [...entryState.finishedEx, data]
          };
          setEntry(updatedEntry)
          handleSubmit(updatedEntry)
      }

      async function handleSubmit(data) {
          try{
             const response = await updateEntry(data)
             if (response) {
              setEntry(initialValue)
              setFullEntry(response.data)
              console.log(response.data)
            }
          }catch (err){
            
          }
      }

      async function getEntryData(data) {
        try{
           const response = await getEntry(data)
           if (response) {
            setFullEntry(response.data)
            console.log(response.data)
          }
        }catch (err){
          
        }
    }

    useEffect(() => {

      getEntryData()
      
        setObjetive(calculateCalories())
        setRandom(Math.floor(Math.random() * 5));

        if (context.user.planning) {
          setObjetive(calculateCalories());
  
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
      setDayView(day)
    }


    const calculateCalories = () => {
      let tmb
      if (context.user.genre === 'male') {
         tmb = ((10 * context.user.weight) + (6.25 * context.user.height) - (5 * userAge) + 5) * context.user.activityLevel
      } else {
         tmb = ((10 * context.user.weight) + (6.25 * context.user.height) - (5 * userAge) - 161) * context.user.activityLevel
      }
      const total = context.user.goal === 'gain' ? tmb + 400 : tmb - 400;
      return Math.floor(total)
    }

    
    
    return (
        <div className='home-page'>
            <img className='infinite-bg' src={imgArr[randomNum]} alt="Background" />

            
            <div className="plane-box home ">

                  <div className="objetive-circle">
                  <div className="circle-container">

                  <h2>{objetive}</h2>
                  <h3>REMAINING</h3>

                      <svg className="circle" width="200" height="200">
                          <circle className="background" cx="100" cy="100" r="90"></circle>
                          <circle className="progress" cx="100" cy="100" r="90" style={{ strokeDasharray: `${circumference} ${circumference}`, strokeDashoffset: circumference - progressLength }}></circle>
                      </svg>
                </div>
                  </div>
              <div className="objetive-text">
              <p className='name-p'><i className="fa-solid fa-address-card"></i>{context.user?.username}</p>
                  <h2>{actualDay}</h2>
                  <div className="objetive-calories">
                    
                    <div className="objetive-item">
                      <i className="fa-brands fa-font-awesome" style={{color: '#F2A950'}}></i>
                      <p>Objetive <span>{objetive}</span></p>
                    </div>
                    
                    <div className="objetive-item">
                      <i className="fa-brands fa-font-awesome"style={{color: '#4AA2D9'}}></i>
                      <p>Food:  <span>{objetive}</span></p>
                    </div>

                    <div className="objetive-item">
                      <i className="fa-brands fa-font-awesome" style={{color: '#84BF04'}}></i>
                      <p>Exercise: <span>{objetive}</span></p>
                    </div>
                  </div>
                    <p className='plan-p'><strong>Selected Workout:</strong> {planning.title} <Link to={`/workout/${planning._id}`}>
                      <i className="fa-solid fa-eye"></i></Link></p>
                </div>
            
            </div>
           


                <div className='plane-box training-container'>
                    <h1 className='today-h1'>Today training</h1>

                <WeekDay actualDay={actualDayView} onSelectDay={handleSetDay}></WeekDay>

                  
                    {fullEntryState.finishedEx && fullEntryState?.finishedEx.map((ex, index) => (
                      <HomeExCapsule completed={true} key={index}  exercise={ex.exercise} onSendEx={handleAddToEntry}/>
                    )) } 

                                  
                {planning.exercises
                  ?.filter(ex => 
                    ex.day === actualDayView && 
                    (!fullEntryState || !fullEntryState.finishedEx.some(fEx => fEx.exercise._id === ex._id))
                  )
                  .map((ex, index) => (
                    <HomeExCapsule key={index} exercise={ex} onSendEx={handleAddToEntry}/>
                  ))
                }
                  
                  
                  
                </div>
        </div>
    )
}

export default Home;




