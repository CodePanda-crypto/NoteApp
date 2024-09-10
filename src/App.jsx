import { useState, useEffect, useMemo } from 'react';
import Header from './Components/Header';
import Notes from './Components/Note';
import { onSnapshot, addDoc, doc, deleteDoc, setDoc } from 'firebase/firestore';
import { notesCollection, db } from './Firebase';
import { getAuth, onAuthStateChanged, signInAnonymously } from 'firebase/auth';

export default function App() {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState('');
  const [tempNoteText, setTempNoteText] = useState('');

  useEffect(() => {
    const auth = getAuth();

    // Check if a user is authenticated
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user); // Authenticated user
      } else {
        // If no authenticated user, sign in anonymously
        signInAnonymously(auth)
          .then(() => {
            console.log('Signed in as anonymous user');
          })
          .catch((error) => {
            console.error('Error signing in anonymously:', error);
          });
      }
    });

    return () => unsubscribe();
  }, []);

  // useMemo to identify the currentNote
  const currentNote = useMemo(
    () => notes.find((note) => note.id === currentNoteId) || notes[0],
    [notes, currentNoteId]
  );

  // set the currentNote on top of the list in the sideBar
  const sortedNotes = useMemo(
    () => notes.slice().sort((a, b) => b.updatedAt - a.updatedAt),
    [notes]
  );

  // Fetch notes from Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(notesCollection, (snapshot) => {
      const notesArr = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setNotes(notesArr);
    });
    return unsubscribe;
  }, [user]);

  // useEffect to set the currentNoteId when the currentNote changes
  useEffect(() => {
    if (!currentNoteId && notes.length > 0) {
      setCurrentNoteId(notes[0]?.id);
    }
  }, [notes, currentNoteId]);

  // Bouncing Updates
  useEffect(() => {
    if (currentNote) {
      setTempNoteText(currentNote.body);
    }
  }, [currentNote]);

  // Debouncing Updates
  useEffect(() => {
    if (!currentNote || !tempNoteText) return;
    const timeoutId = setTimeout(() => {
      if (tempNoteText !== currentNote.body) {
        updateNote(tempNoteText);
      }
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [tempNoteText, currentNote]);

  // function to create a new note
  async function createNewNote() {
    try {
      const newNote = {
        body: "# Type your markdown note's title here",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      const newNoteRef = await addDoc(notesCollection, newNote);
      setCurrentNoteId(newNoteRef.id);
    } catch (error) {
      console.error('Error creating new note:', error);
    }
  }

  // function to update note
  async function updateNote(text) {
    const docRef = doc(db, 'notes', currentNoteId);
    await setDoc(
      docRef,
      { body: text, updatedAt: Date.now() },
      { merge: true }
    );
  }

  // function to delete note
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
