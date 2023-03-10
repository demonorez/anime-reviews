import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema({
  content: String,
  rating: {type: Number, min: 1, max: 10, default: 10},
  creator: { type: Schema.Types.ObjectId, ref: "Profile" },
}, {
  timestamps: true
})

const animeSchema = new Schema({
  title: String,
  releaseYear: {type: Number, default: 2010},
  englishReleaseYear: {type: Number, default: 2010},
  cast: [{type: Schema.Types.ObjectId, ref: 'Performer'}],
  owner: { type: Schema.Types.ObjectId, ref: "Profile" },
  reviews: [reviewSchema],
  image: String,
  description: String,
  genre: {
    type: String,
    enum: ["Action", "Adventure", "Comedy", "Romance", "Drama", "Slice of Life", "Fantasy", "Sci-fi", "Supernatural", "Isekai"]
  }
}, {
  timestamps: true
})

const Anime = mongoose.model('Anime', animeSchema)

export {
  Anime
}