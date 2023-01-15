import mongoose, { Schema } from 'mongoose'

const schema = mongoose.Schema

const reviewSchema = new Schema({
  content: String,
  rating: {type: Number, min: 1, max: 10, default: 10}
}, {
  timestamps: true
})

const animeSchema = new Schema({
  title: String,
  releaseYear: {type: Number, default: 2010},
  englishReleaseYear: {type: Number, default: 2010},
  cast: [String],
  englishDubCast: [String], 
  reviews: [reviewSchema]
}, {
  timestamps: true
})

const Anime = mongoose.model('Anime', animeSchema)

export {
  Anime
}