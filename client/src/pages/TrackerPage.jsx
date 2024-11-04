import { Button, Drawer } from 'flowbite-react'
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

    const handleClose = () => setOpenDrawer(false)

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
        <div className='flex flex-col gap-6 lg:pt-6 py-2 lg:px-10 px-4 lg:pb-6'>
            <h1 className='text-3xl font-bold capitalize'>{tracker.title}</h1>

            <div className='flex flex-col md:flex-row gap-6'>
                <div className='rounded-lg md:w-full lg:w-auto border shadow-sm dark:border-grayLine'>
                    <img src={tracker.image} className='rounded-lg max-h-[20rem] md:max-h-full w-full object-fill' />
                </div>

                <div className='flex flex-col w-full gap-2'>
                    <p className={`lg:text-xs text-[.70rem] rounded-full lg:px-3 lg:py-2 px-2 py-1 ${tracker.status  === 'Completed' ? 'bg-lightGreen text-darkGreen dark:bg-accent dark:text-black' : tracker.status  === 'In Progress' ? ' bg-lightPurple text-darkPurple dark:bg-primary dark:text-black' : 'bg-black text-white opacity-50 dark:bg-white dark:text-black'} `}>{tracker.status}</p>
                    <p className=''>{tracker.by}</p>
                    <p>Genres: </p>
                    <p>Rating: {tracker.rating}</p>
                    <p>Category: {tracker.category}</p>
                    <p>Subcategory: {tracker.type}</p>
                    <p>Notes: {tracker.notes}</p>
                    <Button onClick={() => setOpenDrawer(true)} className='mt-6 bg-black dark:bg-white dark:text-black capitalize hover:bg-transparent hover:border-black hover:text-black dark:hover:bg-transparent dark:hover:border-white dark:hover:text-white'>
                        Edit
                    </Button>
                </div>
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
    )
}
