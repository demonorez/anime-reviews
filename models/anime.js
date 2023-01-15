import mongoose, { Schema } from 'mongoose'

const schema = mongoose.Schema

const animeSchema = new Schema({
  title: {
    String,
    required: true,
  },
  releaseYear: {type: Number, default: 2010},
  englishReleaseYear: {type: Number, default: 2010},
  cast: [String],
  englishDubCast: [String], 
}, {
  timestamps: true
})

const Anime = mongoose.model('Anime', animeSchema)

export {
  Anime
}