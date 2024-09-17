import { useEffect, useRef, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { Alert, Button, Modal, TextInput } from 'flowbite-react'
import { 
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage'
import { app } from '../../firebase'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import {
    updateStart,
    updateSuccess,
    updateFailure,
    signOutSuccess,
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess,
} from '../../redux/user/userSlice'
import { HiOutlineExclamationCircle } from 'react-icons/hi'

const customTheme = {
    field: {
        input: {
            colors: {
                info: 'dark:bg-transparent border-0 text-darkGray dark:text-lightGray ring-2 ring-inset ring-lightGray dark:ring-darkGray dark:placeholder:text-lightGray placeholder:text-darkGray placeholder:opacity-60 focus:ring-2 focus:ring-inset focus:ring-primary dark:focus:ring-primary'
            },
        },
    },
}

export default function DashProfile() {
    const { currentUser, error, loading } = useSelector((state) => state.user)
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null)
    const [imageFileUploadError, setImageFileUploadError] = useState(null)
    const [imageFileUploading, setImageFileUploading] = useState(false)
    const [updateUserSuccess, setUpdateUserSuccess] = useState(null)
    const [updateUserError, setUpdateUserError] = useState(null)
    const [showModal, setShowModal] = useState(false)
    const [formData, setFormData] = useState({})
    const filePickerRef = useRef()
    const dispatch = useDispatch()

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImageFile(file)
            setImageFileUrl(URL.createObjectURL(file))
        }
    }

    useEffect(() => {
        if (imageFile) {
            uploadImage()
        }
    }, [imageFile])

    const uploadImage = async () => {
        setImageFileUploading(true)
        setImageFileUploadError(null)

        const storage = getStorage(app)
        const fileName = new Date().getTime() + imageFile.name
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, imageFile)

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100

                setImageFileUploadProgress(progress.toFixed(0))
            },
            (error) => {
                setImageFileUploadError('Could not upload image (File must be less than 2MB)')
                setImageFileUploadProgress(null)
                setImageFile(null)
                setImageFileUrl(null)
                setImageFileUploading(false)
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL)
                    setFormData({ ...formData, profilePicture: downloadURL })
                    setImageFileUploading(false)
                })
            }
        )
    }

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setUpdateUserError(null)
        setUpdateUserSuccess(null)

        if (Object.keys(formData).length === 0) {
            setUpdateUserError('No changes made')
            return
        }
        if (imageFileUploading) {
            setUpdateUserError('Please wait for image to uplaod')
            return
        }

        try {
            dispatch(updateStart())

            const res = await fetch(`/api/user/update/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            const data = await res.json()
            if (!res.ok) {
                dispatch(updateFailure(data.message))
                setUpdateUserError(data.message)
            } else {
                dispatch(updateSuccess(data))
                setUpdateUserSuccess('Profile updated successfully!')
                setImageFileUploadProgress(null)
            }
        } catch (error) {
            dispatch(updateFailure(error.message))
            setUpdateUserError(error.message)
        }
    }

    const handleSignout = async () => {
        try {
            const res = await fetch('/api/user/signout', {
                method: 'POST',
            })
            const data = await res.json()

            if (!res.ok) {
                console.log(data.message)
            } else {
                dispatch(signOutSuccess())
            }
        } catch (error) {
            console.log(error.message)
        }
    }

    const handleDeleteUser = async () => {
        setShowModal(false)

        try {
            dispatch(deleteUserStart())

            const res = await fetch(`/api/user/delete/${currentUser._id}`, {
                method: 'DELETE',
            })
            const data = await res.json()

            if (!res.ok) {
                dispatch(deleteUserFailure(data.message))
            } else {
                dispatch(deleteUserSuccess(data))
            }
        } catch (error) {
            dispatch(deleteUserFailure(error.message))
        }
    }

    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-semibold text-4xl pb-2'>Profile</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-6'>
                <input 
                    type='file'
                    accept='image/*'
                    onChange={handleImageChange}
                    ref={filePickerRef}
                    hidden
                />
                <div 
                    className='relative w-32 h-32 self-center cursor-pointer shadow-xs overflow-hidden rounded-full'
                    onClick={() => filePickerRef.current.click()}    
                >
                    {imageFileUploadProgress && (
                        <CircularProgressbar 
                            value={imageFileUploadProgress || 0}
                            strokeWidth={5}
                            styles={{
                                root: {
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                },
                                path: {
                                    stroke: `rgba(114, 76, 249, ${
                                        imageFileUploadProgress / 100
                                    })`,
                                },
                            }}
                        />
                    )}
                    <img 
                        src={imageFileUrl || currentUser.profilePicture}
                        alt='user'
                        className={`rounded-full w-full h-full object-cover border-2 border-[#eee] dark:border-darkGray ${
                            imageFileUploadProgress &&
                            imageFileUploadProgress < 100 &&
                            'opacity-70'
                        }`}
                    />
                </div>
                {imageFileUploadError && (
                    <Alert color='failure'>{imageFileUploadError}</Alert>
                )}
                {/* <TextInput 
                    type='text'
                    id='username'
                    placeholder='username'
                    defaultValue={currentUser.username}
                    onChange={handleChange}
                /> */}
                <TextInput 
                    type='email'
                    id='email'
                    placeholder='email'
                    defaultValue={currentUser.email}
                    onChange={handleChange}
                    className='pt-4'
                    theme={customTheme}
                    color='info'
                />
                <TextInput 
                    type='password'
                    id='password'
                    placeholder='password'
                    onChange={handleChange}
                    theme={customTheme}
                    color='info'
                />
                <Button
                    type='submit'
                    className='bg-black dark:bg-white text-white dark:text-black mt-4'
                    disabled={loading || imageFileUploading}
                >
                    {loading ? 'Loading...' : 'Save Changes'}
                </Button>
            </form>
            <div className='text-primary flex justify-between mt-6'>
                <span onClick={() => setShowModal(true)} className='cursor-pointer'>
                    Delete Account
                </span>
                <span onClick={handleSignout} className='cursor-pointer'>
                    Sign Out
                </span>
            </div>
            {updateUserSuccess && (
                <Alert color='success' className='mt-5'>
                    {updateUserSuccess}
                </Alert>
            )}
            {updateUserError && (
                <Alert color='failure' className='mt-5'>
                    {updateUserError}
                </Alert>
            )}
            {error && (
                <Alert color='failure' className='mt-5'>
                    {error}
                </Alert>
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
                        <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto' />
                        <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>
                            Are you sure you want to delete your account?
                        </h3>
                        <div className='flex justify-center gap-4'>
                            <Button color='failure' onClick={handleDeleteUser}>
                                Yes
                            </Button>
                            <Button color='gray' onClick={() => setShowModal(false)}>
                                Cancel
                            </Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}