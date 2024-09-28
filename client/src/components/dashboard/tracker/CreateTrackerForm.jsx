import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextInput, Select, Button, Alert, Datepicker, Label, Textarea } from 'flowbite-react'
import { HiCalendar, HiUserAdd } from "react-icons/hi";

// TODO: if category = 'other' --> add text input for user to add a new category

export default function CreateTrackerForm({ trackerCategory }) {
    const [formData, setFormData] = useState({})
    const [publishError, setPublishError] = useState(null)
    const [success, setSuccess] = useState(false)
    const navigate = useNavigate()

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
                // navigate(`/`)
            }
        } catch (error) {
            setPublishError('Something went wrong. Please try again.')
        }
    }

    return (
        <div className=''>
            <h1 className='text-center text-3xl mb-6 font-semibold'>Add {trackerCategory}</h1>
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
                    />
                </div>
                <div className="mb-6">
                    <Label htmlFor="category" className="mb-2 block">
                        Category
                    </Label>
                    <Select
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        id='category'
                    >
                        <option></option>
                        <option value='Series'>Series</option>
                        <option value='Books'>Books</option>
                        <option value='Movies'>Movies</option>
                    </Select>
                </div>
                <div className="mb-6 mt-3">
                    <Label htmlFor="type" className="mb-2 block">
                        Type
                    </Label>
                    <TextInput 
                        type='text'
                        placeholder='Type of Category (ex: Anime, Manga, etc...)'
                        required
                        id='type'
                        className='flex-1'
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
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
                    />
                </div>
                <div className="mb-6">
                    <Label htmlFor="status" className="mb-2 block">
                        Status
                    </Label>
                    <Select
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        id='status'
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
                    />
                </div>
                <div className="mb-6">
                    <Label htmlFor="dateStarted" className="mb-2 block">
                        Date Started
                    </Label>
                    {/* <Datepicker /> */}
                    <TextInput 
                        type='date'
                        id='dateStarted'
                        className='flex-1'
                        onChange={(e) => setFormData({ ...formData, dateStarted: e.target.value })}
                    />
                </div>
                <div className="mb-6">
                    <Label htmlFor="dateCompleted" className="mb-2 block">
                        Date Completed
                    </Label>
                    {/* <Datepicker /> */}
                    <TextInput 
                        type='date'
                        id='dateCompleted'
                        className='flex-1'
                        onChange={(e) => setFormData({ ...formData, dateCompleted: e.target.value })}
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
                    />
                </div>
                <div className="mb-8">
                    <Label htmlFor="notes" className="mb-2 block">
                        Notes
                    </Label>
                    <ReactQuill 
                        theme='snow'
                        placeholder='Enter notes here...'
                        className='h-60 pb-12'
                        onChange={(value) => { setFormData({ ...formData, notes: value }) }}
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
                
                {/* <Button className="w-full">
                <HiCalendar className="mr-2" />
                Create event
                </Button> */}
            </form>
        </div>
    )
}