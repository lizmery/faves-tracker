import { Modal, Button } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import TrackerTable from './tracker/TrackerTable'
import SummaryCards from './tracker/SummaryCards'
import CreateTrackerForm from './tracker/CreateTrackerForm'

const modalTheme = {
    root: {
        base: 'fixed inset-x-0 top-0 z-[100] h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full'
    }
}

export default function DashOverview() {
    const { currentUser } = useSelector((state) => state.user)
    const [userTrackers, setUserTrackers] = useState([])
    const [trackersCompleted, setTrackersCompleted] = useState()
    const [trackersInProgress, setTrackersInProgress] = useState()
    const [trackersNotStarted, setTrackersNotStarted] = useState()
    const [showForm, setShowForm] = useState(false)

    const handleClose = () => setShowForm(false)

    useEffect(() => {
        const fetchTrackers = async () => {
            try {
                const res = await fetch(`/api/tracker/get-trackers?userId=${currentUser._id}`)
                const data = await res.json()

                if (res.ok) {
                    setUserTrackers(data.trackers)
                    setTrackersCompleted(data.totalCompleted)
                    setTrackersInProgress(data.totalInProgress)
                    setTrackersNotStarted(data.totalNotStarted)
                    // if (data.trackers.length < 10) {

                    // }
                }
            } catch (error) {
                console.log(error.message)
            }
        }

        fetchTrackers()
    }, [currentUser._id])

    return (
        <div className='bg-transparent flex flex-col gap-6 lg:gap-8 w-full overflow-x-hidden'>
            <div className='flex justify-between'>
                <h1 className='text-3xl font-bold'>Overview</h1>
            </div>
            <SummaryCards 
                trackerCategory='media' 
                trackersCompleted={trackersCompleted} 
                trackersInProgress={trackersInProgress} 
                trackersNotStarted={trackersNotStarted}
            />
            <div className=''>
                <TrackerTable userTrackers={userTrackers} trackerCategory='media' />
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