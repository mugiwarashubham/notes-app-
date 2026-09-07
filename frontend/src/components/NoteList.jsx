function NoteList({ notes, onDelete, deletingId }) {
  if (notes.length === 0) {
    return <p className="empty-state">No notes yet. Add one above.</p>;
  }

  return (
    <ul className="note-list">
      {notes.map((note) => (
        <li key={note._id} className="note-item">
          <div className="note-item-content">
            <h3>{note.title}</h3>
            {note.content && <p>{note.content}</p>}
          </div>
          <button
            className="delete-btn"
            onClick={() => onDelete(note._id)}
            disabled={deletingId === note._id}
          >
            {deletingId === note._id ? 'Deleting...' : 'Delete'}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default NoteList;
