import mongoose, { Schema } from 'mongoose'

const schema = mongoose.Schema

const animeSchema = new Schema({
  title: String,
  releaseYear: Number,
  englishReleaseYear: Number,
  cast: [String],
  englishDubCast: [String], 
}, {
  timestamps: true
})

const Anime = mongoose.model('Anime', animeSchema)

export {
  Anime
}