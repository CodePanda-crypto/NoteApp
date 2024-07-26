import './Note.css';
import Editor from './note-component--pieces/Editor';
import Sidebar from './note-component--pieces/Sidebar';
import Split from 'react-split';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

export default function Notes(props) {
  // Define the default split sizes
  const defaultSizes = [20, 80];

  // Initialize the split sizes state
  const [splitSizes, setSplitSizes] = useState(
    JSON.parse(localStorage.getItem('split-sizes')) || defaultSizes
  );

  // Save split sizes to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('split-sizes', JSON.stringify(splitSizes));
  }, [splitSizes]);

  return (
    <main className="main-container">
      {props.notes.length > 0 ? (
        <Split
          sizes={splitSizes}
          minSize={100}
          direction="horizontal"
          className="split"
          gutterSize={10}
          onDragEnd={(sizes) => setSplitSizes(sizes)}
        >
          <Sidebar
            notes={props.sortedNotes}
            currentNote={props.currentNote}
            setCurrentNoteId={props.setCurrentNoteId}
            newNote={props.createNewNote}
            deleteNote={props.deleteNote}
          />
          <Editor
            tempNoteText={props.tempNoteText}
            setTempNoteText={props.setTempNoteText}
          />
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
  notes: PropTypes.array.isRequired,
  currentNoteId: PropTypes.string,
  setCurrentNoteId: PropTypes.func.isRequired,
  createNewNote: PropTypes.func.isRequired,
  updateNote: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
  sortedNotes: PropTypes.array.isRequired,
  currentNote: PropTypes.object,
  tempNoteText: PropTypes.string.isRequired,
  setTempNoteText: PropTypes.func.isRequired,
};
