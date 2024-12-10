import { Table, Drawer, Modal, Button } from 'flowbite-react'
import { useSelector } from 'react-redux'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { MdDelete, MdEdit } from 'react-icons/md'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { getStorage, ref, deleteObject } from 'firebase/storage'
import { app } from '../../../firebase'
import TrackerDetails from './TrackerDetails'
import { tableTheme, overviewTableTheme, drawerTheme } from '../../../flowbiteThemes/customThemes'

export default function TrackerTable({ userTrackers, trackerCategory }) {
    const { currentUser } = useSelector((state) => state.user)
    const [openDrawer, setOpenDrawer] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [tracker, setTracker] = useState({})
    const apiUrl = import.meta.env.VITE_API_URL

    const handleClose = () => setOpenDrawer(false)

    const handleDeleteTracker = async () => {
        try {
            if (tracker.image) {
                const storage = getStorage(app)
                const storageRef = ref(storage, tracker.image)
                await deleteObject(storageRef).catch((error) => {
                    console.error('Failed to delete previous image: ', error)
                })
            }
    
            const res = await fetch(`${apiUrl}/api/tracker/delete/${tracker._id}/${currentUser._id}`, {
                method: 'DELETE',
                credentials: 'include',
            })
            const data = await res.json()
            
            if (res.ok) {
                setShowModal(false)
                setTracker({})
                window.location.reload()
            }
        } catch (error) {
            console.log('Error deleting tracker: ', error)
        }
    }

    return (
        <div className={`overflow-x-scroll ${trackerCategory === 'media' ? '' : 'border'} dark:border-grayLine table-auto rounded-lg  md:mx-auto scrollbar scrollbar-track-transparent scrollbar-thumb-[#eee] dark:scrollbar-thumb-darkGray`}>
            {userTrackers.length > 0 ? (
                <>
                    <Table className='rounded-lg' theme={trackerCategory === 'media' ? overviewTableTheme : tableTheme}>
                        <Table.Head className={`border-b ${trackerCategory === 'media' ? 'dark:border-b-grayLine' : 'dark:border-b-darkGray'} font-normal opacity-60`}>
                            <Table.HeadCell>
                                <span className="sr-only">Tracker Image</span>
                            </Table.HeadCell>
                            <Table.HeadCell className='bg-transparent dark:bg-transparent dark:text-lightGray text-left'>Title</Table.HeadCell>
                            <Table.HeadCell className='hidden lg:table-cell bg-transparent dark:bg-transparent dark:text-lightGray'>By</Table.HeadCell>
                            <Table.HeadCell className='hidden lg:table-cell bg-transparent dark:bg-transparent dark:text-lightGray'>Genre(s)</Table.HeadCell>
                            <Table.HeadCell className='bg-transparent dark:bg-transparent dark:text-lightGray'>Status</Table.HeadCell>
                            <Table.HeadCell className={`bg-transparent dark:bg-transparent dark:text-lightGray`}>Rating</Table.HeadCell>
                            {trackerCategory === 'media' && (
                                <Table.HeadCell className='bg-transparent dark:bg-transparent dark:text-lightGray'>Category</Table.HeadCell>
                            )}
                            <Table.HeadCell className='hidden lg:table-cell bg-transparent dark:bg-transparent dark:text-lightGray'>Subcategory</Table.HeadCell>
                            {/* {trackerCategory !== 'media' && (
                                <Table.HeadCell className='hidden lg:table-cell bg-transparent dark:bg-transparent dark:text-lightGray'>Tags</Table.HeadCell>
                            )} */}
                            {trackerCategory !== 'media' && (
                                <Table.HeadCell className='hidden lg:table-cell bg-transparent dark:bg-transparent dark:text-lightGray md:whitespace-nowrap'>Date Started</Table.HeadCell>
                            )}
                            {trackerCategory !== 'media' && (
                                <Table.HeadCell className='hidden lg:table-cell bg-transparent dark:bg-transparent dark:text-lightGray md:whitespace-nowrap'>Date Completed</Table.HeadCell>
                            )}
                            <Table.HeadCell className='hidden lg:table-cell bg-transparent dark:bg-transparent dark:text-lightGray md:whitespace-nowrap'>Created Date</Table.HeadCell>
                            <Table.HeadCell>
                                <span className="sr-only">Actions</span>
                            </Table.HeadCell>
                        </Table.Head>
                        {userTrackers.map((tracker) => (
                            <Table.Body className='divide-y' key={tracker._id}>
                                <Table.Row className='bg-transparent'>
                                    <Table.Cell className='' onClick={() => {setTracker(tracker)}}>
                                        <Link to={`/tracker/${tracker._id}`}>
                                            <img src={tracker.image} className={`w-10 h-10 object-cover rounded-full ${!tracker.image ? 'border' : ''}`} alt={`${tracker.title} image`} />
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell className='lg:whitespace-nowrap lg:font-medium cursor-pointer text-left' onClick={() => {setTracker(tracker)}}>
                                        <Link to={`/tracker/${tracker._id}`}>
                                            {tracker.title}
                                        </Link>
                                    </Table.Cell>
                                    <Table.Cell className='2xl:whitespace-nowrap lg:font-medium hidden lg:table-cell'>
                                        {tracker.by}
                                    </Table.Cell>
                                    <Table.Cell className='hidden lg:table-cell'>
                                        {tracker.genres?.join(', ')}
                                    </Table.Cell>
                                    <Table.Cell className='whitespace-nowrap font-medium'>
                                        <p className={`lg:text-xs text-[.70rem] rounded-full lg:px-3 lg:py-2 px-2 py-1 ${tracker.status  === 'Completed' ? 'bg-lightGreen text-darkGreen dark:bg-accent dark:text-black' : tracker.status  === 'In Progress' ? ' bg-lightPurple text-darkPurple dark:bg-primary dark:text-black' : tracker.status  === 'Dropped' ? ' bg-lightPink text-darkPink dark:bg-lightPink dark:text-black' : 'bg-black text-white opacity-50 dark:bg-white dark:text-black'} `}>
                                            {tracker.status}
                                        </p>
                                    </Table.Cell>
                                    <Table.Cell className={``}>
                                        {tracker.rating}
                                    </Table.Cell>
                                    {trackerCategory === 'media' && (
                                        <Table.Cell>
                                            {tracker.category}
                                        </Table.Cell>
                                    )}
                                    <Table.Cell className='hidden lg:table-cell'>
                                        {tracker.subcategory}
                                    </Table.Cell>
                                    {/* {trackerCategory !== 'media' && (
                                        <Table.Cell className='hidden lg:table-cell'>
                                            {tracker.tags?.join(', ')}
                                        </Table.Cell>
                                    )} */}
                                    {trackerCategory !== 'media' && (
                                        <Table.Cell className='hidden lg:table-cell'>
                                            {tracker.dateStarted ? 
                                                new Date(tracker.dateStarted).toLocaleDateString('en-US', { timeZone: 'UTC' }) : '-'}
                                        </Table.Cell>
                                    )}
                                    {trackerCategory !== 'media' && (
                                        <Table.Cell className='hidden lg:table-cell'>
                                            {tracker.dateCompleted ? 
                                                new Date(tracker.dateCompleted).toLocaleDateString('en-US', { timeZone: 'UTC' }) : '-'}
                                        </Table.Cell>
                                    )}
                                    <Table.Cell className='hidden lg:table-cell'>
                                        {tracker.createdAt ? 
                                            new Date(tracker.createdAt).toLocaleDateString('en-US', { timeZone: 'UTC' }) : '-'}
                                    </Table.Cell>
                                    <Table.Cell className='flex flex-row gap-1 justify-center items-center'>
                                        <MdEdit className='text-black text-md lg:text-xl dark:text-white cursor-pointer' onClick={() => {setOpenDrawer(true); setTracker(tracker)}} />
                                        <MdDelete className='text-black lg:text-xl dark:text-white cursor-pointer' onClick={() => {setShowModal(true); setTracker(tracker)}} /> 
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
                        <TrackerDetails 
                            tracker={tracker} 
                            onClose={handleClose}
                        />
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
                className='z-[100]'
            >
                <Modal.Header />
                <Modal.Body>
                <div className='text-center'>
                    <HiOutlineExclamationCircle className='h-14 w-14 text-red-400 mb-4 mx-auto' />
                    <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                    Are you sure you want to delete {tracker.title}?
                    </h3>
                    <div className='flex justify-center gap-4'>
                        <Button className='bg-black dark:bg-white border' onClick={handleDeleteTracker}>
                            Delete
                        </Button>
                        <Button className='border-black border text-black dark:border-grayLine dark:text-white' onClick={() => setShowModal(false)}>
                            Cancel
                        </Button>
                    </div>
                </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}