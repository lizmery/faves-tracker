import { parse } from 'csv-parse'

/**
    * Parses a CSV buffer and converts it to an array of objects.
    * @param {Buffer} buffer - The uploaded CSV file as a buffer.
    * @returns {Promise<Array>} Parsed data as an array of objects.
*/

const parseCSV = (buffer) => {
    return new Promise((resolve, reject) => {
        const data = []

        parse(buffer, {
            columns: true, // automatically map headers to object keys
            trim: true, 
        })
        .on('data', (row) => {
            data.push(row)
        })
        .on('end', () => {
            resolve(data)
        })
        .on('error', (error) => {
            reject(error)
        })
    })
}

export default parseCSV