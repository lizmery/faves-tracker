import { Sidebar } from 'flowbite-react'
import {
  HiUser,
  HiChartPie,
  HiLogout,
  HiOutlineBookOpen,
  HiOutlineFilm,
  HiOutlineDesktopComputer,
  HiTable,
} from 'react-icons/hi'
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { signOutSuccess } from '../../redux/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { dashSidebarTheme } from '../../flowbiteThemes/customThemes'

export default function DashSidebar() {
    const location = useLocation()
    const dispatch = useDispatch()
    const { currentUser } = useSelector((state) => state.user)
    const [tab, setTab] = useState('')

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')

        console.log('tabFROMurl: ' + tabFromUrl)

        if (tabFromUrl) {
            setTab(tabFromUrl)
        } else {
            setTab('')
        }
    }, [location.search])

    const handleSignout = async () => {
        try {
            const res = await fetch ('/api/user/signout', {
                method: 'POST'
            })
            const data = await res.json()

            if (!res.ok){
                console.log(data.message)
            } else {
                dispatch(signOutSuccess())
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    return (
        <Sidebar className='w-full lg:w-50' theme={dashSidebarTheme}>
            <Sidebar.Logo href='#' className='items-center flex justify-center lg:justify-start'>
                <span className='text-2xl'>Media Tracker</span>
            </Sidebar.Logo>
            <Sidebar.Items className='flex flex-col justify-between'>
                <Sidebar.ItemGroup className='flex flex-col gap-1'>
                    <Link to='/dashboard?tab=profile'>
                        <Sidebar.Item
                            active={tab === 'profile'}
                            icon={HiUser}
                            
                            labelColor='#BFFF70'
                            as='div'
                        >
                            Profile
                        </Sidebar.Item>
                    </Link>
                    <Link to='/dashboard?tab=overview'>
                        <Sidebar.Item
                            active={tab === 'overview'}
                            icon={HiChartPie}
                            as='div'
                        >
                            Overview
                        </Sidebar.Item>
                    </Link>
                    <Link to='/dashboard?tab=series'>
                        <Sidebar.Item
                            active={tab === 'series'}
                            icon={HiOutlineDesktopComputer}
                            as='div'
                        >
                            Series
                        </Sidebar.Item>
                    </Link>
                    <Link to='/dashboard?tab=books'>
                        <Sidebar.Item
                            active={tab === 'books'}
                            icon={HiOutlineBookOpen}
                            as='div'
                        >
                            Books
                        </Sidebar.Item>
                    </Link>
                    <Link to='/dashboard?tab=movies'>
                        <Sidebar.Item
                            active={tab === 'movies'}
                            icon={HiOutlineFilm}
                            as='div'
                        >
                            Movies
                        </Sidebar.Item>
                    </Link>
                </Sidebar.ItemGroup>
                <Sidebar.ItemGroup className='border-none mt-20'>
                    <Sidebar.Item
                        className='cursor-pointer'
                        icon={HiLogout}
                        onClick={handleSignout}
                    >
                        Sign Out
                    </Sidebar.Item>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    )
}  