import mongoose from "mongoose"

const noteSchema = new mongoose.Schema({
  creator_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  title: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 100
  },
  description: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 1000
  },
  category: {
    type: String,
    enum: ['personal', 'work', 'school', 'house'],
    default: 'personal',
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now,
    required: true
  },
  modified_at: {
    type: Date,
    default: null
  },
  deleted_at:{
    type: Date,
    default: null
  },
  archived: {
    type: Boolean,
    default: false,
    required: true
  },
  active: {
    type: Boolean,
    default: true,
    required: true
  }
})

const Note = mongoose.model('Note', noteSchema)

export default Note
