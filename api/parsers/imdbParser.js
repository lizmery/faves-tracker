export default (csvData) => {
    return csvData.map((row) => ({
        title: row['Title'], 
        by: row['Directors'],
        category: row['Title Type'] === 'TV Series' ? 'Series' : 'Movies',
        subcategory: row['Title Type'] === 'TV Series' ? row['Title Type'] : null,
        progress: {
            current: row['Your Rating'] !== '' && row['Title Type'] === 'Movie' ? row['Runtime (mins)'] : null,
            total: row['Title Type'] === 'Movie' ? row['Runtime (mins)'] : null,
        },
        status: 
            row['Your Rating'] !== '' ? 'Completed' : null,
        rating: parseFloat(row['Your Rating']) || null,
        dateStarted: null,
        dateCompleted: row['Date Rated'] !== null ? row['Date Rated'] : null,
        notes: '',
        tags: [],
        image: null,
        genres: row['Genres'].split(','),
    }))
}