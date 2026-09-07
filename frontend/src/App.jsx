import { useState, useEffect } from 'react';
import NoteForm from './components/NoteForm';
import NoteList from './components/NoteList';
import { fetchNotes, createNote, deleteNote } from './api/notes';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchNotes();
      setNotes(data);
    } catch (err) {
      setError('Could not load notes. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async ({ title, content }) => {
    setSubmitting(true);
    setError('');
    try {
      const newNote = await createNote({ title, content });
      setNotes((prev) => [newNote, ...prev]);
      return true;
    } catch (err) {
      setError(err.message || 'Could not add note');
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    setError('');
    try {
      await deleteNote(id);
      setNotes((prev) => prev.filter((note) => note._id !== id));
    } catch (err) {
      setError(err.message || 'Could not delete note');
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="app">
      <h1>Notes</h1>

      <NoteForm onAdd={handleAdd} submitting={submitting} />

      {error && <p className="error-banner">{error}</p>}

      {loading ? (
        <p className="loading-state">Loading notes...</p>
      ) : (
        <NoteList notes={notes} onDelete={handleDelete} deletingId={deletingId} />
      )}
    </div>
  );
}

export default App;
