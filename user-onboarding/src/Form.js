import React from 'react'

export default function UserForm(props){
    const {
        values,
        submit,
        change,
        disabled,
        errors,
      } = props

    const onSubmit = evt =>{
        evt.preventDefault()
        submit()
    }

    const onChange = evt =>{
        const { name, value, type, checked } = evt.target
        const valueToUse = type === 'checkbox' ? checked : value
        change(name, valueToUse)
    }

    return (
        <form className='form-container' onsubmit={onSubmit}>
            <div className='form-inputs'>
                <label>Username&nbsp;
                    <input
                        value={values.username}
                        onChang={onChange}
                        name='username'
                        type='text'
                    />
                </label>
                <label>Email
                    <input
                        value={values.email}
                        onChange={onChange}
                        name='email'
                        type='text'
                    />
                </label>
                <label>Password
                    <input
                        value={values.password}
                        onChange={onChange}
                        name='password'
                        type='text'
                    />
                </label>
                <label>Terms of Service
                    <input 
                        type='checkbox'
                        name='term'
                        onChange={onChange}
                        checked={values.term}
                    />
                </label>
            </div>
            <div className='form-submit'>
                <h2>New User</h2>
                <button disabled={disabled}>Register</button>
                <div className='errors'>
                    <div>{errors.username}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                    <div>{errors.term}</div>
                </div>
            </div>
        </form>
    )
    

}