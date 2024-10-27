import {
    Avatar,
    Button,
    Dropdown,
    Navbar,
    Drawer,
    TextInput
} from 'flowbite-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaMoon, FaSun, FaSearch } from 'react-icons/fa'
import { IoIosSearch } from 'react-icons/io'
import { useSelector, useDispatch } from 'react-redux'
import { signOutSuccess } from '../redux/user/userSlice'
import { toggleTheme }from '../redux/theme/themeSlice'
import { useEffect, useState } from 'react'
import DashSidebar from './dashboard/DashSidebar'

const customTheme = {
    toggle: {
        base: 'inline-flex items-center rounded-lg p-2 text-sm text-black focus:outline-none dark:text-lightGray md:hidden dark:hover:text-grayLine hover:text-grayLine'
    },
    root: {
        base: 'py-2.5',
        inner: {
            base: 'flex flex-wrap items-center justify-between px-4 lg:px-6'
        }
    }
}

const dashboardNavTheme = {
    toggle: {
        base: 'lg:p-3 p-2 inline-flex items-center text-sm text-black focus:outline-none dark:text-lightGray dark:hover:text-grayLine hover:text-grayLine'
    },
    root: {
        base: 'py-2.5',
        inner: {
            base: 'flex items-center justify-between px-2 lg:px-6'
        }
    }
}

const dropdownTheme = {
    floating: {
        divider: 'my-1 h-px bg-gray-100 dark:bg-grayLine',
        item: {
            base: 'flex w-full cursor-pointer items-center justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none dark:text-gray-200 dark:hover:bg-grayLine dark:hover:text-white dark:focus:bg-grayLine dark:focus:text-white',
        },
        style: {
            auto: 'border border-gray-200 bg-white text-gray-900 dark:border-none dark:bg-darkGray dark:text-white'
        }
    }
}

const drawerTheme = {
    root: {
        base: 'fixed z-40 overflow-y-auto bg-white py-1 px-4 transition-transform',
        position: {
            left: {
                on: 'left-0 top-0 h-screen lg:w-80 w-full transform-none',
                off: 'left-0 top-0 h-screen lg:w-80 w-full -translate-x-full',
            }
        }
    }
}

const inputTheme = {
    field: {
        input: {
            colors: {
                gray: 'dark:bg-transparent border text-darkGray dark:text-lightGray border-lightGray dark:border-grayLine dark:placeholder:text-lightGray placeholder:text-darkGray placeholder:opacity-60 focus:ring-1 focus:border-primary focus:ring-primary dark:focus:ring-primary'
            },
        },
    },
}

export default function Header() {
    const path = useLocation().pathname
    const location = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { currentUser } = useSelector((state) => state.user)
    const { theme } = useSelector((state) => state.theme)
    const [searchTerm, setSearchTerm] = useState('')
    const [openDrawer, setOpenDrawer] = useState(false)
    const handleClose = () => setOpenDrawer(false)

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const searchTermFromUrl = urlParams.get('searchTerm')

        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl)
        }
    }, [location.search])

    const handleSubmit = (e) => {
        e.preventDefault()

        const urlParams = new URLSearchParams(location.search)
        urlParams.set('searchTerm', searchTerm)
        const searchQuery = urlParams.toString()
        navigate(`/search?${searchQuery}`)
    }

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
        <>
            {currentUser ? (
                <>
                    <Navbar fluid className='dark:bg-bgDark bg-white sticky top-0 z-[100] py-4' theme={dashboardNavTheme}>
                        <Navbar.Toggle onClick={() => setOpenDrawer(true)}/>
                        <div>
                            <form onSubmit={handleSubmit}>
                                <TextInput 
                                    type='text'
                                    placeholder='Search...'
                                    rightIcon={IoIosSearch}
                                    className='ml-2'
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    color='gray'
                                    theme={inputTheme}
                                />
                            </form>
                        </div>
                        <div className='flex flex-row'>
                            <Button
                                className='w-14 h-14 inline text-bgDark dark:text-white focus:ring-transparent hover:opacity-80 text-xl'
                                onClick={() => dispatch(toggleTheme())}
                            >
                                {theme === 'dark' ? <FaSun /> : <FaMoon />}
                            </Button>
                            <Dropdown
                                arrowIcon={false}
                                inline
                                label={
                                    <Avatar alt='user' img={currentUser.profilePicture} rounded />
                                }
                                theme={dropdownTheme}
                            >
                                <Dropdown.Header>
                                    {/* <span className='block text-sm'>Hi {currentUser.name}</span> */}
                                    <span className='block text-sm font-medium truncate text-primary'>
                                        {currentUser.email}
                                    </span>
                                </Dropdown.Header>
                                <Link to={'/dashboard?tab=profile'}>
                                    <Dropdown.Item>Profile</Dropdown.Item>
                                </Link>
                                <Dropdown.Divider />
                                <Dropdown.Item onClick={handleSignout}>Sign Out</Dropdown.Item>
                            </Dropdown>
                        </div>
                    </Navbar>
                    <Drawer 
                        open={openDrawer} 
                        onClose={handleClose} 
                        className='z-[100] dark:bg-bgDark lg:border-r dark:border-darkGray' 
                        backdrop={false}
                        theme={drawerTheme}
                        position='left'
                    >
                        <Drawer.Header  titleIcon={() => <></>} />
                            <Drawer.Items onClick={handleClose}>
                                <DashSidebar />
                        </Drawer.Items>
                    </Drawer>
                </>
            ) : (
                <>
                    <Navbar fluid className='dark:bg-transparent bg-transparent border-b dark:border-darkGray backdrop-blur-3xl sticky top-0 z-[100] w-full py-4' theme={customTheme}>
                        <Navbar.Brand href='/' className=' text-2xl  font-semibold'>
                            Media Tracker
                        </Navbar.Brand>
                        <div className='flex md:order-2 lg:gap-3 gap-2'>
                            <Button
                                className='w-14 h-14 inline text-bgDark dark:text-white focus:ring-transparent hover:opacity-80 text-xl'
                                onClick={() => dispatch(toggleTheme())}
                            >
                                {theme === 'dark' ? <FaSun /> : <FaMoon />}
                            </Button>
                            <Link to='/sign-in' className='items-center flex'>
                                <Button className='bg-transparent dark:text-white text-black border dark:border-grayLine border-black rounded-md'>Sign In</Button>
                            </Link>
                            <Link to='/sign-up' className='items-center flex'>
                                <Button className='dark:bg-white bg-black dark:text-black text-white rounded-md'>Sign Up</Button>
                            </Link>
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
                </>
            )}
        </>
    )
}