import mongoose from "mongoose";

const movieSchema = mongoose.Schema({
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        genre: {
            type: String
        },
        releaseYear: {
            type: Number
        },
        poster: {
            type: String,
            required: true
        },
        cloudinary_id: {
            type: String,
            required: true
        }
    }
)

const movie = mongoose.model("movie",movieSchema)

export default movie