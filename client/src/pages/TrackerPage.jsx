import { Modal, Button, Dropdown, Spinner } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

export default function TrackerPage() {
    const { currentUser } = useSelector((state) => state.user)
    const [tracker, setTracker] = useState({})
    const { trackerId } = useParams()

    useEffect(() => {
        const fetchTrackers = async () => {
            try {
                const res = await fetch(`/api/tracker/get-trackers?userId=${currentUser._id}&trackerId=${trackerId}`)
                const data = await res.json()

                if (res.ok) {
                    setTracker(data.trackers[0])

                }
            } catch (error) {
                console.log(error.message)
            }
        }

        fetchTrackers()
    }, [currentUser._id, trackerId])

    return (
        <div className='flex flex-col lg:flex-row gap-6 lg:pt-6 py-2 lg:px-10 px-4 lg:pb-6'>
            <div className='rounded-lg'>
                <img src={tracker.image} className='rounded-lg' />
            </div>

            <div className='flex flex-col w-full gap-2'>
                <h1 className='text-3xl font-bold capitalize'>{tracker.title}</h1>
                <p className=''>{tracker.by}</p>
                <p className={`lg:text-xs text-[.70rem] rounded-full lg:px-3 lg:py-2 px-2 py-1 ${tracker.status  === 'Completed' ? 'bg-lightGreen text-darkGreen dark:bg-accent dark:text-black' : tracker.status  === 'In Progress' ? ' bg-lightPurple text-darkPurple dark:bg-primary dark:text-black' : 'bg-black text-white opacity-50 dark:bg-white dark:text-black'} `}>{tracker.status}</p>
            
                <Button className='mt-6 bg-black dark:bg-white dark:text-black capitalize hover:bg-transparent hover:border-black hover:text-black dark:hover:bg-transparent dark:hover:border-white dark:hover:text-white' onClick={() => setShowForm(true) }>
                        Edit
                    </Button>
            </div>

            

            

        </div>
    )
}
