import {
    Avatar,
    Button,
    Dropdown,
    Navbar,
} from 'flowbite-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaMoon, FaSun } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { signOutSuccess } from '../redux/user/userSlice'
import { toggleTheme }from '../redux/theme/themeSlice'

export default function Header() {
    const path = useLocation().pathname
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { currentUser } = useSelector((state) => state.user)
    const { theme } = useSelector((state) => state.theme)

    const handleSignout = async () => {
        try {
            const res = await fetch('/api/user/signout', {
                method: 'POST',
            })

            const data = await res.json()
            if (!res.ok) {
                console.log(data.message)
            } else {
                dispatch(signOutSuccess())
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    
  return (
    <Navbar className='dark:bg-transparent bg-transparent border-b dark:border-[#292929] backdrop-blur-3xl sticky top-0 z-[100]'>
        <Navbar.Brand href='/' className='dark:text-primary text-2xl text-accent font-semibold'>
            Faves Tracker
        </Navbar.Brand>
        <div className='flex md:order-2 gap-2'>
            <Button
                className='w-14 h-14 inline text-bgDark dark:text-white'
                onClick={() => dispatch(toggleTheme())}
            >
                {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </Button>
            {currentUser ? (
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar alt='user' img={currentUser.profilePicture} rounded />
                    }
                >
                    <Dropdown.Header>
                        {/* <span className='block text-sm'>Hi {currentUser.name}</span> */}
                        <span className='block text-sm font-medium truncate'>
                            {currentUser.email}
                        </span>
                    </Dropdown.Header>
                    <Link to={'/dashboard?tab=profile'}>
                        <Dropdown.Item>Profile</Dropdown.Item>
                    </Link>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
                </Dropdown>
            ) : (
                <>
                    <Link to='/sign-in' className='items-center hidden lg:flex'>
                        <Button className='dark:text-secondary text-bgDarkTertiary font-bold'>Sign In</Button>
                     </Link>
                    <Link to='/sign-up' className='flex items-center'>
                        <Button className='text-bgDark bg-primary'>Sign Up</Button>
                    </Link>
                </>
               
            )}
            <Navbar.Toggle  className='text-bgDarkSecondary'/>
        </div>
        <Navbar.Collapse className='dark:text-[#B8B8B8]'>
            <Navbar.Link active={path === '/'} as={'div'} className='dark:text-[#B8B8B8] border-none'>
                <Link to='/'>Home</Link>
            </Navbar.Link>
            <Navbar.Link active={path === '/about'} as={'div'} className='dark:text-[#B8B8B8] border-none'>
                <Link to='/about'>About</Link>
            </Navbar.Link>
            <Navbar.Link active={path === '/contact'} as={'div'} className='dark:text-[#B8B8B8] pb-6 dark:border-[#292929]'>
                <Link to='/contact'>Contact</Link>
            </Navbar.Link>
            <Navbar.Link as={'div'} className='border-none font-bold'>
                <Link to='/sign-in' className='lg:hidden text-bgDarkTertiary dark:text-secondary font-bold'>Sign In</Link>
            </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
  )
}