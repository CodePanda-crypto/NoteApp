import './Note.css';
import Editor from './note-component--pieces/Editor';
import Sidebar from './note-component--pieces/Sidebar';
import Split from 'react-split';
import PropTypes from 'prop-types';

export default function Notes(props) {
  const currentNote = props.findCurrentNote();

  return (
    <main className="main-container">
      {props.notes.length > 0 ? (
        <Split sizes={[20, 80]} direction="horizontal" className="split">
          <Sidebar
            notes={props.notes}
            currentNote={currentNote}
            setCurrentNoteId={props.setCurrentNoteId}
            newNote={props.createNewNote}
            deleteNote={props.deleteNote}
          />
          {props.currentNoteId && (
            <Editor currentNote={currentNote} updateNote={props.updateNote} />
          )}
        </Split>
      ) : (
        <div className="no-notes">
          <h1>You have no notes</h1>
          <button
            className="first-note"
            id="first-note"
            onClick={props.createNewNote}
          >
            Create one now
          </button>
        </div>
      )}
    </main>
  );
}

Notes.propTypes = {
  notes: PropTypes.array,
  currentNoteId: PropTypes.string,
  setCurrentNoteId: PropTypes.func,
  createNewNote: PropTypes.func,
  updateNote: PropTypes.func,
  findCurrentNote: PropTypes.func,
  deleteNote: PropTypes.func,
};
