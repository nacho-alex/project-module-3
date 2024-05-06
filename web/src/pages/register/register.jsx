import React from 'react'
import { useState } from 'react'
import axios from 'axios'


const initialState = {
    username:'',
    name: '',
    email: '',
    avatar: '',
    password: '',

    birthDate: '',
    weight:'',
    height: '',
    genre: '',
    activityLevel: '',

    goal: '',
}

function register() {
const [pageState, setPage] = useState(1)
const [formData, setFormData] = useState(initialState)


const handlePage = () => {
    setPage( pageState + 1)
}

const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formData)
    axios.post("http://localhost:3000/api/v1/users", formData)
    
}

const handleChange = (event) => {
    const{name, value} = event.currentTarget
    setFormData({...formData, 
    [name]: value
    })

}

  return (
    <>
        <form onSubmit={handleSubmit} >
            {pageState === 1 && (
            <>
                <p>info 1</p>
                <input onChange={handleChange} name='avatar' type="text" value={formData.avatar} placeholder='Avatar'/>
                <input onChange={handleChange} name='username' required type="text" value={formData.username} placeholder='Username'/>
                <input onChange={handleChange} name='name' maxLength="20" type="text" value={formData.name} placeholder='Name'/>
                <input onChange={handleChange} name='email' type="email" value={formData.email} placeholder='E-mail'/>
                <input onChange={handleChange} name='password' required  minLength="8" maxLength="20" type="password" value={formData.password} placeholder='password'/>
                <button onClick={handlePage} >hola</button>
            </>
                
            )}
            {pageState === 2 && (
            <>
                <p>info 2</p>
                    <input onChange={handleChange} name='birthDate' type="date" value={formData.birthDate} placeholder='birth date'/>
                    <input onChange={handleChange} name='weight' type="number" value={formData.weight} placeholder='weight'/>
                    <input onChange={handleChange} name='height' type="number" value={formData.height} placeholder='height'/>
                    <select onChange={handleChange} name='genre'>
                        <option value='' >select genre</option>
                        <option value='male' >male</option>
                        <option value='female' >female</option>
                    </select>
                    <select onChange={handleChange} name='activityLevel'>
                        <option value='' >select activityLevel</option>
                        <option value='1.2' >sedentary</option>
                        <option value='1.375' >sightly active</option>
                        <option value='1.55' >active</option>
                        <option value='1.725' >very active</option>
                        <option value='1.9' >A FCKING MACHINE</option>
                    </select>
                    <button onClick={handlePage} >hola</button>
            </>
            )}
            {pageState === 3 && (
            <>
                <p>info 3</p>
                <select onChange={handleChange} name='goal'>
                        <option value='' >select goal</option>
                        <option value='gain' >gain</option>
                        <option value='lose' >lose</option>
                    </select>
                    <button type='submit'>holas</button>
            </>
            )}
        </form>
  </>
  )
}

export default register