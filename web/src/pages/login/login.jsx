import React from 'react'
import Logo from '../../assets/green-heart-emoji-2048x1835-ime8vvj2.png'
import './login.css'
import { Link } from 'react-router-dom'

function login() {



  return (
    <div className='container'>
        <div>
            <img className='logo' src={Logo}></img>
        </div>
        <h2>Sign in</h2>
        <form className='d-flex flex-column'>
            <input type='text' placeholder='Username' name='username'></input>
            <input type='password' placeholder='Password' name='password'></input>
            <button type='submit'>Log in</button>
        </form>


        <div>
            <p>No se tio lo que sea</p>
            <Link to={'/register'}><button>Sign up</button></Link>
        </div>

    </div>

 
  )
}

export default login