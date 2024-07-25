// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import Header from './Components/Header';
import Notes from './Components/Note';
import { onSnapshot, addDoc, doc, deleteDoc, setDoc } from 'firebase/firestore';
import { notesCollection, db } from './Firebase';

export default function App() {
  // Initialize notes state and currentNoteId with default values
  const [notes, setNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState('');

  //Sorted Notes
  const sortedNotes = notes.sort((a, b) => {
    return b.updatedAt - a.updatedAt;
  });

  // Fetch notes from Firestore and update the state
  useEffect(() => {
    const unsubscribe = onSnapshot(notesCollection, (snapshot) => {
      const notesArr = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setNotes(notesArr);
    });
    return () => unsubscribe();
  }, []);

  // Set the currentNoteId based on the notes state
  useEffect(() => {
    if (notes.length > 0 && !currentNoteId) {
      setCurrentNoteId(notes[0]?.id);
    }
  }, [notes, currentNoteId]);

  // Create a new note and add it to Firestore
  async function createNewNote() {
    const newNote = {
      body: "Type your markdown note's title here",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    try {
      const newNoteRef = await addDoc(notesCollection, newNote);
      setCurrentNoteId(newNoteRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }

  // Update the note's body and reorder the notes array
  async function updateNote(text) {
    const docRef = doc(db, 'notes', currentNoteId);
    await setDoc(
      docRef,
      { body: text, updatedAt: Date.now() },
      { merge: true }
    );
  }

  // Delete a note from the state
  async function deleteNote(noteId) {
    const docRef = doc(db, 'notes', noteId);
    await deleteDoc(docRef);
  }

  // Find the currently selected note
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
        deleteNote={deleteNote}
        sortedNotes={sortedNotes}
      />
    </div>
  );
}
