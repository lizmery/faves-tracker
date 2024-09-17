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

const customTheme = {
    toggle: {
        base: 'inline-flex items-center rounded-lg p-2 text-sm text-gray-500 focus:outline-none dark:text-grayLine md:hidden dark:hover:text-lightGray hover:text-black'
    },
}

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
    <Navbar className='dark:bg-transparent bg-transparent border-b dark:border-darkGray backdrop-blur-3xl sticky top-0 z-[100] w-full py-4' theme={customTheme}>
        <Navbar.Brand href='/' className=' text-2xl  font-semibold'>
            Faves Tracker
        </Navbar.Brand>
        <div className='flex md:order-2 gap-3'>
            <Button
                className='w-14 h-14 inline text-bgDark dark:text-white focus:ring-transparent hover:opacity-80'
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
                    <Link to='/sign-in' className='items-center flex'>
                        <Button className='bg-transparent dark:text-white text-black border-2 dark:border-lightGray border-black rounded-full'>Sign In</Button>
                     </Link>
                    <Link to='/sign-up' className='items-center flex'>
                        <Button className='dark:bg-white bg-black dark:text-black text-white rounded-full'>Sign Up</Button>
                    </Link>
                </>
               
            )}
            <Navbar.Toggle />
        </div>
        <Navbar.Collapse className='dark:text-[#B8B8B8]'>
            <Navbar.Link active={path === '/'} as={'div'} className='text-bgDark dark:text-lightGray border-none opacity-70 dark:hover:text-lightGray dark:hover:bg-darkGray hover:opacity-100'>
                <Link to='/'>Home</Link>
            </Navbar.Link>
            <Navbar.Link active={path === '/about'} as={'div'} className='text-bgDark dark:text-lightGray border-none opacity-70 dark:hover:text-lightGray hover:opacity-100 dark:hover:bg-darkGray'>
                <Link to='/about'>About</Link>
            </Navbar.Link>
            <Navbar.Link active={path === '/contact'} as={'div'} className='text-bgDark dark:text-lightGray border-none opacity-70 dark:hover:text-lightGray hover:opacity-100 dark:hover:bg-darkGray'>
                <Link to='/contact'>Contact</Link>
            </Navbar.Link>
           
        </Navbar.Collapse>
    </Navbar>
  )
}