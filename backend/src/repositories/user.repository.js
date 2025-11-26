import User from '../models/User.model.js'

class UserRepository {
  static async createUser (username, email, password, verificationToken = null) {
    try {
      const user = await User.create({
        username,
        email,
        password,
        is_verified: false,
        verification_token: verificationToken
      })
      return user
    } catch (error) {
      console.error('[USER REPOSITORY ERROR]: Error creating user', error)
      throw error
    }
  }

  static async findByEmail (email) {
    try {
      const user = await User.findOne({ email, active: true })
      return user
    } catch (error) {
      console.error('[USER REPOSITORY ERROR]: Error finding user by email', error)
      throw error
    }
  }

  static async findById (user_id) {
    try {
      const user = await User.findById(user_id)
      return user
    } catch (error) {
      console.error('[USER REPOSITORY ERROR]: Error finding user by ID', error)
      throw error
    }
  }

  static async findByToken (token) {
    try {
      const user = await User.findOne({ verification_token: token, active: true })
      return user
    } catch (error) {
      console.error('[USER REPOSITORY ERROR]: Error finding user by token', error)
      throw error
    }
  }

  static async verifyUser (user_id) {
    try {
      const user = await User.findByIdAndUpdate(
        user_id,
        { is_verified: true, verification_token: null },
        { new: true }
      )
      return user
    } catch (error) {
      console.error('[USER REPOSITORY ERROR]: Error verifying user', error)
      throw error
    }
  }
}

export default UserRepository