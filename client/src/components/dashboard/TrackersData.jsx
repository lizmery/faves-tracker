import { Modal, Button, Dropdown } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import TrackerTable from './tracker/TrackerTable'
import SummaryCard from './tracker/SummaryCard'
import CreateTrackerForm from './tracker/CreateTrackerForm'
import { RiProgress1Line, RiProgress5Line, RiProgress8Line } from 'react-icons/ri'
import { FaSlidersH, FaUndoAlt } from 'react-icons/fa'

const modalTheme = {
    root: {
        base: 'fixed inset-x-0 top-0 z-[100] h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full'
    }
}

export default function TrackersData({ trackerCategory }) {
    const { currentUser } = useSelector((state) => state.user)
    const [userTrackers, setUserTrackers] = useState([])
    const [trackersCompleted, setTrackersCompleted] = useState()
    const [trackersInProgress, setTrackersInProgress] = useState()
    const [trackersNotStarted, setTrackersNotStarted] = useState()
    const [showForm, setShowForm] = useState(false)
    const [filters, setFilters] = useState({ genre: '', status: '', type: '', tags: '', by: '' })
    const [filteredTrackers, setFilteredTrackers] = useState([])
    const [showFilterModal, setShowFilterModal] = useState(false)

    const handleClose = () => setShowForm(false)

    useEffect(() => {
        const fetchTrackers = async () => {
            try {
                const res = await fetch(`/api/tracker/get-trackers?userId=${currentUser._id}&category=${trackerCategory}`)
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

    useEffect(() => {
        const getFilteredTrackers = () => {
            setFilteredTrackers(
                userTrackers.filter((tracker) => {
                    return (
                        (!filters.genre || tracker.genres.some((genre) => 
                            genre.toLowerCase().includes(filters.genre.toLowerCase())
                        )) &&
                        (!filters.status || tracker.status.toLowerCase() === filters.status.toLowerCase()) &&
                        (!filters.type || tracker.type.toLowerCase() === filters.type.toLowerCase()) &&
                        (!filters.tags || tracker.tags.some((tag) => 
                            tag.toLowerCase().includes(filters.tags.toLowerCase())
                        )) &&
                        (!filters.by || tracker.by.toLowerCase() === filters.by.toLowerCase())
                    )
                })
            )
        } 

        getFilteredTrackers()
    }, [filters])

    const handleFilterChange = (e) => {
        const { name, value } = e.target
        setFilters((prevFilters) => ({ ...prevFilters, [name]: value }))
    }

    return (
        <div className='bg-transparent flex flex-col gap-6 lg:gap-8 w-full overflow-x-hidden'>
            <div className='flex justify-between'>
                <h1 className='text-3xl font-bold capitalize'>{trackerCategory}</h1>
                <div className='flex gap-3 items-center'>
                    <Button className='bg-black dark:bg-white dark:text-black capitalize' onClick={() => setShowForm(true) }>
                        Add {trackerCategory}
                    </Button>
                </div>
            </div>

            <div className='flex flex-col md:flex-row gap-4 lg:gap-5 w-full'>
                <SummaryCard 
                    cardTitle={`Total ${trackerCategory} Completed`}
                    trackerData={trackersCompleted}
                    cardColor='lightGreen'
                    cardHoverColor='lightestGreen'
                    onClick={() => setFilters({status: 'Completed'})}
                    icon={<RiProgress8Line />}
                    
                />
                <SummaryCard 
                    cardTitle={`Total ${trackerCategory} In Progress`}
                    trackerData={trackersInProgress}
                    cardColor='lightPurple'
                    cardHoverColor='lightestPurple'
                    onClick={() => setFilters({status: 'In Progress'})}
                    icon={<RiProgress5Line />}
                />
                <SummaryCard 
                    cardTitle={`Total ${trackerCategory} Not Started`}
                    trackerData={trackersNotStarted}
                    cardColor=''
                    cardHoverColor=''
                    onClick={() => setFilters({status: 'Not Started'})}
                    icon={<RiProgress1Line />}
                />
            </div>

            <div className=''>
                <div className='flex justify-between'>
                    <h2 className='font-semibold text-lg'>All {trackerCategory}</h2>
                    <div className='flex gap-3 items-center'>
                        <FaUndoAlt className='text-md lg:text-lg cursor-pointer hover:opacity-60 opacity-100' onClick={() => setFilters({ genre: '', status: '', type: '', tags: '', by: '' })} />
                        <FaSlidersH
                            onClick={() => setShowFilterModal(true)}
                            className='text-xl text-black dark:text-white cursor-pointer hover:opacity-60'
                        />
                    </div>
                </div>
                <p className='opacity-50 font-light text-sm mb-8'>Trackers with the <span className='italic'>{trackerCategory}</span> category.</p>
                <TrackerTable userTrackers={filteredTrackers.length > 0 ? filteredTrackers : userTrackers} trackerCategory={trackerCategory} />              
            </div>

            {/* tracker form modal */}
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

            {/* table filters modal */}
            <Modal 
                show={showFilterModal} 
                onClose={() => setShowFilterModal(false)} 
                className='dark:bg-grayLine z-[100]'
            >
                <Modal.Header>Filters</Modal.Header>
                <Modal.Body>
                    <form className='flex flex-col gap-4'>
                        <div>
                            <label for='genre' className="mb-1 block text-sm font-medium leading-6 text-gray-900 dark:text-[#eee]">Genre:</label>
                            <input 
                                type='text'
                                name='genre'
                                onChange={handleFilterChange}
                                className='dark:bg-transparent block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-400 shadow-sm ring-2 ring-inset ring-lightGray dark:ring-darkGray placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary dark:focus:ring-primary sm:text-sm sm:leading-6'
                            />
                        </div>
                        <div>
                            <label for='status' className="mb-1 block text-sm font-medium leading-6 text-gray-900 dark:text-[#eee]">Status:</label>
                            <select name='status' onChange={handleFilterChange} className='w-full rounded-md border-lightGray border-2'>
                                <option value=''></option>
                                <option value='Completed'>Completed</option>
                                <option value='In Progress'>In Progress</option>
                                <option value='Not Started'>Not Started</option>
                            </select>  
                        </div>
                        <div>
                            <label for='type' className="mb-1 block text-sm font-medium leading-6 text-gray-900 dark:text-[#eee]">Type:</label>
                            <input 
                                type='text'
                                name='type'
                                value={filters.type}
                                onChange={handleFilterChange}
                                placeholder=''
                                className='dark:bg-transparent block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-400 shadow-sm ring-2 ring-inset ring-lightGray dark:ring-darkGray placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary dark:focus:ring-primary sm:text-sm sm:leading-6'
                            />
                        </div>
                        <div>
                            <label for='tags' className="mb-1 block text-sm font-medium leading-6 text-gray-900 dark:text-[#eee]">Tags:</label>
                            <input 
                                type='text'
                                name='tags'
                                value={filters.tags}
                                onChange={handleFilterChange}
                                placeholder=''
                                className='dark:bg-transparent block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-400 shadow-sm ring-2 ring-inset ring-lightGray dark:ring-darkGray placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary dark:focus:ring-primary sm:text-sm sm:leading-6'
                            />
                        </div>
                        <div>
                            <label for='by' className="mb-1 block text-sm font-medium leading-6 text-gray-900 dark:text-[#eee]">By:</label>
                            <input 
                                type='text'
                                name='by'
                                value={filters.by}
                                onChange={handleFilterChange}
                                placeholder=''
                                className='dark:bg-transparent block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-gray-400 shadow-sm ring-2 ring-inset ring-lightGray dark:ring-darkGray placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-primary dark:focus:ring-primary sm:text-sm sm:leading-6'
                            />
                        </div>
                        <div className='flex gap-1 mt-4'>
                            <Button 
                                className='w-full bg-transparent dark:text-white text-black border-2 dark:border-lightGray border-black' 
                                onClick={() => {
                                    setShowFilterModal(false)
                                    setFilters({ genre: '', status: '', type: '', tags: '', by: '' })
                                }}
                            >
                                Reset Filter(s)
                            </Button>
                            <Button className='w-full bg-black dark:bg-white dark:text-black' onClick={() => setShowFilterModal(false)}>Apply Filter(s)</Button>
                        </div>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    )
}
