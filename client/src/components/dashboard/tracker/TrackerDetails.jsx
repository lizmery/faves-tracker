import { Drawer, TextInput, Select, Button, Alert, Label, Textarea, FileInput } from 'flowbite-react'
import { PiListMagnifyingGlassBold } from 'react-icons/pi'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
    deleteObject,
} from 'firebase/storage'
import { app } from '../../../firebase'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { inputTheme, fileInputTheme, textareaTheme } from '../../../flowbiteThemes/customThemes'

export default function TrackerDetails({ tracker, onClose }) {
    const { currentUser } = useSelector((state) => state.user)
    const [formData, setFormData] = useState({})
    const [publishError, setPublishError] = useState(null)
    const [success, setSuccess] = useState(false)
    const [file, setFile] = useState(null)
    const [imageUploadProgress, setImageUploadProgress] = useState(null)
    const [imageUploadError, setImageUploadError] = useState(null)
    const apiUrl = import.meta.env.VITE_API_URL

    const progressLabels = {
        Series: { current: 'Episodes Watched', total: 'Total Episodes'},
        Movies: { current: 'Minutes Watched', total: 'Total Runtime (mins)'},
        Books: {current: 'Pages Read', total: 'Total Pages'}
    }

    const { 
        current: currentLabel, 
        total: totalLabel
    } = progressLabels[tracker.category] || { current: 'Current Progress', total: 'Total Count'}

    const handleUploadImage = async () => {
        try {
            if (!file) {
                setImageUploadError('Please select an image')
                return
            }

            setImageUploadError(null)
            const storage = getStorage(app)

            if (tracker.image) {
                const prevImageRef = ref(storage, tracker.image)

                await deleteObject(prevImageRef).catch((error) => {
                    console.error('Failed to delete previous image: ', error)
                })
            }

            const fileName = new Date().getTime() + '-' + file.name
            const storageRef = ref(storage, fileName)
            const uploadTask = uploadBytesResumable(storageRef, file)

            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                    setImageUploadProgress(progress.toFixed(0))
                },
                (error) => {
                    setImageUploadError('Image failed to upload')
                    setImageUploadProgress(null)
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        setImageUploadProgress(null)
                        setImageUploadError(null)
                        setFormData({ ...formData, image: downloadURL })
                    })
                }
            )
        } catch (error) {
            setImageUploadError('Image failed to upload')
            setImageUploadProgress(null)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch(`${apiUrl}/api/tracker/update/${tracker._id}/${currentUser._id}`, {
                method: 'PUT',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            const data = await res.json()
            
            if (!res.ok) {
                setPublishError(data.message)
                return
            } else {
                setPublishError(null)
                setSuccess(true)
                onClose()
                setSuccess(null)

                window.location.reload()
            }
        } catch (error) {
            setPublishError('Something went wrong. Please try again.')
        }
    }

    return (
        <>
            <Drawer.Header title='Edit Details' titleIcon={PiListMagnifyingGlassBold} />
            <Drawer.Items>
            <form className='' onSubmit={handleSubmit}>
                <div className="mb-6 mt-3">
                    <Label htmlFor="title" className="mb-2 block">
                        Title
                    </Label>
                    <TextInput 
                        type='text'
                        placeholder='Title'
                        required
                        id='title'
                        className='flex-1'
                        defaultValue={tracker?.title || ''}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        theme={inputTheme}
                        color='gray'
                    />
                </div>
                <div className="mb-6">
                    <Label htmlFor="category" className="mb-2 block">
                        Category
                    </Label>
                    <Select
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        id='category'
                        value={tracker?.category || ''}
                        theme={inputTheme}
                        color='gray'
                    >
                        <option></option>
                        <option value='Series'>Series</option>
                        <option value='Books'>Books</option>
                        <option value='Movies'>Movies</option>
                    </Select>
                </div>
                <div className="mb-6 mt-3">
                    <Label htmlFor="subcategory" className="mb-2 block">
                        Subcategory
                    </Label>
                    <TextInput 
                        type='text'
                        placeholder='Subcategory'
                        required
                        id='subcategory'
                        className='flex-1'
                        defaultValue={tracker?.subcategory || ''}
                        onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                        theme={inputTheme}
                        color='gray'
                    />
                </div>
                <div className="mb-6">
                    <Label htmlFor="genre" className="mb-2 block">
                        Genre(s)
                    </Label>
                    <TextInput 
                        type='text'
                        placeholder='Genre(s)'
                        required
                        id='genres'
                        className='flex-1'
                        defaultValue={tracker?.genres || ''}
                        onChange={(e) => setFormData({ ...formData, genres: e.target.value })}
                        theme={inputTheme}
                        color='gray'
                    />
                </div>
                <div className="mb-6">
                    <Label htmlFor="status" className="mb-2 block">
                        Status
                    </Label>
                    <Select
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        id='status'
                        value={tracker?.status || ''}
                        theme={inputTheme}
                        color='gray'
                    >
                        <option></option>
                        <option value='Not Started'>Have Not Started</option>
                        <option value='In Progress'>In Progress</option>
                        <option value='Completed'>Completed</option>
                        <option value='Dropped'>Dropped</option>
                    </Select>
                </div>
                <div className="mb-6">
                    <Label htmlFor="by" className="mb-2 block">
                        By
                    </Label>
                    <TextInput 
                        type='text'
                        placeholder='ex: Author, Producer, etc...'
                        id='by'
                        className='flex-1'
                        defaultValue={tracker?.by || ''}
                        onChange={(e) => setFormData({ ...formData, by: e.target.value })}
                        theme={inputTheme}
                        color='gray'
                    />
                </div>
                <div className="mb-6">
                    <Label htmlFor="rating" className="mb-2 block">
                        Rating
                    </Label>
                    <TextInput 
                        type='number'
                        placeholder='1 - 10'
                        id='rating'
                        className='flex-1'
                        defaultValue={tracker?.rating || ''}
                        onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                        theme={inputTheme}
                        color='gray'
                    />
                </div>
                <div className="mb-6">
                    <Label htmlFor="dateStarted" className="mb-2 block">
                        Date Started
                    </Label>
                    <TextInput 
                        type='date'
                        id='dateStarted'
                        className='flex-1'
                        defaultValue={tracker.dateStarted ? new Date(tracker.dateStarted).toISOString().split('T')[0] : ''}
                        onChange={(e) => setFormData({ ...formData, dateStarted: e.target.value })}
                        theme={inputTheme}
                        color='gray'
                    />
                </div>
                <div className="mb-6">
                    <Label htmlFor="dateCompleted" className="mb-2 block">
                        Date Completed
                    </Label>
                    <TextInput 
                        type='date'
                        id='dateCompleted'
                        className='flex-1'
                        defaultValue={tracker.dateCompleted ? new Date(tracker.dateCompleted).toISOString().split('T')[0] : ''}
                        onChange={(e) => setFormData({ ...formData, dateCompleted: e.target.value })}
                        theme={inputTheme}
                        color='gray'
                    />
                </div>
                <div className="mb-6">
                    <Label htmlFor="currentProgress" className="mb-2 block">
                        {currentLabel}
                    </Label>
                    <TextInput 
                        type='number'
                        min='0'
                        placeholder={currentLabel}
                        id='currentProgress'
                        className='flex-1'
                        defaultValue={tracker.progress?.current || 0}
                        onChange={(e) => setFormData({ 
                            ...formData, 
                            progress: { ...tracker.progress, current: Number(e.target.value) }
                        })}
                        theme={inputTheme}
                        color='gray'
                    />
                </div>
                <div className="mb-6">
                    <Label htmlFor="totalProgress" className="mb-2 block">
                        {totalLabel}
                    </Label>
                    <TextInput 
                        type='number'
                        min='0'
                        placeholder={totalLabel}
                        id='totalProgress'
                        className='flex-1'
                        defaultValue={tracker.progress?.total || 0}
                        onChange={(e) => setFormData({ 
                            ...formData, 
                            progress: { ...tracker.progress, total: Number(e.target.value) }
                        })}
                        theme={inputTheme}
                        color='gray'
                    />
                </div>
                <div className="mb-6">
                    <Label htmlFor="tags" className="mb-2 block">
                        Tags
                    </Label>
                    <TextInput 
                        type='text'
                        placeholder='tag1, tag2, ...'
                        id='tags'
                        className='flex-1'
                        defaultValue={tracker.tags ? tracker.tags : ''}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        theme={inputTheme}
                        color='gray'
                    />
                </div>
                <div className="mb-8 flex flex-col">
                    <Label htmlFor="image" className="mb-2 block">
                        Image
                    </Label>
                    <div className='flex w-full justify-between items-center gap-2 mb-4'>
                        <FileInput
                            type='file'
                            accept='image/*'
                            onChange={(e) => setFile(e.target.files[0])} 
                            theme={fileInputTheme}
                            color='gray'
                            className='w-full'
                        />
                        <Button
                            type='button'
                            size='sm'
                            className='text-nowrap text-primary underline'
                            onClick={handleUploadImage}
                            disabled={imageUploadProgress}
                        >
                            {imageUploadProgress ? (
                                <div className='w-5 h-5'>
                                    <CircularProgressbar
                                        value={imageUploadProgress}
                                    />
                                </div>
                            ) : 'Upload Image'}
                        </Button>
                    </div>
                    {imageUploadError && <Alert color='failure'>{imageUploadError}</Alert>}
                    {formData.image ? (
                        <img 
                            src={formData.image}
                            alt='media tracker image'
                            className='w-full h-72 object-contain'
                        />
                    ) :  tracker.image ? (
                        <img 
                            src={tracker.image}
                            alt='media tracker image'
                            className='w-full h-72 object-contain'
                        />
                    ) : ''}
                </div>
                <div className="mb-8">
                    <Label htmlFor="notes" className="mb-2 block">
                        Notes
                    </Label>
                    <Textarea 
                        htmlFor='notes' 
                        onChange={(e) => { setFormData({ ...formData, notes: e.target.value }) }} 
                        placeholder='Enter notes here...'
                        className='h-60 pb-12'
                        defaultValue={tracker.notes}
                        theme={textareaTheme}
                    />
                </div>
            
                <div className='mt-6'>
                    {success && (
                        <Alert className='mt-5' color='success'>Success!</Alert>
                    )}
                    {publishError && (
                        <Alert className='mt-5' color='failure'>{publishError}</Alert>
                    )}
                    <Button type='submit' className='bg-black w-full mt-5 dark:bg-white dark:text-black hover:bg-transparent hover:border-black hover:text-black mb-8'>Update</Button>
                </div>
            </form>
            </Drawer.Items>
      </>
    )
}