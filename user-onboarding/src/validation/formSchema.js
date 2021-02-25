import * as yup from 'yup'

const formSchema = yup.object().shape({
    username: yup.string()
        .trim()
        .required('Username is required, please fill out.')
        .min(3, 'Username must be at least 3 characters long'),
    email: yup.string()
        .email('Must be a valid email address')
        .required('Email is required'),
    password: yup.string()
        .trim()
        .required('Password is required, please fill out.')
        .min(8, 'Password must be at least 8 characters long'),
    term: yup.boolean()
        .oneOf([true], 'Term of Service is required.'),
})

export default formSchema