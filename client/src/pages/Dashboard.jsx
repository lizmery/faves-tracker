import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/dashboard/DashSidebar'
import DashProfile from '../components/dashboard/DashProfile'
import DashSeries from '../components/dashboard/DashSeries'
import DashBooks from '../components/dashboard/DashBooks'
import DashMovies from '../components/dashboard/DashMovies'

export default function Dashboard() {
    const location = useLocation()
    const [tab, setTab] = useState('')

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const tabFromUrl = urlParams.get('tab')

        if (tabFromUrl) {
            setTab(tabFromUrl)
        }
    }, [location.search])

    return (
        <div className='min-h-screen flex flex-col lg:flex-row lg:pt-6 py-2 lg:px-10 px-4 lg:pb-6'>
            {tab === 'profile' && <DashProfile />}
            {tab === 'series' && <DashSeries />}
            {tab === 'books' && <DashBooks />}
            {tab === 'movies' && <DashMovies />}
        </div>
    )
}