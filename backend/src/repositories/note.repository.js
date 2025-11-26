import Note from "../models/Note.model.js";

class NoteRepository {
  static async createNote(creator_id, title, description, category, is_public = false) {
    try {
      const note = await Note.create({
        creator_id: creator_id,
        title: title,
        description: description,
        category: category,
        is_public: is_public
      })
      return note
    } catch (error) {
      console.error("[NOTE REPOSITORY ERROR]: Error creating note", error)
      throw error
    }
  }

  static async getAll(creator_id) {
    try {
      const notes = await Note.find({creator_id,  active: true, archived: false }).sort({ created_at: -1 })
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
      const notes = await Note.find({ creator_id, active: true, archived: true }).sort({ created_at: -1 })
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

  static async updateNote(note_id, title, description, creator_id, category, is_public) {
    try {
      const updatedNote = await Note.findByIdAndUpdate(
        { _id: note_id, creator_id: creator_id }, 
        {
          title: title,
          description: description,
          category: category,
          ...(typeof is_public !== 'undefined' ? { is_public } : {}),
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

  static async getPublicNotes() {
    try {
      // Return public, active, not archived notes ordered by newest first.
      const notes = await Note.find({ is_public: true, active: true, archived: false })
        .sort({ created_at: -1 })
        .populate('creator_id', 'username')
      return notes
    } catch (error) {
      console.error('[NOTE REPOSITORY ERROR]: Error fetching public notes', error)
      throw error
    }
  }
}

export default NoteRepository
