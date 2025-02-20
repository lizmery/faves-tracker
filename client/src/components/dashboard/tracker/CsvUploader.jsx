import { useState } from 'react'
import { Select, Button, Alert, Label, FileInput, TextInput } from 'flowbite-react'
import { inputTheme, fileInputTheme } from '../../../flowbiteThemes/customThemes'
import { useSelector } from 'react-redux'

export default function CsvUploader() {
    const { currentUser } = useSelector((state) => state.user)
    const [csvFile, setCSvFile] = useState(null)
    const [site, setSite] = useState('')
    const [fieldMappings, setFieldMappings] = useState([])
    const [publishError, setPublishError] = useState(null)
    const [success, setSuccess] = useState(false)
    const apiUrl = import.meta.env.VITE_API_URL

    const handleCsvFileChange = (e) => {
        setCSvFile(e.target.files[0])
    }

    const handleSiteChange = (e) => {
        setSite(e.target.value)

        if (e.target.value === 'other') {
            initializeFieldMappings()
        } else {
            setFieldMappings([])
        }
    }

    const initializeFieldMappings = () => {
        setFieldMappings([
            { label: 'Title', apiName: 'title', csvField: '', required: true },
            { label: 'Genres', apiName: 'genres', csvField: '', required: true },
            { label: 'Status', apiName: 'status', csvField: '', required: false },
            { label: 'By', apiName: 'by', csvField: '', required: false },
            { label: 'Rating', apiName: 'rating', csvField: '', required: false },
            { label: 'Start Date', apiName: 'dateStarted', csvField: '', required: false },
            { label: 'Finish Date', apiName: 'dateCompleted', csvField: '', required: false },
            { label: 'Category', apiName: 'category', csvField: '', required: true },
            { label: 'Subcategory', apiName: 'subcategory', csvField: '', required: false },
            { label: 'Progress Current', apiName: 'progress.current', csvField: '', required: false },
            { label: 'Progress Total', apiName: 'progress.total', csvField: '', required: false },
        ])
    }

    const handleFieldMappingChange = (index, value) => {
        const updatedMappings = [...fieldMappings]
        updatedMappings[index].csvField = value
        setFieldMappings(updatedMappings)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!csvFile) return alert('Please select a csv file to upload')

        const formData = new FormData()
        formData.append('csvFile', csvFile)
        formData.append('site', site)
        formData.append('userId', currentUser._id)

        if (site === 'other') {
            formData.append('fieldMappings', JSON.stringify(fieldMappings))
        }

        try {
            const res = await fetch(`${apiUrl}/api/csv/import`, {
                method: 'POST',
                body: formData,
            })
            const data = await res.json()

            if (!res.ok) {
                setPublishError(data.message)
                throw new Error(`Error: ${res.status} - ${data.message}`)
            } else {
                setSuccess(true)
                setPublishError(null)

                window.location.reload()
            }
        } catch (error) {
            setPublishError(error.message)
            console.log(error.message)
        }
    }

    return (
        <div className='dark:bg-bgDark'>
            <h1 className='text-center text-3xl mb-6 font-semibold'>Import Data from CSV File</h1>
            <form className='' onSubmit={handleSubmit}>
                <div className="mb-6">
                    <Label htmlFor="site" className="mb-2 block">
                        Select Site:
                    </Label>
                    <Select
                        onChange={handleSiteChange}
                        id='site'
                        theme={inputTheme}
                        color='gray'
                        value={site}
                    >
                        <option></option>
                        <option value='myanimelist'>MyAnimeList</option>
                        <option value='goodreads'>Goodreads</option>
                        <option value='imdb'>IMDB</option>
                        <option value='other'>Other</option>
                    </Select>
                </div>
                <div className="mb-8 flex flex-col">
                    <Label htmlFor="csvFile" className="mb-2 block">
                        Select CSV File:
                    </Label>
                    <div className='flex w-full justify-between items-center gap-2 mb-4'>
                        <FileInput
                            type='file'
                            accept='.csv'
                            onChange={handleCsvFileChange} 
                            theme={fileInputTheme}
                            color='gray'
                            className='w-full'
                        />
                    </div>
                </div>

                {site === 'other' && (
                    <div className="mb-8">
                        <h2 className='mb-4 text-xl'>Map Fields</h2>
                        {fieldMappings.map((mapping, index) => (
                            <div key={index} className="mb-6">
                                <Label className="mb-2 block">
                                    {mapping.label}
                                </Label>
                                <TextInput 
                                    type='text'
                                    placeholder={`Enter CSV header for ${mapping.label}`}
                                    className=''
                                    value={mapping.csvField}
                                    onChange={(e) => handleFieldMappingChange(index, e.target.value)}
                                    color='gray'
                                    theme={inputTheme}
                                />
                            </div>
                        ))}
                    </div>
                )}
                <div className='mt-6'>
                    <Button type='submit' className='bg-black w-full mt-5 dark:bg-white'>Upload</Button>
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