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
                        <Navbar.Brand href='/' className='text-black text-2xl font-semibold'>
                            Media Tracker
                        </Navbar.Brand>
                        <div className='flex md:order-2 lg:gap-3 gap-2'>
                            <Link to='/sign-up' className='items-center flex'>
                                <Button className='bg-black text-white rounded-md'>Sign Up</Button>
                            </Link>
                            <Link to='/sign-in' className='items-center flex'>
                                <Button className='bg-transparent text-black border border-black rounded-md'>Sign In</Button>
                            </Link>
                            <Navbar.Toggle />
                        </div>
                        <Navbar.Collapse className='dark:text-[#B8B8B8]'>
                            <Navbar.Link active={path === '/'} as={'div'} className='text-bgDark border-none opacity-70 hover:opacity-100'>
                                <a href='/#hero'>Home</a>
                            </Navbar.Link>
                            <Navbar.Link active={path === '/#features'} as={'div'} className='text-bgDark border-none opacity-70 hover:opacity-100'>
                                <a href='/#features'>Features</a>
                            </Navbar.Link>
                            <Navbar.Link active={path === '/#about'} as={'div'} className='text-bgDark dark:text-lightGray border-none opacity-70 dark:hover:text-lightGray hover:opacity-100 dark:hover:bg-darkGray'>
                                <a href='/#about'>About</a>
                            </Navbar.Link>
                        </Navbar.Collapse>
                    </Navbar>
                </>
            )}
        </>
    )
}