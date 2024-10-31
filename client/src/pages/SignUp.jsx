import { useState } from 'react'
import { 
  Alert,
  Button,
  Label,
  Spinner,
  TextInput
} from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'
import signupSvg from '../assets/7.svg'
import OAuth from '../components/OAuth'

export default function SignUp() {
    const [formData, setFormData] = useState({})
    const [errorMessage, setErrorMessage] = useState(null)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value.trim() })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!formData.email || !formData.password) {
            return setErrorMessage('All fields are required')
        }

        try {
            setLoading(true)
            setErrorMessage(null)

            const res = await fetch('/api/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            })

            const data = await res.json()
            if (data.success === false) {
                return setErrorMessage(data.message)
            }

            setLoading(false)

            if (res.ok) {
                navigate('/sign-in')
            }
        } catch (error) {
            setErrorMessage(error.message)
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen mt-20">
            <div className="flex p-3 max-w-5xl mx-auto flex-col-reverse lg:flex-row lg:items-center gap-6">
                {/* left column */}
                <div className="flex-1 lg:pr-2">
                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                        {/* TODO: add name input */}
                        <div>
                            <label for="email" className="block text-sm font-medium leading-6 text-gray-900 dark:text-[#eee]">Email</label>
                            <div className="mt-2">
                                <input 
                                    id="email" 
                                    name="email" 
                                    type="email" 
                                    
                                    required 
                                    onChange={handleChange}
                                    className="dark:bg-transparent block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-400 ring-1 ring-inset ring-lightGray dark:ring-grayLine placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-primary dark:focus:ring-primary sm:text-sm sm:leading-6"
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
                                    className="dark:bg-transparent block w-full rounded-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-lightGray dark:ring-grayLine placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-primary dark:focus:ring-primary sm:text-sm sm:leading-6"
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
                                'Sign Up'
                            )}
                        </Button>
                        <OAuth />
                    </form>
                    <div className="flex gap-2 text-sm mt-5">
                        <span>Have an account?</span>
                        <Link to='/sign-in' className='text-primary flex items-center font-bold'>Sign In</Link>
                    </div>

                    {errorMessage && (
                        <Alert className='mt-5' color='failure'>{errorMessage}</Alert>
                    )}
                </div>

                {/* right column */}
                <div className="flex-1 lg:border-l dark:border-darkGray flex justify-center lg:pl-2">
                    <img 
                        src={signupSvg}
                        className='w-2/3 md:w-1/2 lg:w-auto lg:pl-5'
                    />
                </div>
            </div>
        </div>
    )
}