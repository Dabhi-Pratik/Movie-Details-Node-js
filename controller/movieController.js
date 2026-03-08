import HttpError from "../middleware/HttpError.js"
import cloudinary from "../config/cloudinary.js"
import movie from "../model/movieModel.js"

const addMovie = async (req, res, next) => {
    try {
        const { title, description, genre, releaseYear } = req.body

        if (!req.file) {
            return next(new HttpError("Poster Image is required..!", 400))
        }

        const newMovie = new movie({
            title,
            description,
            genre,
            releaseYear,
            poster: req.file.path,
            cloudinary_id: req.file.filename
        })

        await newMovie.save()

        res.status(201).json({ success: true, message: "Movie add Successfully..!", movie: newMovie })

    } catch (error) {

        next(new HttpError(error.message, 500))
    }
}

const allMovieList = async (req, res, next) => {
    try {
        const movies = await movie.find()

        res.status(200).json({ message: "Get all Movies Successfully..", movies })
    } catch (error) {
        next(new HttpError(error.message, 500))
    }
}

const getMovieById = async (req, res, next) => {
    try {
        const id = req.params.id

        const movie = await movie.findById(id)

        if (!movie) {
            return next(new HttpError("Movie not Found..!", 404))
        }

        res.status(200).json({ message: "get movie Successfully", movie })


    } catch (error) {
       next(new HttpError("Invalid Movie Id",400))
    }
}

const deleteMovie = async (req, res, next) => {
    try {
        const id = req.params.id;

        const movie = await movie.findById(id);

        if (!movie) {
            return next(new HttpError("Movie not found", 404));
        }

        await cloudinary.uploader.destroy(movie.cloudinary_id)

        await movie.deleteOne()

        res.status(200).json({ message: "Movie Delete Successfully..!", movie });
    } catch (error) {
        next(new HttpError("Invalid movie ID", 400));
    }
}

const updateMovie = async (req, res, next) => {
    try {

        const id = req.params.id

        const movie = await movie.findById(id)

        if (!movie) {
            return next(new HttpError("movie not found", 404))
        }

        const update = Object.keys(req.body)

        const allowedUpdate = ["title", "description", "genre", "releaseYear"]

        const isValidUpdate = update.every((field) =>
            allowedUpdate.includes(field)
        )

        if (!isValidUpdate) {
            return next(new HttpError("It is not Valid Update Filed", 400))
        }

        update.forEach((field) => {
            movie[field] = req.body[field]
        })

        if (req.file) {
            await cloudinary.uploader.destroy(movie.cloudinary_id)

            movie.poster = req.file.path
            movie.cloudinary_id = req.file.filename
        }

        await movie.save()

        res.status(200).json({
            success: true,
            message: "movie Updated Successfully",
            movie
        })

    } catch (error) {
        next(new HttpError("Invalid movie ID", 400))
    }
}
export default { addMovie,getMovieById,allMovieList, updateMovie,deleteMovie}