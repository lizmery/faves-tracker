import { Table, Drawer, Modal, Button } from 'flowbite-react'
import { useSelector } from 'react-redux'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { FaEdit, FaTrashAlt } from 'react-icons/fa'
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

export default function TrackerTable({ userTrackers, trackerCategory }) {
    const { currentUser } = useSelector((state) => state.user)
    const [openDrawer, setOpenDrawer] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [tracker, setTracker] = useState({})

    const handleClose = () => setOpenDrawer(false)

    const handleDeleteTracker = async () => {
        try {
            const res = await fetch(`/api/tracker/delete/${tracker._id}/${currentUser._id}`, {
                method: 'DELETE',
            })
            const data = await res.json()
            
            if (res.ok) {
                setShowModal(false)
                setTracker({})

            }
        } catch (error) {

        }
    }

    return (
        <div className='overflow-x-scroll dark:border-darkGray border rounded-lg table-auto md:mx-auto scrollbar scrollbar-track-transparent scrollbar-thumb-[#F5F5F5] dark:scrollbar-thumb-darkGray'>
            {userTrackers.length > 0 ? (
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
                                <span className="sr-only">Actions</span>
                            </Table.HeadCell>
                        </Table.Head>
                        {userTrackers.map((tracker) => (
                            <Table.Body className='divide-y' key={tracker._id}>
                                <Table.Row className='bg-transparent'>
                                    <Table.Cell className='lg:whitespace-nowrap lg:font-medium cursor-pointer' onClick={() => {setOpenDrawer(true); setTracker(tracker)}}>
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
                                    <Table.Cell className='flex flex-row gap-3 justify-center items-center'>
                                        {/* <Button
                                            className='bg-black rounded-md text-white dark:bg-white dark:text-black hover:underline'
                                            onClick={() => {setOpenDrawer(true); setTracker(tracker)}}
                                            size='xs'
                                        >
                                        <span>Edit</span>
                                        </Button> */}
                                      
                                            <FaEdit className='text-black lg:text-lg dark:text-white cursor-pointer' onClick={() => {setOpenDrawer(true); setTracker(tracker)}} />
                                       
                                       
                                            <FaTrashAlt className='text-black lg:text-lg dark:text-white cursor-pointer' onClick={() => {setShowModal(true); setTracker(tracker)}} />
                                        
                                    </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))}
                    </Table>
                    <Drawer 
                        open={openDrawer} 
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
            <Modal
                show={showModal}
                onClose={() => setShowModal(false)}
                popup
                size='md'
            >
                <Modal.Header />
                <Modal.Body>
                <div className='text-center'>
                    <HiOutlineExclamationCircle className='h-14 w-14 text-red-400 mb-4 mx-auto' />
                    <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                    Are you sure you want to delete {tracker.title}?
                    </h3>
                    <div className='flex justify-center gap-4'>
                    <Button className='bg-black dark:bg-white border-2' onClick={handleDeleteTracker}>
                        Delete
                    </Button>
                    <Button className='border-black border-2 text-black dark:border-grayLine dark:text-white' onClick={() => setShowModal(false)}>
                        Cancel
                    </Button>
                    </div>
                </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}