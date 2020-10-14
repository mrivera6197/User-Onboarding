import React, { useState } from 'react'
import Input from './Input'

export default function Form (props) {

    const defaultState = {
        name: '',
        email: '',
        password: '',
    }

    const [formState, setFormState] = useState(defaultState)

    const formSubmit = evt => {
        evt.preventDefault()
        console.log('form submitted!')
    }

    const inputChange = evt => {
        console.log('input changed!', evt.target.value)
        setFormState({
            ...formState, [evt.target.name]: evt.target.value
        })
    }

    return (
        <form onSubmit={formSubmit}>
            <Input 
                type='text' 
                name='name' 
                onChange={inputChange} 
                value={formState.name}
                label={'Name'}
            />
            <Input 
                type='email' 
                name='email' 
                onChange={inputChange} 
                value={formState.email}
                label={'Email'}
            />
            <button>Submit</button>
        </form>
    )
}