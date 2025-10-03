import NoteRepository from "../repositories/note.repository.js";
export const createNote = async (req, res) => {
  try {
    const creator_id = req.user.id;

    const note = await NoteRepository.createNote(
      creator_id,
      req.body.title,
      req.body.description,
      req.body.category
    );
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getArchived = async (req, res) => {
  try {
    const creator_id = req.user.id;
    const notes = await NoteRepository.getArchived(creator_id);
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export const getAll = async (req, res) => {
  try {
    const creator_id = req.user.id;
    const notes = await NoteRepository.getAll(creator_id);
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const note = await NoteRepository.getById(req.params.id);

    if (!note || note.creator_id.toString() !== req.user.id) {
      return res.status(404).json({ error: "Note not found or access denied" });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateNote = async (req, res) => {
  try {
    const creator_id = req.user.id;
    const updatedNote = await NoteRepository.updateNote(
      req.params.id,
      req.body.title,
      req.body.description,
      creator_id,
      req.body.category
    );
    if (!updatedNote) {
      return res.status(404).json({ error: "Note not found or access denied" });
    }
    res.json(updatedNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const archiveNote = async (req, res) => {
  try {
    const creator_id = req.user.id;
    const archivedNote = await NoteRepository.archiveNote(
      req.params.id,
      creator_id
    );
    if (!archivedNote) {
      return res.status(404).json({ error: "Note not found or access denied" });
    }
    res.json(archivedNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const unarchiveNote = async (req, res) => {
  try {
    const creator_id = req.user.id;
    const unarchivedNote = await NoteRepository.unarchiveNote(
      req.params.id,
      creator_id
    );
    if (!unarchivedNote) {
      return res.status(404).json({ error: "Note not found or access denied" });
    }
    res.json(unarchivedNote);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const creator_id = req.user.id;
    const deletedNote = await NoteRepository.deleteNote(
      req.params.id,
      creator_id
    );
    if (!deletedNote) {
      return res.status(404).json({ error: "Note not found or access denied" });
    }
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
