import { useState } from 'react'
import { 
  Alert,
  Button,
  Label,
  Spinner,
  TextInput
} from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'
import signupSvg from '../assets/3.svg'

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
            <div className="flex p-3 max-w-5xl mx-auto flex-col-reverse md:flex-row md:items-center gap-6">
                {/* left column */}
                <div className="flex-1 lg:pr-2">
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
                                'Sign Up'
                            )}
                        </Button>
                    </form>
                    <div className="flex gap-2 text-sm mt-5">
                        <span>Have an account?</span>
                        <Link to='/sign-in' className='text-primary'>Sign In</Link>
                    </div>

                    {errorMessage && (
                        <Alert className='mt-5' color='failure'>{errorMessage}</Alert>
                    )}
                </div>

                {/* right column */}
                <div className="flex-1 md:border-l flex justify-center lg:pl-2">
                    <img 
                        src={signupSvg}
                        className='w-2/3 lg:w-auto lg:pl-5'
                    />
                </div>
            </div>
        </div>
    )
}