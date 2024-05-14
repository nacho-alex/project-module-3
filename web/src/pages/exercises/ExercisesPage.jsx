import SearchExercises from '../../components/Exercises/Search/SearchExercises'
import React from 'react'
import './ExercisesPage.css'
import img1 from '../../assets/imgSU1.jpg'
import img2 from '../../assets/imgSU2.jpg'
import img3 from '../../assets/imgSU3.jpg'
import img4 from '../../assets/imgSU4.jpg'
import img7 from '../../assets/imgSU7.jpg'
import { useState, useEffect } from 'react'

function ExercisesPage() {

  const imgArr = [img1, img2, img3, img4, img7];
  const [randomNum, setRandom] = useState(0);

  useEffect(() => {
      setRandom(Math.floor(Math.random() * 5));
  }, []);

  return (

    

    <div className="exercises-page">

      
      <div className="jumbo">
            <div className="h1-div">
                <h1 className='page-title'>Search Exercises</h1>
            </div>
        </div>

    <img className='infinite-bg' src={imgArr[randomNum]} alt="Background" />

                
            <div className='plane-box'>
                <SearchExercises></SearchExercises>
            </div>
    </div>
    
  )
}

export default ExercisesPage