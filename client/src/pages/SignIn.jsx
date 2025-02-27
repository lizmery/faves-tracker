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
    const apiUrl = import.meta.env.VITE_API_URL

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

            const res = await fetch(`${apiUrl}/api/auth/signin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            const data = await res.json()
            if (data.success === false) {
                dispatch(signInFailure(data.message))
            }

            if (res.ok) {
                dispatch(signInSuccess(data))
                navigate('/dashboard?tab=overview') 
            }
        } catch (error) {
            dispatch(signInFailure(error.message))
        }
    }

    return (
        <div className='min-h-screen mt-20'>
            <div className='flex p-3 max-w-5xl mx-auto flex-col lg:flex-row lg:items-center gap-6'>
                 {/* left column */}
                 <div className="flex-1 lg:border-r flex justify-center lg:pr-2 dark:border-darkGray">
                    <img 
                        src={signupSvg}
                        className='w-2/3 md:w-1/2 lg:w-auto lg:pr-5'
                    />
                </div>

                {/* right column */}
                <div className="flex-1">
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        <div>
                            <label for="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-[#eee]">Email</label>
                            <div className="mt-2">
                                <input 
                                    id="email" 
                                    name="email" 
                                    type="email" 
                                   
                                    required 
                                    onChange={handleChange}
                                    className="dark:bg-transparent block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-400  ring-1 ring-inset ring-lightGray dark:ring-grayLine placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-primary dark:focus:ring-primary sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <div>
                            <label for="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-[#eee]">Password</label>
                            <div className="mt-2">
                                <input 
                                    id="password" 
                                    name="password" 
                                    type="password" 
                                    
                                    required 
                                    onChange={handleChange}
                                    className="dark:bg-transparent block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-400 ring-1 ring-inset ring-lightGray dark:ring-grayLine placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-primary dark:focus:ring-primary sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        <Button type='submit' disabled={loading} className='dark:bg-white dark:text-black bg-black text-white mt-5'>
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
                        <Link to='/sign-up' className='text-darkPurple font-bold'>Sign Up</Link>
                    </div>

                    {errorMessage && (
                        <Alert className='mt-5' color='failure'>{errorMessage}</Alert>
                    )}
                </div>
            </div>
        </div>
    )
}