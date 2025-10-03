import User from '../models/User.model.js'

class UserRepository {
  static async createUser (username, email, password) {
    try {
      const user = await User.create({
        username,
        email,
        password
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
}

export default UserRepository