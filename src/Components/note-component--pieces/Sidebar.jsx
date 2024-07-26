import PropTypes from 'prop-types';

export default function Sidebar(props) {
  // Check if props.notes is not null or undefined and is an array
  if (!Array.isArray(props.notes) || props.notes.length === 0) {
    return null; // Return null or a fallback UI if notes are not available
  }

  // eslint-disable-next-line no-unused-vars
  const noteElements = props.notes.map((note, index) => {
    // Ensure note and note.body are defined before accessing split method
    const noteBody = note.body ? note.body.split('\n')[0] : 'No content';

    return (
      <div key={note.id}>
        <div
          className={`title ${note.id === props.currentNote?.id ? 'selected-note' : ''}`}
          onClick={() => props.setCurrentNoteId(note.id)}
        >
          <h4 className="text-snippet">{noteBody}</h4>
          <button
            className="delete-btn"
            onClick={(e) => {
              e.stopPropagation();
              props.deleteNote(note.id);
            }}
          >
            <i className="gg-trash trash-icon"></i>
          </button>
        </div>
      </div>
    );
  });

  return (
    <section className="pane sidebar">
      <div className="sidebar--header">
        <h3>Notes</h3>
        <button className="new-note" onClick={props.newNote}>
          +
        </button>
      </div>
      {noteElements}
    </section>
  );
}

Sidebar.propTypes = {
  notes: PropTypes.array.isRequired,
  currentNote: PropTypes.object,
  setCurrentNoteId: PropTypes.func.isRequired,
  newNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
};
