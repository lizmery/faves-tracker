import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import DashSidebar from '../components/DashSidebar'

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
        <div className='min-h-screen flex flex-col lg:flex-row lg:pl-6 lg:pt-6 p-2'>
            <div className='lg:w-65 dark:bg-bgDarkSecondary bg-bgLightSecondary rounded-lg px-3 pt-5'>
                <DashSidebar />
            </div>
        </div>
    )
}