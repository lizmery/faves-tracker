import { Modal, Button } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import TrackerTable from './tracker/TrackerTable'
import SummaryCard from './tracker/SummaryCard'
import CreateTrackerForm from './tracker/CreateTrackerForm'

const modalTheme = {
    root: {
        base: 'fixed inset-x-0 top-0 z-[100] h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full'
    }
}

export default function DashSeries() {
    const { currentUser } = useSelector((state) => state.user)
    const [userSeries, setUserSeries] = useState([])
    const [seriesCompleted, setSeriesCompleted] = useState()
    const [seriesInProgress, setSeriesInProgress] = useState()
    const [seriesNotStarted, setSeriesNotStarted] = useState()
    const [showForm, setShowForm] = useState(false)

    const handleClose = () => setShowForm(false)

    useEffect(() => {
        const fetchSeries = async () => {
            try {
                const res = await fetch(`/api/tracker/get-trackers?userId=${currentUser._id}&category=Series`)
                const data = await res.json()

                if (res.ok) {
                    setUserSeries(data.trackers)
                    setSeriesCompleted(data.totalCompleted)
                    setSeriesInProgress(data.totalInProgress)
                    setSeriesNotStarted(data.totalNotStarted)
                    // if (data.trackers.length < 10) {

                    // }
                }
            } catch (error) {
                console.log(error.message)
            }
        }

        fetchSeries()
    }, [currentUser._id])

    return (
        <div className='bg-transparent flex flex-col gap-6 lg:gap-8 w-full overflow-x-hidden'>
            <div className='flex justify-between'>
                <h1 className='text-3xl font-bold'>Series</h1>
                <Button className='border-black text-black border-2 dark:border-lightGray dark:text-white' onClick={() => setShowForm(true) }>Add Series</Button>
            </div>
            <div className='flex flex-col md:flex-row gap-4 lg:gap-5 w-full'>
                <SummaryCard 
                    cardTitle='Total Series Completed'
                    trackerData={seriesCompleted}
                    cardColor='lightGreen'
                    cardHoverColor='lightestGreen'
                />
                <SummaryCard 
                    cardTitle='Total Series In Progress'
                    trackerData={seriesInProgress}
                    cardColor='lightPurple'
                    cardHoverColor='lightestPurple'
                />
                <SummaryCard 
                    cardTitle='Total Series Not Yet Started'
                    trackerData={seriesNotStarted}
                    cardColor=''
                    cardHoverColor=''
                />
            </div>
            <div className=''>
                <TrackerTable userTrackers={userSeries} trackerCategory='series' />
            </div>
            <Modal 
                show={showForm} 
                onClose={handleClose} 
                popup
                theme={modalTheme}
                className='dark:bg-grayLine'
            >
                <Modal.Header  />
                <Modal.Body>
                    <CreateTrackerForm />
                </Modal.Body>
            </Modal>
        </div>
    )
}