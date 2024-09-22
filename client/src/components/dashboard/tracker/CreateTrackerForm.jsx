import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TextInput, Select, Button, Alert } from 'flowbite-react'

// TODO: if category = 'other' --> add text input for user to add a new category

export default function CreateTrackerForm() {
    const [formData, setFormData] = useState({})
    const [publishError, setPublishError] = useState(null)
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
                // navigate(`/`)
            }
        } catch (error) {
            setPublishError('Something went wrong. Please try again.')
        }
    }

    return (
        <div className=''>
            <h1 className='text-3xl font-semibold'>Create Tracker</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
                <div className='flex flex-col gap-4 md:flex-row justify-between'>
                    <TextInput 
                        type='text'
                        placeholder='Title'
                        required
                        id='title'
                        className='flex-1'
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                     <Select
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        id='category'
                    >
                        <option value='Movie'>Movie</option>
                        <option value='TV Show'>TV Show</option>
                        <option value='Book'>Book</option>
                        <option value='Music'>Music</option>
                        <option value='Anime'>Anime</option>
                        <option value='Manga'>Manga</option>
                        <option value='Other'>Other</option>
                    </Select>
                    <TextInput 
                        type='text'
                        placeholder='Genre'
                        required
                        id='genre'
                        className='flex-1'
                        onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                    />
                    <Select
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        id='status'
                    >
                        <option value='Not Started'>Have Not Started</option>
                        <option value='In Progress'>In Progress</option>
                        <option value='Completed'>Completed</option>
                    </Select>
                    <TextInput 
                        type='text'
                        placeholder='By (optional)'
                        id='by'
                        className='flex-1'
                        onChange={(e) => setFormData({ ...formData, by: e.target.value })}
                    />
                    <TextInput 
                        type='number'
                        placeholder='Rating (1-10)'
                        id='rating'
                        className='flex-1'
                        onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                    />
                    <TextInput 
                        type='date'
                        placeholder='Date Started (optional)'
                        id='dateStarted'
                        className='flex-1'
                        onChange={(e) => setFormData({ ...formData, dateStarted: e.target.value })}
                    />
                    <TextInput 
                        type='date'
                        placeholder='Date Completed (optional)'
                        id='dateCompleted'
                        className='flex-1'
                        onChange={(e) => setFormData({ ...formData, dateCompleted: e.target.value })}
                    />
                    <TextInput 
                        type='text'
                        placeholder='Tags (separated by a coma)'
                        id='tags'
                        className='flex-1'
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                    />
                    <ReactQuill 
                        theme='snow'
                        placeholder='Enter notes here...'
                        className='h-72 mb-12'
                        onChange={(value) => { setFormData({ ...formData, notes: value }) }}
                    />
                    <Button type='submit'>Create</Button>
                    {publishError && (
                        <Alert className='mt-5' color='failure'>{publishError}</Alert>
                    )}
                </div>
            </form>
        </div>
    )
}