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

export default function DashBooks() {
    const { currentUser } = useSelector((state) => state.user)
    const [userBooks, setUserBooks] = useState([])
    const [booksCompleted, setBooksCompleted] = useState()
    const [booksInProgress, setBooksInProgress] = useState()
    const [booksNotStarted, setBooksNotStarted] = useState()
    const [showForm, setShowForm] = useState(false)

    const handleClose = () => setShowForm(false)

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const res = await fetch(`/api/tracker/get-trackers?userId=${currentUser._id}&category=Books`)
                const data = await res.json()

                if (res.ok) {
                    setUserBooks(data.trackers)
                    setBooksCompleted(data.totalCompleted)
                    setBooksInProgress(data.totalInProgress)
                    setBooksNotStarted(data.totalNotStarted)
                    // if (data.trackers.length < 10) {

                    // }
                }
            } catch (error) {
                console.log(error.message)
            }
        }

        fetchBooks()
    }, [currentUser._id])

    return (
        <div className='xl:mr-5 bg-transparent flex flex-col gap-6 lg:gap-8 w-full overflow-x-hidden'>
            <div className='flex justify-between'>
                <h1 className='text-3xl font-bold'>Books</h1>
                <Button className='border-black text-black border-2 dark:border-lightGray dark:text-white' onClick={() => setShowForm(true) }>Add Books</Button>
            </div>
            <SummaryCards 
                trackerCategory='books' 
                trackersCompleted={booksCompleted} 
                trackersInProgress={booksInProgress} 
                trackersNotStarted={booksNotStarted}
            />
            <div className=''>
                <TrackerTable userTrackers={userBooks} trackerCategory='books' />
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