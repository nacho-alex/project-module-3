  import React, { useState } from 'react';
  import Logo from '../../assets/fittracker.svg';
  import './login.css';
  import { Link } from 'react-router-dom';
  import { useContext } from 'react';
  import AuthContext from '../../contexts/auth.context';
  import { useNavigate } from 'react-router-dom';
  import { useAlert } from '../../contexts/alert.context';
  import { useEffect } from 'react';
  import SpeechError from '../../components/UI/speechError';


  import img1 from '../../assets/imgSU1.jpg'
  import img2 from '../../assets/imgSU2.jpg'
  import img3 from '../../assets/imgSU3.jpg'
  import img4 from '../../assets/imgSU4.jpg'
  import img5 from '../../assets/imgSU5.jpg'
  import img6 from '../../assets/imgSU6.jpg'
  import img7 from '../../assets/imgSU7.jpg'



  const imagesArr = [img1, img2, img3, img4, img5, img6, img7]

  function Login() {

    const [ formData, setFormData ] = useState({username:"", password: ""});
    const { doLogin } = useContext(AuthContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
    const handleChange = (event) => {
      const { name, value } = event.currentTarget; 
      setFormData({...formData, [name]: value});
    }

    async function handleSubmit(event) {
      
      event.preventDefault();
      try {
        await doLogin(formData)
        navigate("/");
      } catch (err) {
        setErrors({unauthorized: 'Invalid credentials'});
      }
    }

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagesArr.length);
      }, 5000);

      return () => clearInterval(interval);
    }, []);

    return (
      <div className='login-page'>

      {Object.keys(errors).length > 0 ? <SpeechError errors={errors} direction='up' y='3' x='50'/> : null}

        <div className='login-container '>
          <div>
              <img className='logo' src={Logo}></img>
          </div>
          <h2>Log in</h2>
          <form className='' onSubmit={handleSubmit}>                  
                      <div className="input-group">                      
                              <i className="fa-solid fa-user"></i>
                              <input onChange={handleChange} id='usernameinp' name='username' required type="text" value={formData.username} placeholder='Choose an username...'/>
                      </div>
                      <div className="input-group">
                              <i className="fa-solid fa-lock"></i>                                                 
                              <input onChange={handleChange} id='passwordinp' name='password' required  minLength="8" maxLength="20" type="password" value={formData.password} placeholder='Choose a secure password '/>                                               
                      </div>
              <button className='btn-green login-btn' type='submit'>Log in</button>
              <p>Don´t have an account?</p>
              <button className='btn-green journey-btn'><Link to={'/register'}>Start journey!</Link></button>
          </form>
        </div>
        <div className="login-img-container">
          <div className="login-img-text">
          <h1>Follow up your routine </h1>
          <h2>Access to a wealth of workouts, exercises, recipes, and foods.</h2>
          <p>monitor your daily calorie expenditure and intake and see your progress with our graphing system. </p>
          </div>
          <div className="login-img-wrapper" style={{ transform: `translateX(-${currentImageIndex * 100}%)`, height:'100%', width: '100%' }}>
          {imagesArr.map((image, index) => (
            <img key={index} src={image} alt={`Image ${index}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ))}
        </div>
        <div className="login-img-wrapper" style={{ transform: `translateX(-${currentImageIndex * 100}%)`, height:'100%' }}>
            {imagesArr.map((image, index) => (
              <img key={index} src={image} alt={`Image ${index}`} />
            ))}
          </div>
        </div>
      </div>
    )
  }

  export default Login