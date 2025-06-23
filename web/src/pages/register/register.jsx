import React from 'react'
import { useState, useContext } from 'react'
import { createUser } from '../../services/api.service';
import './register.css'
import { Link, Navigate } from 'react-router-dom';
import exampleImg from '../../assets/3e79edd8850e4f1d73052f548f2f399d.jpg'
import gainIMG from '../../assets/gain.png'
import loseIMG from '../../assets/loseDES.png'
import { useNavigate } from 'react-router-dom';
import SpeechError from '../../components/UI/speechError';
import AuthContext from '../../contexts/auth.context';
import DemoInfo from '../../components/demo/demoinfo';



const initialState = {
    username:'invitado',
    name: 'invitado',
    email: 'invitado@imail.com',
    avatar: '',
    password: '1234567890',

    birthDate: '2000-05-21',
    weight:'75',
    height: '180',
    genre: 'male',
    activityLevel: '1.55',

    goal: 'gain',
    avtScale: '',
}

function register() {
const [pageState, setPage] = useState(1)
const [formData, setFormData] = useState(initialState);
 const [ logData, setlogData ] = useState({username:"invitado", password: "1234567890"});
 const { doLogin } = useContext(AuthContext);
const [avatarOpen, setAvatarOpen] = useState(false);
const [scale, setScale] = useState(1);
const [errors, setErrors] = useState(null);
const navigate = useNavigate();

const handlePageNext = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (pageState === 1) {
        if (!formData.name) newErrors.name = "Name is required" ;
        if (!formData.username) newErrors.username = "Username is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (formData.password.length < 8) newErrors.password = "The password must contain at least 8 characters";
        if (Object.keys(newErrors).length === 0) {
            setErrors(null);
            setPage(2);
        } else {
            setErrors(newErrors);
        }
    }
        if (pageState === 2) {
        if (!formData.birthDate) newErrors.birthDate = "Birth date is required";
        if (!formData.weight) newErrors.weight = "Weight is required";
        if (!formData.height) newErrors.height = "Height is required";
        if (!formData.genre) newErrors.genre = "Genre is required";            
        if (!formData.activityLevel) newErrors.activityLevel = "ActivityLevel is required";
    
        if (Object.keys(newErrors).length === 0) {
            setErrors(null)
            setPage(3);
        } else {
            setErrors(newErrors);
        }
    }
};

const handlePageBack = (e) => {
    e.preventDefault();
    setPage(pageState - 1);
    setErrors(null);

    if (formData.avatar === undefined) setFormData({...formData, avatar: ''}) 
};

async function handleSubmit(event) {
      
    event.preventDefault();
    try {
      await doLogin(formData)
      navigate("/");
    } catch (err) {
      setErrors({unauthorized: 'Invalid credentials'});
    }
  }



const handleChange = (event) => {
    const{name, value} = event.currentTarget
    setFormData({...formData, 
    [name]: value
    })
}

const handleScale = (event) => {
    setScale(event.target.value);
    setFormData({ ...formData, avtScale: event.target.value});
  };

const handleAvatarClick = (e) => {
    e.preventDefault();
    setAvatarOpen(!avatarOpen);
}

const handleGenreSelect = (genre) => {
    setFormData({ ...formData, genre });
};

const handleActivitySelect = (activityLevel) => {
    setFormData({ ...formData, activityLevel });
};

const handleGoalSelect = (goal) => {
    setFormData({ ...formData, goal });
};

const imagesArr = ["login-image-container1", "login-image-container2", "login-image-container3"]
let imageIndex = 0
  return (
    <>
     
    <div className="register-page">
        {errors ? <SpeechError errors={errors} direction='right' y='40' x='40'/> : null }
        <div className={"login-image-container1"}>
            {pageState >= 2 && ( 
            <div className="login-image-container2">
                {pageState === 3 && ( 
                <div className="login-image-container3"></div>)}
            </div>)}
        </div>
        <form onSubmit={handleSubmit} >
             <div className="register-container">
                <div className={'register-box' + (pageState === 1 ? ' slide-in-right' : '')}>
                {pageState === 1 && (
                <>
                        <div className="speech speech-up black-speach" role="alert">
                            <p>No necesitas rellenar ningún campo para esta demo, Se generarán datos automáticos para las gráficas y las entradas de calendario </p>
                        </div>
                    <h1 className="register-h1">Sign up</h1>
                    <p className='register-p'>The registration form has three simple steps, let's start with your account information.</p>
                    <label className="activitylabel"> Avatar: </label>
                    <div className="avatar-preview">
                        <div  onClick={handleAvatarClick}  className="avatar-preview-overlay"><i className="fa-solid fa-plus"></i></div>
                        <img src={(formData.avatar ? formData.avatar : exampleImg)} style={{ transform: `scale(${scale})`, width: '100px', height: 'auto' }} alt="" />
                    </div>

                    <div className="range-input">
                        <i className="fa-solid fa-magnifying-glass-minus"></i>
                        <input type="range" min="1" max="2" step="0.1" name='avtScale' value={scale} onChange={handleScale}/>
                        <i className="fa-solid fa-magnifying-glass-plus"></i>
                    </div>

                    <div className="input-group">
                            <input className={"avatarinput" + (avatarOpen ? " openinp" : "")} id='avatarinp' onChange={handleChange} name='avatar' type="text" value={formData.avatar} placeholder='Introduce an URL image...'/>
                    </div>
                    <div className="input-group">
                            <i className="inp-icon fa-solid fa-user"></i>
                            <label htmlFor="usernameinp"> Username: </label>
                            <input onChange={handleChange} id='usernameinp' name='username' required type="text" disabled value='invitado' placeholder='Choose an username...'/>
                    </div>
                    <div className="input-group">
                            <i className="inp-icon fa-regular fa-face-smile"></i>
                            <label htmlFor="nameinp"> Name: </label>             
                            <input onChange={handleChange} id='nameinp' name='name' maxLength="20" type="text" disabled value='invitado' placeholder='Your real name...'/>                                               
                    </div>
                    <div className="input-group">
                            <i className="inp-icon fa-solid fa-envelope"></i>
                            <label htmlFor="emailinp"> E-mail: </label> 
                            <input onChange={handleChange} id='emailinp' name='email' type="email" disabled value='invitado@mail.com' placeholder='E-mail address...'/>                       
                    </div>
                    <div className="input-group">
                            <i className="inp-icon fa-solid fa-lock"></i>
                            <label htmlFor="passwordinp"> Password: </label>                                                   
                            <input onChange={handleChange} id='passwordinp' name='password' required  minLength="8" maxLength="20" type="password" value='1234567890' placeholder='Choose a secure password '/>                                               
                    </div>
                    <Link to={'/login'}><button type='button' className='register-btn-cancel' >Cancel</button></Link>
                    <button className='register-btn' onClick={handlePageNext} >Next</button>
                </>
                    
                )}
                {pageState === 2 && (
                <>
                <div className={"pag2"}>
                    <h1 className="register-h1">Sign up</h1>
                        <p className='register-p'>Now let's take a look at some more personal data to help us calculate your caloric intake.</p>
                        <label className='genrelabel' htmlFor="genreinp"> Choose genre </label>
                        <div className="genre-buttons">
                                
                                <button type='button'
                                    className={`genre-button ${formData.genre === 'male' ? 'selected-btn' : ''}`}
                                    onClick={() => handleGenreSelect('male')}
                                >
                                    <i className="fa-solid fa-mars"></i>
                                </button>
                                <button type='button'
                                    className={`genre-button ${formData.genre === 'female' ? 'selected-btn' : ''}`}
                                    onClick={() => handleGenreSelect('female')}
                                >
                                    <i className="fa-solid fa-venus"></i>
                                </button>
                        </div>
                        
                        <div className="input-group">
                                <i className="inp-icon fa-solid fa-cake-candles"></i>
                                <label htmlFor="birthdateinp"> Birth date: </label>
                                <input id='birthdateinp' onChange={handleChange} name='birthDate' type="date" value="2000-05-21" placeholder='birth date'/>
                        </div>

                        <div className="input-group">
                                <i className="inp-icon fa-solid fa-weight-scale"></i>
                                <label htmlFor="weightinp"> Weight: </label>
                                <input id='weightinp' onChange={handleChange} name='weight' type="number" min={0} value="75" placeholder='weight (kg)'/>
                        </div>

                        <div className="input-group">
                                <i className="inp-icon fa-solid fa-ruler-vertical"></i>
                                <label htmlFor="heightinp"> Height: </label>
                                <input id='heightinp' onChange={handleChange} name='height' type="number" min={0} value="180" placeholder='height (cm)'/>
                        </div>

                        <label className='activitylabel' htmlFor="genreinp"> Choose your daily activity level </label>
                            <div className="activity-buttons">
                                <button type='button'
                                    className={`activity-button ${formData.activityLevel === '1.2' ? 'selected-btn-ac' : ''}`}
                                    onClick={() => handleActivitySelect('1.2')}>
                                    Sedentary
                                </button>
                                <button type='button'
                                    className={`activity-button ${formData.activityLevel === '1.375' ? 'selected-btn-ac' : ''}`}
                                    onClick={() => handleActivitySelect('1.375')}>
                                    slightly active
                                </button>
                                <button type='button'
                                    className={`activity-button ${formData.activityLevel === '1.55' ? 'selected-btn-ac' : ''}`}
                                    onClick={() => handleActivitySelect('1.55')}>
                                    Moderate
                                </button>
                                <button type='button'
                                    className={`activity-button ${formData.activityLevel === '1.725' ? 'selected-btn-ac' : ''}`}
                                    onClick={() => handleActivitySelect('1.725')}>
                                    High
                                </button>
                                <button type='button'
                                    className={`activity-button ${formData.activityLevel === '1.9' ? 'selected-btn-ac' : ''}`}
                                    onClick={() => handleActivitySelect('1.9')}>
                                    Very high
                                </button>
                            </div>
                </div>
                    <button type='button' className='register-btn-cancel' onClick={handlePageBack} >Back</button>
                    <button className='register-btn' onClick={handlePageNext} >Next</button>
                </>
                )}
                {pageState === 3 && (
                    <>
                    <div className="pag3">
                        <h1 className="register-h1">Your goal</h1>
                        <p className='goallabel'>Finally, tell us what is your goal</p>

                        <div className="goal-buttons">
                            <div>
                                <button type='button'
                                    className={`goal-button ${formData.goal === 'gain' ? 'selected-btn-goal' : ''}`}
                                    onClick={() => handleGoalSelect('gain')}>
                                    <img src={gainIMG} alt="" />
                                </button>
                                <h2 className={`${formData.goal === 'gain' ? 'selected-btn-goal-text' : ''}`} >Gain muscle</h2>
                            </div> 
                            <div>
                                <button type='button'
                                    className={`goal-button ${formData.goal === 'lose' ? 'selected-btn-goal' : ''}`}
                                    onClick={() => handleGoalSelect('lose')} >
                                    <img src={loseIMG} alt="" />
                                </button>
                                <h2 className={`${formData.goal === 'lose' ? 'selected-btn-goal-text' : ''}`} >Lose weight</h2>
                            </div>
                        </div>                       
                    </div>
                    <button type='button' className='register-btn-cancel' onClick={handlePageBack} >Back</button>
                    <button className='register-btn' onClick={handleSubmit}> Go to home </button>                  
                    </>
                )}

                </div>
            </div>
        </form>
        
    </div>
       
  </>
  )
}

export default register