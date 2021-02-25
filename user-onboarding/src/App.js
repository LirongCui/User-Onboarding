import './App.css';
import React, { useState, useEffect } from 'react'
import UserForm from './Form'
import axios from 'axios'
import * as yup from 'yup'
import formSchema from './validation/formSchema'


const initialFormValues = {
  username:'',
  email:'',
  password:'',
  term: false
}

const initialFormErrors = {
  username: '',
  email: '',
  password: '',
  term: false
}

const initialUser = []
const initialDisabled = true

function App() {
  const [users, setUsers] = useState([initialUser])
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [disabled, setDisabled] = useState(initialDisabled)

  const getUsers = () => {
    axios.get('https://reqres.in/api/users')
      .then(res =>{
        setUsers(res.data)
      })
  }

  const postNewUser = newUser =>{
    axios.post('https://reqres.in/api/users', newUser)
      .then(res => {
        setUsers([res.data, ...users])
      })
      .catch(err => {
        console.log(err)
      })
      setFormValues(initialFormValues)
  }

  const inputChange = (name, value) => {
    yup.reach(formSchema, name)
      .validate(value)
      .then(() => {
        setFormErrors({...formErrors, [name]: ''})
      })
      .catch(err => {
        setFormErrors({...formErrors, [name]: err.errors[0]})
      })
    setFormValues({
      ...formValues,
      [name]: value 
    })
  }

  const formSubmit = () => {
    const newUser = {
      username: formValues.username.trim(),
      email: formValues.email.trim(),
      password: formValues.password.trim(),
      term: 'accept'.filter(term => formValues[term])
    }
    postNewUser(newUser)
  }

  useEffect(() =>{
    getUsers()
  }, [])

  useEffect(() => {
    formSchema.isValid(formValues).then(valid => setDisabled(!valid))
  }, [formValues])
  

  return (
    <div className="App">
      <header><h1>Lambda Student List</h1></header>

      <UserForm
        values={formValues}
        change={inputChange}
        submit={formSubmit}
        disabled={disabled}
        errors={formErrors}
      />
    </div>
  )
}

export default App;
