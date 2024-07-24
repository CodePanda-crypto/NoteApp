import { useState, useEffect } from 'react';
import './App.css';
import Header from './Components/Header';
import Notes from './Components/Note';
import { nanoid } from 'nanoid';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState('');

  useEffect(() => {
    if (notes.length > 0 && !currentNoteId) {
      setCurrentNoteId(notes[0].id);
    }
  }, [notes, currentNoteId]);

  function createNewNote() {
    const newNote = {
      id: nanoid(),
      body: "# Type your markdown note's title here",
    };
    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setCurrentNoteId(newNote.id);
  }

  function updateNote(text) {
    setNotes((oldNotes) =>
      oldNotes.map((oldNote) => {
        return oldNote.id === currentNoteId
          ? { ...oldNote, body: text }
          : oldNote;
      })
    );
  }

  function findCurrentNote() {
    return notes.find((note) => note.id === currentNoteId) || notes[0];
  }

  return (
    <div className="App">
      <Header />
      <Notes
        notes={notes}
        currentNoteId={currentNoteId}
        setCurrentNoteId={setCurrentNoteId}
        createNewNote={createNewNote}
        updateNote={updateNote}
        findCurrentNote={findCurrentNote}
      />
    </div>
  );
}
