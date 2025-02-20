export default (csvData) => {
    return csvData.map((row) => ({
        title: row['Title'], 
        by: row['Author'],
        category: 'Books',
        subcategory: null,
        progress: {
            current: row['Exclusive Shelf'] === 'read' ? parseInt(row['Number of Pages'], 10) : 0,
            total: parseInt(row['Number of Pages'], 10) || 0,
        },
        status: 
            row['Exclusive Shelf'] === 'to-read' 
                ? 'Not Started' 
                : row['Exclusive Shelf'] === 'currently-reading' 
                ? 'In Progress' 
                : row['Exclusive Shelf'] === 'read'
                ? 'Completed'
                : '',
        rating: parseFloat(row['My Rating']) * 2 || null,
        dateStarted: null,
        dateCompleted: row['Date Read'] !== '' ? new Date(row['Date Read']) : null,
        notes: row['Private Notes'] || '',
        tags: [],
        image: null,
        genres: [],
    }))
}