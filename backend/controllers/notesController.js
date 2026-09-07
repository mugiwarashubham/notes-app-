const Note = require('../Models/note');

// POST /notes
exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({ error: 'Title is required' });
    }

    const note = await Note.create({ title: title.trim(), content });
    return res.status(201).json(note);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to create note' });
  }
};

// GET /notes
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ createdAt: -1 });
    return res.status(200).json(notes);
  } catch (err) {
    return res.status(500).json({ error: 'Failed to fetch notes' });
  }
};

// DELETE /notes/:id
exports.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return res.status(404).json({ error: 'Note not found' });
    }

    return res.status(200).json({ message: 'Note deleted', id });
  } catch (err) {
    // Handles malformed ObjectId as a 400 rather than a 500
    if (err.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid note id' });
    }
    return res.status(500).json({ error: 'Failed to delete note' });
  }
};
