import { Button, Drawer, Spinner, Progress } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import TrackerDetails from '../components/dashboard/tracker/TrackerDetails'
import { drawerTheme } from '../flowbiteThemes/customThemes'

export default function TrackerPage() {
    const { currentUser } = useSelector((state) => state.user)
    const [tracker, setTracker] = useState({})
    const { trackerId } = useParams()
    const [openDrawer, setOpenDrawer] = useState(false)
    const [loading, setLoading] = useState(false)
    const apiUrl = import.meta.env.VITE_API_URL

    const currentProgress = tracker?.progress?.current ?? 0
    const totalProgress = tracker?.progress?.total ?? 1
    const progressPercentage = Math.round((currentProgress / totalProgress) * 100)

    const handleClose = () => setOpenDrawer(false)

    useEffect(() => {
        const fetchTrackers = async () => {
            try {
                setLoading(true)
                const res = await fetch(`${apiUrl}/api/tracker/get-trackers?userId=${currentUser._id}&trackerId=${trackerId}`)
                const data = await res.json()

                if (res.ok) {
                    setLoading(false)
                    setTracker(data.trackers[0])
                }
            } catch (error) {
                console.log(error.message)
            }
        }

        fetchTrackers()
    }, [currentUser._id, trackerId])

    if (!tracker && !loading) {
        return <p className='text-center pt-8'>You do not have access to view this tracker</p>
    }

    return (
        <>
            {loading && (
                <div className='text-center'>
                    <Spinner size='xl' color='gray' />
                </div>
            )}
            {!loading && tracker._id && (
                <div className='flex flex-col-reverse md:flex-row gap-6 lg:pt-6 py-2 lg:px-10 px-4 lg:pb-6'>
                    <div className='flex flex-col gap-4 basis-3/4'>
                        <h1 className='text-3xl font-bold capitalize'>{tracker.title}</h1>
                        <p className=''>By: {tracker.by}</p>
                        <p>
                            Status: 
                            <span className={`ml-2 lg:text-xs text-[.70rem] rounded-full lg:px-3 lg:py-2 px-2 py-1 ${tracker.status  === 'Completed' ? 'bg-lightestGreen text-darkGreen dark:bg-darkGreen dark:text-lightestGreen' : tracker.status  === 'In Progress' ? ' bg-lightestPurple text-darkPurple dark:bg-darkPurple dark:text-lightestPurple' : tracker.status  === 'Dropped' ? ' bg-lightestPink text-darkPink dark:bg-darkPink dark:text-lightestPink' : 'bg-cardColorLight text-darkGray dark:bg-cardColorDark dark:text-lightGray'} `}>
                                    {tracker.status}
                            </span>
                        </p>
                        <p>Genres: {tracker.genres?.join(', ')}</p>
                        <p>Rating: {tracker.rating}</p>
                        <p>Category: {tracker.category}</p>
                        <p>Subcategory: {tracker.subcategory}</p>
                        <p className=''>
                            Created Date: {tracker.createdAt ? 
                                new Date(tracker.createdAt).toLocaleDateString('en-US', { timeZone: 'UTC' }) : ' N/A'}
                        </p>
                        <p className=''>
                            Date Started: {tracker.dateStarted ?
                                new Date(tracker.dateStarted).toLocaleDateString('en-US', { timeZone: 'UTC' }) : ' N/A' }
                        </p>
                        <p className=''>
                            Date Completed: {tracker.dateCompleted ? 
                                new Date(tracker.dateCompleted).toLocaleDateString('en-US', { timeZone: 'UTC' }) : ' N/A' }
                        </p>
                        <div>
                            <p className='pb-2'>Progress: {tracker.progress?.current} / {tracker.progress?.total}</p>
                            <Progress
                                progress={progressPercentage} 
                                size='lg'
                                color='gray'
                                labelProgress
                                progressLabelPosition='inside'
                            />
                        </div>
                        <p>Tags: {tracker.tags?.join(', ')}</p>
                        <p>Notes:  <br /> {tracker.notes}</p>
                        <Button onClick={() => setOpenDrawer(true)} className='mt-6 bg-black dark:bg-white dark:text-black capitalize hover:bg-transparent hover:border-black hover:text-black dark:hover:bg-transparent dark:hover:border-white dark:hover:text-white'>
                            Edit
                        </Button>
                    </div>
                    <div className='rounded-lg border shadow-sm dark:border-grayLine basis-1/4'>
                        <img src={tracker.image} className='rounded-lg max-h-[20rem] md:max-h-full w-full object-cover' />
                    </div>
                    <Drawer 
                        open={openDrawer} 
                        onClose={handleClose} 
                        position='right' 
                        className='z-[100] dark:bg-bgDark' 
                        theme={drawerTheme}
                    >
                        <TrackerDetails 
                            tracker={tracker} 
                            onClose={handleClose}
                        />
                    </Drawer>
                </div>
            )}
        </>
    )
}
