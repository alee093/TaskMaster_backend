import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 100
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
  active: {
    type: Boolean,
    default: true,
    required: true
  }
})

const User = mongoose.model('User', userSchema)

export default User