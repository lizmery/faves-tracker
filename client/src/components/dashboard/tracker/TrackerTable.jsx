import { Table } from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { FaCheck, FaTimes } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const customTheme = {
    head: {
        base: 'font-normal',
        cell: {
            base: 'lg:px-9 lg:py-6 p-4'
        }
    },
    body: {
        cell: {
            base: 'lg:px-9 lg:py-6 p-4'
        }
    },
    root: {
        base: 'text-left lg:text-sm text-xs'
    }
}

export default function TrackerTable({ userData, trackerType }) {
    return (
        <div className='overflow-x-scroll dark:border-darkGray border rounded-lg table-auto md:mx-auto scrollbar scrollbar-track-transparent scrollbar-thumb-[#F5F5F5] dark:scrollbar-thumb-darkGray'>
            {userData.length > 0 ? (
                <>
                    <Table className='rounded-lg' theme={customTheme}>
                        <Table.Head className='border-b  dark:border-b-darkGray font-normal'>
                            <Table.HeadCell className='bg-transparent dark:bg-transparent dark:text-lightGray'>Title</Table.HeadCell>
                            <Table.HeadCell className='bg-transparent dark:bg-transparent dark:text-lightGray'>By</Table.HeadCell>
                            <Table.HeadCell className='bg-transparent dark:bg-transparent dark:text-lightGray'>Genre(s)</Table.HeadCell>
                            <Table.HeadCell className='bg-transparent dark:bg-transparent dark:text-lightGray'>Status</Table.HeadCell>
                            <Table.HeadCell className='bg-transparent dark:bg-transparent dark:text-lightGray'>Rating</Table.HeadCell>
                            {/* <Table.HeadCell className='bg-transparent dark:bg-transparent dark:text-lightGray'>Tags</Table.HeadCell> */}
                            <Table.HeadCell className='bg-transparent dark:bg-transparent dark:text-lightGray'>Notes</Table.HeadCell>
                            <Table.HeadCell>
                                <span className="sr-only">Edit</span>
                            </Table.HeadCell>
                        </Table.Head>
                        {userData.map((tracker) => (
                            <Table.Body className='divide-y' key={tracker._id}>
                                <Table.Row className='bg-transparent'>
                                    <Table.Cell className='lg:whitespace-nowrap lg:font-medium'>
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
                                    {/* <Table.Cell>
                                        {(tracker.tags).map((tag) => (tag + ' '))}
                                    </Table.Cell> */}
                                    <Table.Cell>
                                        <span className='truncate'>{tracker.notes}</span>
                                    </Table.Cell>
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
                </>
            ) : (
                <p>You have not added any {trackerType} yet.</p>
            )}
        </div>
    )
}