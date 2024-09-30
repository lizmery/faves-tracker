import { Modal, Button } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import TrackerTable from './tracker/TrackerTable'
import SummaryCards from './tracker/SummaryCards'
import CreateTrackerForm from './tracker/CreateTrackerForm'

const modalTheme = {
    root: {
        base: 'fixed inset-x-0 top-0 z-[100] h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full'
    }
}

export default function DashMovies() {
    const { currentUser } = useSelector((state) => state.user)
    const [userMovies, setUserMovies] = useState([])
    const [moviesCompleted, setMoviesCompleted] = useState()
    const [moviesInProgress, setMoviesInProgress] = useState()
    const [moviesNotStarted, setMoviesNotStarted] = useState()
    const [showForm, setShowForm] = useState(false)

    const handleClose = () => setShowForm(false)

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await fetch(`/api/tracker/get-trackers?userId=${currentUser._id}&category=Movies`)
                const data = await res.json()

                if (res.ok) {
                    setUserMovies(data.trackers)
                    setMoviesCompleted(data.totalCompleted)
                    setMoviesInProgress(data.totalInProgress)
                    setMoviesNotStarted(data.totalNotStarted)
                    // if (data.trackers.length < 10) {

                    // }
                }
            } catch (error) {
                console.log(error.message)
            }
        }

        fetchMovies()
    }, [currentUser._id])

    return (
        <div className='xl:mr-5 bg-transparent flex flex-col gap-6 lg:gap-8 w-full overflow-x-hidden'>
            <div className='flex justify-between'>
                <h1 className='text-3xl font-bold'>Favorite Movies</h1>
                <Button className='border-black text-black border-2 dark:border-lightGray dark:text-white' onClick={() => setShowForm(true) }>Add Movies</Button>
            </div>
            <SummaryCards 
                trackerCategory='movies' 
                trackersCompleted={moviesCompleted} 
                trackersInProgress={moviesInProgress} 
                trackersNotStarted={moviesNotStarted}
            />
            <div className=''>
                <TrackerTable userTrackers={userMovies} trackerCategory='movies' />
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