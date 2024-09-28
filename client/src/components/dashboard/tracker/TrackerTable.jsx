import { Table, Drawer } from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import TrackerDetails from './TrackerDetails'

const tableTheme = {
    head: {
        base: 'font-normal',
        cell: {
            base: 'lg:px-8 lg:py-6 p-4 2xl:px-16'
        }
    },
    body: {
        cell: {
            base: 'lg:px-8 lg:py-6 p-4 2xl:px-16'
        }
    },
    root: {
        base: 'text-left lg:text-sm text-xs'
    }
}

const drawerTheme = {
    root: {
        position: {
            right: {
                'on': 'right-0 top-0 h-screen lg:w-[35rem] w-80 transform-none',
                'off': 'right-0 top-0 h-screen lg:w-[35rem] w-80 translate-x-full',
            },
        },
    },
    header: {
        inner: {
            titleText: 'mb-4 inline-flex items-center text-base font-semibold text-lg'
        }
    }
}

export default function TrackerTable({ userData, trackerCategory }) {
    const [isOpen, setIsOpen] = useState(false)
    const [tracker, setTracker] = useState({})
    const handleClose = () => setIsOpen(false)

    return (
        <div className='overflow-x-scroll dark:border-darkGray border rounded-lg table-auto md:mx-auto scrollbar scrollbar-track-transparent scrollbar-thumb-[#F5F5F5] dark:scrollbar-thumb-darkGray'>
            {userData.length > 0 ? (
                <>
                    <Table className='rounded-lg' theme={tableTheme}>
                        <Table.Head className='border-b  dark:border-b-darkGray font-normal'>
                            <Table.HeadCell className='bg-transparent dark:bg-transparent dark:text-lightGray'>Title</Table.HeadCell>
                            <Table.HeadCell className='bg-transparent dark:bg-transparent dark:text-lightGray'>By</Table.HeadCell>
                            <Table.HeadCell className='bg-transparent dark:bg-transparent dark:text-lightGray'>Genre(s)</Table.HeadCell>
                            <Table.HeadCell className='bg-transparent dark:bg-transparent dark:text-lightGray'>Status</Table.HeadCell>
                            <Table.HeadCell className='bg-transparent dark:bg-transparent dark:text-lightGray'>Rating</Table.HeadCell>
                            <Table.HeadCell className='bg-transparent dark:bg-transparent dark:text-lightGray'>Type</Table.HeadCell>
                            <Table.HeadCell className='bg-transparent dark:bg-transparent dark:text-lightGray'>Tags</Table.HeadCell>
                            {/* <Table.HeadCell className='bg-transparent dark:bg-transparent dark:text-lightGray'>Notes</Table.HeadCell> */}
                            <Table.HeadCell>
                                <span className="sr-only">Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                        {userData.map((tracker) => (
                            <Table.Body className='divide-y' key={tracker._id}>
                                <Table.Row className='bg-transparent'>
                                    <Table.Cell className='lg:whitespace-nowrap lg:font-medium cursor-pointer' onClick={() => {setIsOpen(true); setTracker(tracker)}}>
                                        {tracker.title}
                                    </Table.Cell>
                                    <Table.Cell className='lg:whitespace-nowrap lg:font-medium'>
                                        {tracker.by}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {(tracker.genres).map((genre) => (genre + ' '))}
                                    </Table.Cell>
                                    <Table.Cell className='whitespace-nowrap font-medium'>
                                      <p className={`lg:text-xs text-[.70rem] rounded-full lg:px-3 lg:py-2 px-2 py-1 ${tracker.status  === 'Completed' ? 'bg-lightGreen dark:bg-accent text-black' : tracker.status  === 'In Progress' ? ' bg-lightPurple dark:bg-primary text-black' : 'bg-black text-white opacity-60 dark:bg-white dark:text-black'} `}>{tracker.status}</p>
                                    </Table.Cell>
                                    {/* <Table.Cell>
                                       {new Date(tracker.dateStarted).toLocaleDateString()}
                                    </Table.Cell>
                                    <Table.Cell>
                                       {new Date(tracker.dateCompleted).toLocaleDateString()}
                                    </Table.Cell> */}
                                    <Table.Cell>
                                        {tracker.rating}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {tracker.type}
                                    </Table.Cell>
                                    <Table.Cell>
                                        {(tracker.tags).map((tag) => (tag + ', '))}
                                    </Table.Cell>
                                    {/* <Table.Cell>
                                        <span className='truncate'>{tracker.notes}</span>
                                    </Table.Cell> */}
                                    <Table.Cell>
                                        <Link
                                            className='bg-black px-3 py-2 rounded-md text-white dark:bg-white dark:text-black hover:underline'
                                            to={`/update-tracker/${tracker._id}`}
                                        >
                                        <span>Edit</span>
                                        </Link>
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))}
                    </Table>
                    <Drawer 
                        open={isOpen} 
                        onClose={handleClose} 
                        position='right' 
                        className='z-[100] dark:bg-bgDark' 
                        theme={drawerTheme}
                    >
                        <TrackerDetails tracker={tracker} />
                    </Drawer>
                </>
            ) : (
                <p>You have not added any {trackerCategory} yet.</p>
            )}
        </div>
    )
}