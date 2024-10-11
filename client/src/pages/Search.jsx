import { Button, Select, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import TrackerCard from '../components/dashboard/tracker/TrackerCard'

const customTheme = {
    field: {
        input: {
            colors: {
                gray: 'dark:bg-transparent border-0 text-darkGray dark:text-lightGray ring-2 ring-inset ring-lightGray dark:ring-darkGray dark:placeholder:text-lightGray placeholder:text-darkGray placeholder:opacity-60 focus:ring-2 focus:ring-inset focus:ring-primary dark:focus:ring-primary'
            },
        },
        select: {
            colors: {
                gray: 'dark:bg-transparent border-0 text-darkGray dark:text-lightGray ring-2 ring-inset ring-lightGray dark:ring-darkGray dark:placeholder:text-lightGray placeholder:text-darkGray placeholder:opacity-60 focus:ring-2 focus:ring-inset focus:ring-primary dark:focus:ring-primary',
            },
        },
    },
}

export default function Search() {
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        sort: 'desc',
        category: ''
    })

    console.log(sidebarData)

    const [trackers, setTrackers] = useState([])
    const [loading, setLoading] = useState(false)
    const [showMore, setShowMore] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const searchTermFromUrl = urlParams.get('searchTerm')
        const sortFromUrl = urlParams.get('sort')
        const categoryFromUrl = urlParams.get('category')

        if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
            setSidebarData({
                ...sidebarData,
                searchTerm: searchTermFromUrl,
                sort: sortFromUrl,
                category: categoryFromUrl,
            })
        }

        const fetchTrackers = async () => {
            setLoading(true)
            const searchQuery = urlParams.toString()
            const res = await fetch(`/api/tracker/get-trackers?${searchQuery}`)

            if (res.ok) {
                const data = await res.json()

                setTrackers(data.trackers)
                setLoading(false)

                if (data.trackers.length === 10) {
                    setShowMore(true)
                } else {
                    setShowMore(false)
                }
            } else {
                setLoading(false)

                return
            }
        }
        fetchTrackers()
    }, [location.search])

    const handleChange = (e) => {
        if (e.target.id === 'searchTerm') {
            setSidebarData({ ...sidebarData, searchTerm: e.target.value })
        }
        if (e.target.id === 'sort') {
            const order = e.target.value || 'desc'
            setSidebarData({ ...sidebarData, sort: order })
        }
        if (e.target.id === 'category') {
            setSidebarData({ ...sidebarData, category: e.target.value })
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        const urlParams = new URLSearchParams(location.search)
        urlParams.set('searchTerm', sidebarData.searchTerm)
        urlParams.set('sort', sidebarData.sort)
        urlParams.set('category', sidebarData.category)
        const searchQuery = urlParams.toString()

        navigate(`/search?${searchQuery}`)
    }

    const handleShowMore = async () => {
        const totalTrackers = trackers.length
        const startIndex = totalTrackers
        const urlParams = new URLSearchParams(location.search)
        urlParams.set('startIndex', startIndex)
        const searchQuery = urlParams.toString()
        const res = await fetch(`/api/tracker/get-trackers?${searchQuery}`)

        if (res.ok) {
            const data = await res.json()
            setTrackers([...trackers, ...data.trackers])

            if (data.trackers.length === 10) {
                setShowMore(true)
            } else {
                setShowMore(false)
            }
        } else {
            return
        }
    }

    return (
        <div className='flex flex-col md:flex-row gap-8'>
            <div className='p-7 border-b md:border-r md:min-h-screen border-lightGray dark:border-darkGray'>
                <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-2'>
                        <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                        <TextInput 
                            placeholder='Search...'
                            id='searchTerm'
                            type='text'
                            value={sidebarData.searchTerm}
                            onChange={handleChange}
                            color='gray'
                            theme={customTheme}
                        />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold'>Sort:</label>
                        <Select
                            onChange={handleChange}
                            value={sidebarData.sort}
                            id='sort'
                            color='gray'
                            theme={customTheme}
                        >
                            <option></option>
                            <option value='desc'>Latest</option>
                            <option value='asc'>Oldest</option>
                        </Select>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <label className='font-semibold'>Category:</label>
                        <Select
                            onChange={handleChange}
                            value={sidebarData.category}
                            id='category'
                            color='gray'
                            theme={customTheme}
                        >
                            <option></option>
                            <option value='Series'>Series</option>
                            <option value='Books'>Books</option>
                            <option value='Movies'>Movies</option>
                        </Select>
                    </div>
                    <Button
                        type='submit'
                        className='bg-black dark:bg-white text-white dark:text-black mt-4'
                    >
                        Apply Filters
                    </Button>
                </form>
            </div>
            <div className='w-full flex flex-col gap-8'>
                <h1 className='text-3xl font-bold'>Results:</h1>
                <div className='flex flex-col md:flex-row gap-4 lg:gap-5 w-full flex-wrap p-4 mb-4'>
                    {!loading && trackers.length === 0 && (
                        <p>No results found.</p>
                    )}

                    {loading && <p>Loading...</p>}

                    {!loading && trackers && trackers.map((tracker) => (
                        <TrackerCard  tracker={tracker} key={tracker._id} />
                    ))}

                    {showMore && (
                        <Button
                            onClick={handleShowMore}
                            className='bg-transparent dark:text-white text-black border-2 dark:border-lightGray border-black'
                        >
                            Show More
                        </Button>
                    )}
                </div>
            </div>
        </div>
    )
}