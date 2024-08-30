import { useState } from 'react'
import { 
  Alert,
  Button,
  Label,
  Spinner,
  TextInput
} from 'flowbite-react'
import { Link, useNavigate } from 'react-router-dom'

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
            <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
                {/* left column */}
                <div className="flex-1">
                    <Link to='/' className=''>
                        test
                    </Link>
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
            </div>
        </div>
    )
}