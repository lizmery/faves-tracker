import { Alert, Button, Label, Spinner, TextInput } from 'flowbite-react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from '../redux/user/userSlice'
import signupSvg from '../assets/4.svg'
import OAuth from '../components/OAuth'

export default function SignIn() {
    const [formData, setFormData] = useState({})
    const { loading, error: errorMessage } = useSelector((state) => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.email || !formData.password) {
            return dispatch(signInFailure('All fields are required'))
        }

        try {
            dispatch(signInStart())

            const res = await fetch('/api/auth/signin', {
                method: POST,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            const data = await res.json()
            if (data.success === false) {
                dispatch(signInFailure(data.message))
            }

            if (res.ok) {
                dispatch(signInSuccess(data))
                navigate('/') //TODO: navigate to dashboard instead
            }
        } catch (error) {
            dispatch(signInFailure(error.message))
        }
    }

    return (
        <div className='min-h-screen mt-20'>
            <div className='flex p-3 max-w-5xl mx-auto flex-col md:flex-row md:items-center gap-6'>
                 {/* left column */}
                 <div className="flex-1 md:border-r flex justify-center lg:pr-2">
                    <img 
                        src={signupSvg}
                        className='w-2/3 lg:w-auto lg:pr-5'
                    />
                </div>

                {/* right column */}
                <div className="flex-1">
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div>
                            <Label value='Email' />
                            <TextInput 
                                type='email'
                                placeholder='name@email.com'
                                id='email'
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <Label value='Password' />
                            <TextInput 
                                type='password'
                                placeholder='******'
                                id='password'
                                onChange={handleChange}
                            />
                        </div>
                        <Button type='submit' disabled={loading} className='bg-accent text-black'>
                            {loading ? (
                                <>
                                    <Spinner size='sm' />
                                    <span className='pl-3'>Loading...</span>
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </Button>
                        <OAuth />
                    </form>
                    <div className="flex gap-2 text-sm mt-5">
                        <span>Don't have an account?</span>
                        <Link to='/sign-up' className='text-primary'>Sign Up</Link>
                    </div>

                    {errorMessage && (
                        <Alert className='mt-5' color='failure'>{errorMessage}</Alert>
                    )}
                </div>
            </div>
        </div>
    )
}