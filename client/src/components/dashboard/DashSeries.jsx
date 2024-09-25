import { Drawer, Modal, Table, Button } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'

// TODO: move TABLE into its own reusble component

const customTheme = {
    head: {
        base: 'font-normal',
        cell: {
            base: 'px-10 py-6'
        }
    },
    body: {
        cell: {
            base: 'px-10 py-6'
        }
    }
}

export default function DashSeries() {
    const { currentUser } = useSelector((state) => state.user)
    const [userSeries, setUserSeries] = useState([])
    const [showForm, setShowForm] = useState(false)
    const [showModal, setShowModal] = useState(false)

    useEffect(() => {
        const fetchSeries = async () => {
            try {
                const res = await fetch(`/api/tracker/get-trackers?userId=${currentUser._id}&category=Series`)
                const data = await res.json()

                if (res.ok) {
                    setUserSeries(data.trackers)

                    // if (data.trackers.length < 10) {

                    // }
                }
            } catch (error) {
                console.log(error.message)
            }
        }

        fetchSeries()
    }, [currentUser._id])

    return (
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
            {userSeries.length > 0 ? (
                <>
                    <Table className='border-lightGray dark:border-darkGray border rounded-md' theme={customTheme}>
                        <Table.Head className='border-b border-b-lightGray dark:border-b-darkGray font-normal'>
                            <Table.HeadCell className='bg-transparent dark:bg-transparent dark:text-lightGray'>Title</Table.HeadCell>
                            <Table.HeadCell className='bg-transparent dark:bg-transparent dark:text-lightGray'>By</Table.HeadCell>
                            <Table.HeadCell className='bg-transparent dark:bg-transparent dark:text-lightGray'>Genre(s)</Table.HeadCell>
                            <Table.HeadCell className='bg-transparent dark:bg-transparent dark:text-lightGray'>Status</Table.HeadCell>
                            <Table.HeadCell className='bg-transparent dark:bg-transparent dark:text-lightGray whitespace-nowrap'>Date Started</Table.HeadCell>
                            <Table.HeadCell className='bg-transparent dark:bg-transparent dark:text-lightGray whitespace-nowrap'>Date Completed</Table.HeadCell>
                            <Table.HeadCell className='bg-transparent dark:bg-transparent dark:text-lightGray'>Rating</Table.HeadCell>
                            <Table.HeadCell className='bg-transparent dark:bg-transparent dark:text-lightGray'>Tags</Table.HeadCell>
                            <Table.HeadCell className='bg-transparent dark:bg-transparent dark:text-lightGray'>Notes</Table.HeadCell>
                            <Table.HeadCell>
                                <span className="sr-only">Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                        {userSeries.map((series) => (
                            <Table.Body className='divide-y' key={series._id}>
                                <Table.Row className='bg-transparent'>
                                    <Table.Cell className='whitespace-nowrap font-medium'>
                                        {series.title}
                                    </Table.Cell>
                                    <Table.Cell className='whitespace-nowrap font-medium'>
                                        {series.by}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {(series.genres).map((genre) => (genre + ' '))}
                                    </Table.Cell>
                                    <Table.Cell className='whitespace-nowrap font-medium'>
                                      <p className={`text-xs rounded-full px-3 py-2 ${series.status  === 'Completed' ? 'dark:bg-[#337357] bg-accent text-black dark:text-white' : series.status  === 'In Progress' ? 'dark:bg-[#5E48A3] bg-primary text-black dark:text-white' : 'border-black dark:border-white border-2 dark:text-white text-black bg-transparent'} `}>{series.status}</p>
                                    </Table.Cell>
                                    <Table.Cell>
                                       {new Date(series.dateStarted).toLocaleDateString()}
                                    </Table.Cell>
                                    <Table.Cell>
                                       {new Date(series.dateCompleted).toLocaleDateString()}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {series.rating}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {(series.tags).map((tag) => (tag + ' '))}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <span className='truncate'>{series.notes}</span>
                                    </Table.Cell>
                                    <Table.Cell>
                                        <Link
                                            className='bg-black px-3 py-2 rounded-md text-white dark:bg-white dark:text-black hover:underline'
                                            to={`/update-post/${series._id}`}
                                        >
                                        <span>Edit</span>
                                        </Link>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))}
                    </Table>
                </>
            ) : (
                <p>You have not added any series yet.</p>
            )}
        </div>
    )
}