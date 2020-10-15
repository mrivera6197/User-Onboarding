import React from 'react'

export default function User (props) {
    const { info } = props
    return (
        <div>
            <p>Name: {info.name}</p>
            <p>Email: {info.email}</p>
        </div>
    )
}