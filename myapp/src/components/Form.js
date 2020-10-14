import React, { useState, useEffect } from 'react'
import Input from './Input'
import * as yup from 'yup'
import axios from 'axios'

export default function Form () {

    const defaultState = {
        name: '',
        email: '',
        password: '',
    }

    const [formState, setFormState] = useState(defaultState)
    const [errors, setErrors] = useState({...defaultState, terms: ''})
    const [disable, setDisabled] = useState(true)

    //formState schema 
    let formSchema = yup.object().shape({
        name: yup.string().required('please provide name'),
        email: yup.string().required('please provide an email').email('this is not a valid email'),
        password: yup.string().required('please provide a password'),
        terms: yup.boolean().required('please agree to terms of service').oneOf([],'pleas agree to the terms and conditions')
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
        axios.post('https://reqres.in/api/users', formState)
        .then(() => console.log('sucess'))
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
            <button>Submit</button>
        </form>
    )
}