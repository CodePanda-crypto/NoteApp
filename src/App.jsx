// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import Header from './Components/Header';
import Notes from './Components/Note';
export default function App() {
  //When the app first loads, initializes the notes state with the notes saved in localStorage.
  const [notes, setNotes] = useState(
    //lazy State
    () => JSON.parse(localStorage.getItem('notes')) || []
  );
  const [currentNoteId, setCurrentNoteId] = useState('');
  // Every time the `notes` array changes, saves it in localStorage.
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if (notes.length > 0 && !currentNoteId) {
      setCurrentNoteId(notes[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notes]);

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
