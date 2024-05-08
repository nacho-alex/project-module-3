import React, { useState } from 'react';
import Logo from '../../assets/green-heart-emoji-2048x1835-ime8vvj2.png';
import './login.css';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { useContext } from 'react';
import AuthContext from '../../contexts/auth.context';
import { useNavigate } from 'react-router-dom';

function Login() {

  const [ formData, setFormData ] = useState({username:"", password: ""});
  const { doLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.currentTarget; 
    setFormData({...formData, [name]: value});
  }

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      await doLogin(formData)
      navigate("/");
    } catch {
    }
  }

  return (
    <div className='container'>
        <div>
            <img className='logo' src={Logo}></img>
        </div>
        <h2>Sign in</h2>
        <form className='d-flex flex-column' onSubmit={handleSubmit}>
            <input type='text' placeholder='Username' name='username' value={formData.username} onChange={handleChange} autoComplete="username"></input>
            <input type='password' placeholder='Password' name='password' value={formData.password} onChange={handleChange} autoComplete="current-password"></input>
            <button type='submit'>Log in</button>
        </form>


        <div>
            <p>No se tio lo que sea</p>
            <Link to={'/register'}><button>Sign up</button></Link>
        </div>

    </div>

 
  )
}

export default Login