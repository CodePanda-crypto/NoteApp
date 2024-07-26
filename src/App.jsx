import { useState, useEffect, useMemo } from 'react';
import Header from './Components/Header';
import Notes from './Components/Note';
import { onSnapshot, addDoc, doc, deleteDoc, setDoc } from 'firebase/firestore';
import { notesCollection, db } from './Firebase';

export default function App() {
  const [notes, setNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState('');
  const [tempNoteText, setTempNoteText] = useState('');

  const currentNote = useMemo(
    () => notes.find((note) => note.id === currentNoteId) || notes[0],
    [notes, currentNoteId]
  );

  const sortedNotes = useMemo(
    () => notes.sort((a, b) => b.updatedAt - a.updatedAt),
    [notes]
  );

  useEffect(() => {
    const unsubscribe = onSnapshot(notesCollection, function (snapshot) {
      const notesArr = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setNotes(notesArr);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (!currentNoteId && notes.length > 0) {
      setCurrentNoteId(notes[0]?.id);
    }
  }, [notes, currentNoteId]);

  useEffect(() => {
    if (currentNote) {
      setTempNoteText(currentNote.body);
    }
  }, [currentNote]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (currentNoteId) {
        updateNote(tempNoteText);
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [tempNoteText, currentNoteId]);

  async function createNewNote() {
    const newNote = {
      body: "# Type your markdown note's title here",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const newNoteRef = await addDoc(notesCollection, newNote);
    setCurrentNoteId(newNoteRef.id);
  }

  async function updateNote(text) {
    const docRef = doc(db, 'notes', currentNoteId);
    await setDoc(
      docRef,
      { body: text, updatedAt: Date.now() },
      { merge: true }
    );
  }

  async function deleteNote(noteId) {
    const docRef = doc(db, 'notes', noteId);
    await deleteDoc(docRef);
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
        deleteNote={deleteNote}
        sortedNotes={sortedNotes}
        currentNote={currentNote}
        tempNoteText={tempNoteText}
        setTempNoteText={setTempNoteText}
      />
    </div>
  );
}
