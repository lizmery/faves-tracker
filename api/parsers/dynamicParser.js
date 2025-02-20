export default function dynamicParser(csvData, fieldMappings) {
    const mappings = JSON.parse(fieldMappings)

    return csvData.map((row) => {
        const entry = {}

        mappings.forEach(({ apiName, csvField, required }) => {
            let value = row[csvField] || null

            if (required && !value) {
                if (apiName === 'title') value = 'Untitled'
                else if (apiName === 'category') value = 'Unknown'
                else if (apiName.includes('progress')) value = 0
                else value = null
            }

            entry[apiName] = value
        })

        return {
            ...entry,
            genres: entry.genres ? entry.genres.split(',') : [],
            tags: entry.tags ? entry.tags.split(',') : [],
            rating: entry.rating ? parseInt(entry.rating, 10) : null,
            dateStarted: entry.dateStarted ? new Date(entry.dateStarted) : null,
            dataCompleted: entry.dataCompleted ? new Date(entry.dataCompleted) : null,
            progress: {
                current: entry['progress.current'] ? parseInt(entry['progress.current'], 10) : 0,
                total: entry['progress.total'] ? parseInt(entry['progress.total'], 10) : 0,
            },
        }
    })
}