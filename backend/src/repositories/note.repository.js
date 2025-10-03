import Note from "../models/Note.model.js";

class NoteRepository {
  static async createNote(creator_id, title, description, category) {
    try {
      const note = await Note.create({
        creator_id: creator_id,
        title: title,
        description: description,
        category: category
      })
      return note
    } catch (error) {
      console.error("[NOTE REPOSITORY ERROR]: Error creating note", error)
      throw error
    }
  }

  static async getAll(creator_id) {
    try {
      const notes = await Note.find({creator_id,  active: true, archived: false })
      return notes
    } catch (error) {
      console.error(
        "[NOTE REPOSITORY ERROR]: Error fetching active notes",
        error
      )
      throw error
    }
  }

  static async getArchived(creator_id) {
    try {
      const notes = await Note.find({ creator_id, active: true, archived: true })
      return notes
    } catch (error) {
      console.error(
        "[NOTE REPOSITORY ERROR]: Error fetching archived notes",
        error
      )
      throw error
    }
  }

  static async getById(note_id) {
    try {
      const note = await Note.findById(note_id)
      return note
    } catch (error) {
      console.error(
        "[NOTE REPOSITORY ERROR]: Error fetching note by ID",
        error
      )
      throw error
    }
  }

  static async updateNote(note_id, title, description, creator_id, category) {
    try {
      const updatedNote = await Note.findByIdAndUpdate(
        { _id: note_id, creator_id: creator_id }, 
        {
          title: title,
          description: description,
          category: category,
          modified_at: new Date(),
        },
        { new: true }
      )
      return updatedNote
    } catch (error) {
      console.error("[NOTE REPOSITORY ERROR]: Error updating note", error);
      throw error
    }
  }

  static async deleteNote(note_id, creator_id) {
    try {
      const response = await Note.findByIdAndUpdate(
        { _id: note_id, creator_id: creator_id },
        {
          active: false,
          deleted_at: new Date(),
        },
        { new: true }
      )
      return response;
    } catch (error) {
      console.error("[NOTE REPOSITORY ERROR]: Error deleting note", error)
      throw error
    }
  }

  static async archiveNote(note_id, creator_id) {
    try {
      const response = await Note.findByIdAndUpdate(
        { _id: note_id, creator_id: creator_id },
        {
          active: true,
          archived: true,
        },
        { new: true }
      )
      return response
    } catch (error) {
      console.error("[NOTE REPOSITORY ERROR]: Error archiving note", error)
      throw error
    }
  }

  static async unarchiveNote(note_id, creator_id) {
    try {
      const response = await Note.findByIdAndUpdate(
        { _id: note_id, creator_id: creator_id },
        {
          archived: false, 
          modified_at: new Date(),
        },
        { new: true }
      )
      return response;
    } catch (error) {
      console.error("[NOTE REPOSITORY ERROR]: Error unarchiving note", error)
      throw error
    }
  }
}

export default NoteRepository
