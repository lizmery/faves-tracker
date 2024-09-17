import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/dashboard/DashSidebar'
import DashProfile from '../components/dashboard/DashProfile'

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
        <div className='min-h-screen flex flex-col lg:flex-row lg:pl-6 lg:pt-6 p-2 pb-10'>
            <div className='lg:w-65 border-r pr-6  dark:border-darkGray'>
                <DashSidebar />
            </div>
            {tab === 'profile' && <DashProfile />}
        </div>
    )
}