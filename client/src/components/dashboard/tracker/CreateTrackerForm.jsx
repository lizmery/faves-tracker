import { useState } from 'react'
import { TextInput, Select, Button, Alert, Label, Textarea, FileInput } from 'flowbite-react'
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage'
import { app } from '../../../firebase'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import { inputTheme, fileInputTheme, textareaTheme } from '../../../flowbiteThemes/customThemes'

export default function CreateTrackerForm({ trackerCategory }) {
    const [formData, setFormData] = useState({})
    const [file, setFile] = useState(null)
    const [imageUploadProgress, setImageUploadProgress] = useState(null)
    const [imageUploadError, setImageUploadError] = useState(null)
    const [publishError, setPublishError] = useState(null)
    const [success, setSuccess] = useState(false)

    const handleUploadImage = async () => {
        try {
            if (!file) {
                setImageUploadError('Please select an image')
                return
            }

            setImageUploadError(null)
            const storage = getStorage(app)
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
            console.log(error)
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch('/api/tracker/create', {
                method: 'POST',
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

                window.location.reload()
            }
        } catch (error) {
            setPublishError('Something went wrong. Please try again.')
        }
    }

    return (
        <div className='dark:bg-bgDark'>
            <h1 className='text-center text-3xl mb-6 font-semibold'>Add {trackerCategory ? trackerCategory : 'Tracker'}</h1>
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
                        theme={inputTheme}
                        color='gray'
                    >
                        <option></option>
                        <option value='Not Started'>Have Not Started</option>
                        <option value='In Progress'>In Progress</option>
                        <option value='Completed'>Completed</option>
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
                        onChange={(e) => setFormData({ ...formData, dateCompleted: e.target.value })}
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
                    {formData.image && (
                        <img 
                            src={formData.image}
                            alt='media tracker image'
                            className='w-full h-72 object-contain'
                        />
                    )}
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
                        theme={textareaTheme}
                    />
                </div>
                <div className='mt-6'>
                    <Button type='submit' className='bg-black w-full mt-5 dark:bg-white'>Create</Button>
                    {success && (
                        <Alert className='mt-5' color='success'>Success!</Alert>
                    )}
                    {publishError && (
                        <Alert className='mt-5' color='failure'>{publishError}</Alert>
                    )}
                </div>
            </form>
        </div>
    )
}