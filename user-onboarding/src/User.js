import React from 'react'

export default function User({ details }){
    if (!details){
        return <h3>Fetching your details...</h3>
    }
    return (
        <div className='user-container'>
            <h2>{details.username}</h2>
            <p>Email:{details.email}</p>
            <p>Password:{details.password}</p>
            <p>Term of Service:{details.form}</p>
        </div>
    )
}

