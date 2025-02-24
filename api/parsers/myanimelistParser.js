// NOTE: may need to move to inside of csv.controller.js

export default (csvData) => {
    return csvData.map((row) => ({
        title: row['series_title'], 
        category: 'Series',
        subcategory: 'Anime',
        progress: {
            current: parseInt(row['my_watched_episodes'], 10) || 0,
            total: parseInt(row['series_episodes'], 10) || 0,
        },
        status: 
            row['my_status'] === 'Plan to Watch' 
                ? 'Not Started' 
                : row['my_status'] === 'Watching' 
                ? 'In Progress' 
                : row['my_status'] === 'Completed'
                ? row['my_status']
                : '',
        rating: parseFloat(row['my_score']) || null,
        dateStarted: row['my_start_date'] !== '0000-00-00' ? row['my_start_date'] : null,
        dateCompleted: row['my_finish_date'] !== '0000-00-00' ? row['my_finish_date'] : null,
        notes: row['my_comments'] || '',
        tags: row['my_tags'] ? row['my_tags'].split(',') : [],
        image: null,
        genres: [],
    }))
}