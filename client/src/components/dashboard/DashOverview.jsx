import { Modal, Button, Spinner } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import TrackerTable from './tracker/TrackerTable'
import CreateTrackerForm from './tracker/CreateTrackerForm'
import {
    HiOutlineBookOpen,
    HiOutlineFilm,
    HiOutlineDesktopComputer
  } from 'react-icons/hi'
import { 
    PieChart, 
    Pie, 
    Cell, 
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip, 
    Legend, 
    ResponsiveContainer 
} from 'recharts'
import { modalTheme } from '../../flowbiteThemes/customThemes'

const COLORS = ['#A1E091', '#5E48A3', '#826EBF', '#DAD4EC', '#D4D2D2']
const apiUrl = import.meta.env.VITE_API_URL

export default function DashOverview() {
    const { currentUser } = useSelector((state) => state.user)
    const [completedTrackers, setCompletedTrackers] = useState([])
    const [popularGenres, setPopularGenres] = useState([])
    const [userActivity, setUserActivity] = useState([])
    const [highestRatedTrackers, setHighestRatedTrackers] = useState([])
    const [recentTrackers, setRecentTrackers] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [loading, setLoading] = useState(false)

    const handleClose = () => setShowForm(false)

    useEffect(() => {
        const fetchTrackers = async () => {
            try {
                setLoading(true)
                const res = await fetch(`${apiUrl}/api/tracker/get-trackers-overview?userId=${currentUser._id}`)
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
    }, [currentUser._id])

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
            <div className='flex justify-between'>
                <h1 className='text-3xl font-bold'>Overview</h1>
                <Button className='bg-black dark:bg-white dark:text-black capitalize hover:bg-transparent hover:border-black hover:text-black dark:hover:bg-transparent dark:hover:border-white dark:hover:text-white' onClick={() => setShowForm(true) }>
                    Add Tracker
                </Button>
            </div>

            {loading ? 
                <div className='h-screen text-center'>
                    <Spinner size='xl' color='gray' />
                </div>
            : (
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
                    <div className='row-span-3 lg:col-span-1 col-span-3 border dark:border-darkGray dark:bg-[#1f1f1f] p-4 rounded-md w-full max-h-[600px] h-full'>
                        <h1 className='text-xl font-bold'>Popular Genres</h1>
                        <p className='text-sm font-light opacity-60 w-full'>Top 5 genres across all 'Completed' media</p>
                        <ResponsiveContainer width='100%' height='90%'>
                            <PieChart height={200}>
                                <Pie
                                    data={popularGenres}
                                    dataKey='value'
                                    nameKey='name'
                                    cx='50%'
                                    cy='50%'
                                    outerRadius={80}
                                    innerRadius={60}
                                    paddingAngle={2}
                                >
                                    {popularGenres.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} strokeWidth={0} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend iconType='circle' />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    {/* activity bar chart */}
                    <div className='p-4 row-span-2 col-span-3 border dark:border-darkGray dark:bg-[#1f1f1f] rounded-md max-h-[600px]'>
                        <h1 className='text-xl font-bold'>Activity</h1>
                        <p className='text-sm font-light opacity-60 mb-4'>Tracker activity for the past 6 months across all media</p>
                        <ResponsiveContainer width='100%' height={300}>
                            <BarChart data={userActivity}>
                                <XAxis dataKey='month' />
                                <YAxis />
                                <Tooltip />

                                {/* Series category */}
                                <Bar dataKey='Series_Completed' stackId='Series' fill='#A1E091' />
                                <Bar dataKey='Series_In Progress' stackId='Series' fill='#826EBF' />
                                <Bar dataKey='Series_Not Started' stackId='Series' fill='#D4D2D2' />

                                {/* Books category */}
                                <Bar dataKey='Books_Completed' stackId='Books' fill='#A1E091' />
                                <Bar dataKey='Books_In Progress' stackId='Books' fill='#826EBF' />
                                <Bar dataKey='Books_Not Started' stackId='Books' fill='#D4D2D2' />

                                {/* Movies category */}
                                <Bar dataKey='Movies_Completed' stackId='Movies' fill='#A1E091' />
                                <Bar dataKey='Movies_In Progress' stackId='Movies' fill='#826EBF' />
                                <Bar dataKey='Movies_Not Started' stackId='Movies' fill='#D4D2D2' />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* trackers table */}
                    <div className='row-span-3 col-span-3 border dark:border-darkGray dark:bg-[#1f1f1f] p-4 rounded-md'>
                        <div className='flex justify-between items-center'>
                            <h1 className='text-xl font-bold'>Highest Rated</h1>
                            <Link 
                                className='text-black dark:text-white font-semibold text-sm underline-offset-4 hover:underline'
                                to='/search?sortBy=rating&sortDirection=desc'
                            >
                                View All
                            </Link>
                        </div>
                        <p className='text-sm font-light opacity-60 mb-2'>Trackers with the highest ratings across all media</p>
                        <TrackerTable userTrackers={highestRatedTrackers} trackerCategory='media' />
                    </div>

                    {/* recently added trackers list */}
                    <div className='row-span-3 p-4 border dark:border-darkGray dark:bg-[#1f1f1f] rounded-md flex flex-col w-full col-span-3 lg:col-span-1'>
                        <div className='flex justify-between items-center mb-4'> 
                            <h1 className='text-xl font-bold'>Recently Added</h1>
                            <Link 
                                className='text-black dark:text-white font-semibold text-sm underline-offset-4 hover:underline'
                                to='/search?sortDirection=desc'
                            >
                                View All
                            </Link>
                        </div>
                        <div className='flow-root w-full'>
                            <ul className='divide-y divide-lightGray dark:divide-grayLine'>
                                {recentTrackers.map((tracker) => (
                                    <li className='py-3 sm:py-4' key={tracker._id}>
                                        <Link to={`/tracker/${tracker._id}`}>
                                            <div className='flex items-center space-x-4'>
                                                <div className='shrink-0 p-1'>
                                                    <img src={tracker.image} className='h-[40px] w-[40px] rounded-full' />
                                                </div>
                                                <div className=''>
                                                    <p className='truncate text-sm font-medium'>{tracker.title}</p>
                                                    <p className='truncate text-sm font-light opacity-60'>{tracker.by}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
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