import { errorHandler } from '../utils/error.js'
import Jikan from 'jikan4.js'

export const searchAnime = async (req, res, next) => {
    const client = new Jikan.Client()

    try {
        const results = (await client.anime.search(req.body.searchString)).map((anime) => {
            return {
                animeId: anime.id,
                title: anime.title.default,
                genres: anime.genres,
                by: anime.studios,
                image: anime.image,
                description: anime.synopsis,
            }
        })

        res.status(200).json({
            results,
        })
    } catch (error) {
        next(error)
    }
}