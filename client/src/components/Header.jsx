import { useEffect, useState } from 'react'
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

export default function Header() {
    const path = useLocation().pathname
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { currentUser } = useSelector((state) => state.user)

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
    <Navbar className='border-b border-zinc-200'>
        <Navbar.Brand href='/' className='dark:text-accent text-xl text-primary font-semibold'>
            Faves Tracker
        </Navbar.Brand>
        <div className='flex md:order-2 gap-2'>
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
                        <Button className='text-darkPurple border-accent'>Sign In</Button>
                     </Link>
                    <Link to='/sign-up'>
                        <Button className='text-darkPurple bg-accent'>Sign Up</Button>
                    </Link>
                </>
               
            )}
            <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
            <Navbar.Link active={path === '/'} as={'div'}>
                <Link to='/'>Home</Link>
            </Navbar.Link>
            <Navbar.Link active={path === '/about'} as={'div'}>
                <Link to='/about'>About</Link>
            </Navbar.Link>
            <Navbar.Link active={path === '/contact'} as={'div'}>
                <Link to='/contact'>Contact</Link>
            </Navbar.Link>
            <Navbar.Link as={'div'}>
                <Link to='/sign-in' className='lg:hidden'>Sign In</Link>
            </Navbar.Link>
        </Navbar.Collapse>
    </Navbar>
  )
}