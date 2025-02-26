import {
    Avatar,
    Button,
    Dropdown,
    Navbar,
    Drawer,
    TextInput
} from 'flowbite-react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FaMoon, FaSun } from 'react-icons/fa'
import { IoIosSearch } from 'react-icons/io'
import { useSelector, useDispatch } from 'react-redux'
import { signOutSuccess } from '../redux/user/userSlice'
import { toggleTheme }from '../redux/theme/themeSlice'
import { useEffect, useState } from 'react'
import DashSidebar from './dashboard/DashSidebar'
import { 
    navTheme,
    navDropdownTheme,
    dashNavTheme,
    dashDrawerTheme,
    inputTheme,
 } from '../flowbiteThemes/customThemes'

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
    const apiUrl = import.meta.env.VITE_API_URL

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
        urlParams.delete('tab')
        const searchQuery = urlParams.toString()

        navigate(`/search?${searchQuery}`)
    }

    const handleSignout = async () => {
        try {
            const res = await fetch(`${apiUrl}/api/user/signout`, {
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
                    {/* Dashboard Nav */}
                    <Navbar fluid className='dark:bg-bgDark bg-white sticky top-0 z-[100] py-4' theme={dashNavTheme}>
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
                                theme={navDropdownTheme}
                            >
                                <Dropdown.Header>
                                    {/* <span className='block text-sm'>Hi {currentUser.name}</span> */}
                                    <span className='block text-sm font-medium truncate text-darkPurple'>
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
                        theme={dashDrawerTheme}
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
                    <Navbar fluid className='bg-white border-b border-[#eee] dark:border-darkGray backdrop-blur-3xl sticky top-0 z-[100] w-full py-4' theme={navTheme}>
                        <Navbar.Brand href='/' className='text-black text-2xl font-semibold text-wrap'>
                            Media Tracker
                        </Navbar.Brand>
                        <div className='md:flex flex-col md:flex-row order-2 lg:gap-3 gap-2 hidden'>
                            <Link to='/sign-up' className='items-center flex'>
                                <Button className=' bg-black text-white rounded-md'>Sign Up</Button>
                            </Link>
                            <Link to='/sign-in' className='items-center flex'>
                                <Button className='bg-transparent text-black border border-black rounded-md'>Sign In</Button>
                            </Link>
                        </div>
                        <Navbar.Toggle />
                        
                        <Navbar.Collapse className='dark:text-[#B8B8B8] w-full md:flex'>
                            <div className='flex flex-col md:flex-row gap-3 md:gap-4 lg:gap-8 w-full'>
                                <Navbar.Link active={path === '/'} as={'div'} className='text-bgDark border-none opacity-70 hover:opacity-100 bg-transparent'>
                                    <a href='/#hero'>Home</a>
                                </Navbar.Link>
                                <Navbar.Link active={path === '/#about'} as={'div'} className='text-bgDark border-none opacity-70  hover:opacity-100 bg-transparent'>
                                    <a href='/#about'>About</a>
                                </Navbar.Link>
                                <Navbar.Link active={path === '/#features'} as={'div'} className='text-bgDark border-none opacity-70 hover:opacity-100 hover:bg-transparent'>
                                    <a href='/#features'>Features</a>
                                </Navbar.Link>
                            </div>
                            
                            <div className='flex flex-col gap-2 md:hidden py-3 mt-8'>
                                <Navbar.Link active={path === '/sign-in'} href='/sign-in' className='items-center flex text-bgDark opacity-70 hover:opacity-100 pt-2 cursor-pointer border-none'>
                                    Sign In
                                </Navbar.Link>
                                <Navbar.Link href='/sign-up' className='items-center flex border-none'>
                                    <Button className='bg-black text-white rounded-md border-none'>Sign Up</Button>
                                </Navbar.Link>
                            </div>
                        </Navbar.Collapse>
                    </Navbar>
                </>
            )}
        </>
    )
}