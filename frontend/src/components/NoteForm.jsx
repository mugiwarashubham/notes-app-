import { useState } from 'react';

function NoteForm({ onAdd, submitting }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [formError, setFormError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      setFormError('Title is required');
      return;
    }

    setFormError('');
    const success = await onAdd({ title, content });

    if (success) {
      setTitle('');
      setContent('');
    }
  };

  return (
    <form className="note-form" onSubmit={handleSubmit}>
      <h2>Add a note</h2>

      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={submitting}
      />

      <textarea
        placeholder="Content (optional)"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={submitting}
        rows={3}
      />

      {formError && <p className="error-text">{formError}</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? 'Adding...' : 'Add Note'}
      </button>
    </form>
  );
}

export default NoteForm;
