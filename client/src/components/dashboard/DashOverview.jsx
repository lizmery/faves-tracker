import { Modal, Button, Spinner, Select, Label } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CreateTrackerForm from './tracker/CreateTrackerForm'
import {
    HiOutlineBookOpen,
    HiOutlineFilm,
    HiOutlineDesktopComputer
  } from 'react-icons/hi'
import { modalTheme, inputTheme } from '../../flowbiteThemes/customThemes'
import PieChartWidget from './overviewWidgets/PieChartWidget'
import BarChartWidget from './overviewWidgets/BarChartWidget'
import ListWidget from './overviewWidgets/ListWidget'
import TableWidget from './overviewWidgets/TableWidget'

const apiUrl = import.meta.env.VITE_API_URL

export default function DashOverview() {
    const { currentUser } = useSelector((state) => state.user)
    const [completedTrackers, setCompletedTrackers] = useState([])
    const [popularGenres, setPopularGenres] = useState([])
    const [userActivity, setUserActivity] = useState([])
    const [highestRatedTrackers, setHighestRatedTrackers] = useState([])
    const [recentTrackers, setRecentTrackers] = useState([])
    const [trackerCategory, setTrackerCategory] = useState('All')
    const [showForm, setShowForm] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleClose = () => setShowForm(false)

    useEffect(() => {
        const fetchTrackers = async () => {
            try {
                setLoading(true)
                const res = await fetch(`${apiUrl}/api/tracker/get-trackers-overview?userId=${currentUser._id}&category=${trackerCategory}`)
                const data = await res.json()

                if (res.ok) {
                    setLoading(false)
                    setCompletedTrackers(data.completedTrackersByCategory)
                    setHighestRatedTrackers(data.highestRatedTrackers)
                    setRecentTrackers(data.recentTrackers)

                    const formattedPopularGenres = formatPieChartData(data.popularGenresCompleted)
                    setPopularGenres(formattedPopularGenres)

                    const formattedUserActivity = formatBarChartData(data.userActivity)
                    setUserActivity(formattedUserActivity)
                }
            } catch (error) {
                console.log(error.message)
            }
        }

        fetchTrackers()
    }, [currentUser._id, trackerCategory])

    const formatPieChartData = (data) => {
        return data.map((item) => ({
            name: item._id,
            value: item.count,
        }))
    }

    const formatBarChartData = (data) => {
        const formattedData = {}
        const months = [ 
            'January', 
            'February', 
            'March', 
            'April', 
            'May', 
            'June', 
            'July', 
            'August', 
            'September',
            'October',
            'November',
            'December'
        ]

        data.forEach(({ _id, count }) => {
            const { month, year, category, status } = _id
            const monthLabel = `${months[month - 1]} ${year}`

            if (!formattedData[monthLabel]) {
                formattedData[monthLabel] = { month: monthLabel }
            }

            const key = `${category}_${status}`
            formattedData[monthLabel][key] = count
        })

        return Object.values(formattedData)
    }

    return (
        <div className='bg-transparent flex flex-col gap-6 lg:gap-8 w-full overflow-x-hidden h-full'>
            <div className='flex flex-col md:flex-row justify-between gap-2'>
                <h1 className='text-3xl font-bold'>Overview</h1>
                <div className='flex gap-2'>
                    <Select
                        value={trackerCategory}
                        onChange={(e) => setTrackerCategory(e.target.value)}
                        id='filter'
                        theme={inputTheme}
                        color='gray'
                    >
                        <option value='All'>All Categories</option>
                        <option value='Series'>Series</option>
                        <option value='Books'>Books</option>
                        <option value='Movies'>Movies</option>
                    </Select>
                    <Button className='bg-black dark:bg-white dark:text-black capitalize hover:bg-transparent hover:border-black hover:text-black dark:hover:bg-transparent dark:hover:border-white dark:hover:text-white' onClick={() => setShowForm(true) }>
                        Add Tracker
                    </Button>
                </div>
            </div>

            {!loading && recentTrackers.length === 0 && (
                <p className='text-center pt-8'>You have not added any trackers yet. <br /> Click the "Add Tracker" button to get started.</p>
            )}

            {loading && (
                <div className='h-screen text-center mt-10'>
                    <Spinner size='xl' color='gray' />
                </div>
            )}

            {!loading && recentTrackers.length > 0 && (
                <div className='h-full grid lg:grid-cols-4 gap-4 w-full grid-cols-1'>
                    {/* completed trackers per category cards */}
                    <div className='col-span-3 flex flex-col lg:flex-row gap-4 lg:max-h-[100px]'>
                        {completedTrackers.map((trackerCategory) => (
                            <div className='border dark:bg-[#1f1f1f] p-4 lg:p-5 flex gap-6 items-center w-full rounded-md text-left dark:border-darkGray'>
                                <div className='bg-[#f0f0eb] dark:bg-bgDark h-full lg:h-auto p-4 lg:p-6 rounded-md flex items-center'>
                                    {trackerCategory._id === 'Series' ? <HiOutlineDesktopComputer className='text-2xl' /> : trackerCategory._id === 'Books' ? <HiOutlineBookOpen className='text-2xl' /> : <HiOutlineFilm className='text-2xl' /> }
                                </div>
                                <div className='flex lg:flex-col lg:gap-2 gap-3 items-center lg:items-start'>
                                    <h1 className='text-2xl font-bold'>{trackerCategory.totalCompleted}</h1>
                                    <h3 className='text-sm font-light opacity-60'>Total {trackerCategory._id} Completed</h3>
                                </div>
                            </div>
                        ))}
                        
                    </div>

                    {/* popular genres pie chart */}
                    <PieChartWidget
                        data={popularGenres}
                        title='Popular Genres' 
                        desc={trackerCategory === 'All' ? 'Top 5 genres across All categories' : `Top 5 genres across all ${trackerCategory}`}
                    />

                    {/* activity bar chart */}
                    <BarChartWidget
                        data={userActivity} 
                        title='Activity'
                        desc={`Tracker activity for the past 6 months across all ${trackerCategory === 'All' ? 'categories' : trackerCategory}`}
                    />

                    {/* trackers table */}
                    <TableWidget
                        data={highestRatedTrackers}
                        title='Highest Rated' 
                        desc={`Trackers with the highest ratings across all ${trackerCategory === 'All' ? 'categories' : trackerCategory}`}
                    />

                    {/* recently added trackers list */}
                    <ListWidget
                        data={recentTrackers}
                        title='Recently Added'
                    />
                </div>
            )}

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