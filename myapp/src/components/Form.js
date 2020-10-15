import React, { useState, useEffect } from 'react'
import Input from './Input'
import * as yup from 'yup'
import axios from 'axios'
import User from './User'

export default function Form () {

    const defaultState = {
        name: '',
        email: '',
        password: '',
    }

    const defaultUsers = [
        {id: 1, name: 'Mali', email: 'mrivera6197@gmail.com', password: '******'}
    ]

    const [users, setUsers] = useState(defaultUsers)
    const [formState, setFormState] = useState(defaultState)
    const [errors, setErrors] = useState({...defaultState, terms: ''})
    const [disabled, setDisabled] = useState(true)

    //formState schema 
    let formSchema = yup.object().shape({
        name: yup.string().required('please provide name'),
        email: yup.string().required('please provide an email').email('this is not a valid email'),
        password: yup.string().required('please provide a password').min(6, 'Passwords must be at least 6 characters long'),
        terms: yup.boolean().required('please agree to terms of service').oneOf([true],'please agree to the terms and conditions')
    })

    useEffect(() => {
        formSchema.isValid(formState)
        .then(valid => setDisabled(!valid))
    }, [formState, formSchema])


    const validateChange = evt => {
        evt.persist()
        yup.reach(formSchema, evt.target.name)
        .validate(evt.target.value)
        .then(valid => setErrors({
            ...errors, 
            [evt.target.name]: ''
        })
        )
        .catch(err => setErrors({
            ...errors,
            [evt.target.name]: err.errors[0]
        }))
    }

    const formSubmit = evt => {
        evt.preventDefault()
        console.log('form submitted!')
        const newUser  ={
            name: formState.name.trim(),
            email: formState.email.trim(),
            password: formState.password.trim(),
        }
        axios.post('https://reqres.in/api/users', newUser)
        .then((res) => {
            console.log('sucess')
            setUsers([...users, res.data])
            setFormState(defaultState)
        })
        .catch(err => console.log('FAIL'))
    }

    const inputChange = evt => {
        const value = evt.target.type === 'checkbox' ? evt.target.checked : evt.target.value
        setFormState({
            ...formState, [evt.target.name]: value
        })
        validateChange(evt)
    }

    return (
        <form className='form' onSubmit={formSubmit}>
            <Input className='input'
                type='text' 
                name='name' 
                onChange={inputChange} 
                value={formState.name}
                label={'Name'}
                errors={errors}
            />
            <Input className='input'
                type='email' 
                name='email' 
                onChange={inputChange} 
                value={formState.email} className='value'
                label={'Email'}
                errors={errors}
            />
            <Input className='input'
                type='text' 
                name='password' 
                onChange={inputChange} 
                value={formState.password}
                label={'Password'}
                errors={errors}
            />
            <label className='terms' htmlFor='terms'>
            <input name='terms' type='checkbox' onChange={inputChange}/>
                Terms and Conditions
            </label>
            <button disabled={disabled}>Submit</button>
            <div className='user-container'>
                <h2>Current Users</h2>
                <div className='users'>
                    {
                        users.map(user => {
                            return (
                                <User key={user.id} info={user} />
                            )
                        })
                    }
                </div>
            </div>
        </form>
    )
}