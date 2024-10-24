import { Drawer, TextInput, Select, Button, Alert, Datepicker, Label, Textarea } from 'flowbite-react'
import { PiListMagnifyingGlassBold } from 'react-icons/pi'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const customTheme = {
    field: {
        input: {
            colors: {
                info: 'dark:bg-transparent border-0 text-darkGray dark:text-lightGray ring-1 ring-inset ring-lightGray dark:ring-grayLine dark:placeholder:text-lightGray placeholder:text-darkGray placeholder:opacity-60 focus:ring-1 focus:ring-inset focus:ring-primary dark:focus:ring-primary',
            },
        },
        select: {
            colors: {
                info: 'dark:bg-transparent border-0 text-darkGray dark:text-lightGray ring-1 ring-inset ring-lightGray dark:ring-grayLine dark:placeholder:text-lightGray placeholder:text-darkGray placeholder:opacity-60 focus:ring-1 focus:ring-inset focus:ring-primary dark:focus:ring-primary',
            },
        }
    },
}


export default function TrackerDetails({ tracker }) {
    const { currentUser } = useSelector((state) => state.user)
    const [formData, setFormData] = useState({})
    const [publishError, setPublishError] = useState(null)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch(`/api/tracker/update/${tracker._id}/${currentUser._id}`, {
                method: 'PUT',
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
                        theme={customTheme}
                        color='info'
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
                        theme={customTheme}
                        color='info'
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
                        defaultValue={tracker?.type || ''}
                        onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        theme={customTheme}
                        color='info'
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
                        theme={customTheme}
                        color='info'
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
                        theme={customTheme}
                        color='info'
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
                        defaultValue={tracker?.by || ''}
                        onChange={(e) => setFormData({ ...formData, by: e.target.value })}
                        theme={customTheme}
                        color='info'
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
                        theme={customTheme}
                        color='info'
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
                        defaultValue={tracker?.dateStarted || ''}
                        onChange={(e) => setFormData({ ...formData, dateStarted: e.target.value })}
                        theme={customTheme}
                        color='info'
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
                        defaultValue={tracker?.dateCompleted || ''}
                        onChange={(e) => setFormData({ ...formData, dateCompleted: e.target.value })}
                        theme={customTheme}
                        color='info'
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
                        defaultValue={tracker?.tags || ''}
                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                        theme={customTheme}
                        color='info'
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
                        defaultValue={tracker.notes}
                        onChange={(value) => { setFormData({ ...formData, notes: value }) }}
                    />
                </div>
            
                <div className='mt-6'>
                    <Button type='submit' className='bg-black w-full mt-5 dark:bg-white dark:text-black'>Update</Button>
                    {success && (
                        <Alert className='mt-5' color='success'>Success!</Alert>
                    )}
                    {publishError && (
                        <Alert className='mt-5' color='failure'>{publishError}</Alert>
                    )}
                </div>
            </form>
            </Drawer.Items>
      </>
    )
}