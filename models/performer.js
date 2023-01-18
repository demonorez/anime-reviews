import mongoose from 'mongoose'

const Schema = mongoose.Schema

const performerSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  version: {
    type: String,
    enum: ["Japanese", "English"],
    default: "Japanese"
  },
  creator: { type: Schema.Types.ObjectId, ref: "Profile" },
}, {
  timestamps: true,
})

const Performer = mongoose.model('Performer', performerSchema)

export {
  Performer
}

