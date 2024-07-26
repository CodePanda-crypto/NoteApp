import { useState, useEffect, useMemo } from 'react';
import Header from './Components/Header';
import Notes from './Components/Note';
import { onSnapshot, addDoc, doc, deleteDoc, setDoc } from 'firebase/firestore';
import { notesCollection, db } from './Firebase';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    signInAnonymously(auth)
      .then(() => {
        console.log('Signed in anonymously');
      })
      .catch((error) => {
        console.error('Error signing in anonymously:', error);
      });

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const [notes, setNotes] = useState([]);
  const [currentNoteId, setCurrentNoteId] = useState('');
  const [tempNoteText, setTempNoteText] = useState('');

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

  // useEffect to get the notes from firebase
  useEffect(() => {
    if (!user) return;
    const unsubscribe = onSnapshot(notesCollection, function (snapshot) {
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

  // Debouncing Updates: set a delay of 1000ms for the on keystrokes
  useEffect(() => {
    if (!currentNote || !tempNoteText) return;
    const timeoutId = setTimeout(() => {
      if (tempNoteText !== currentNote.body) {
        updateNote(tempNoteText);
      }
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [tempNoteText, currentNote]);

  // function to create a new note
  async function createNewNote() {
    if (!user) {
      console.log('User is not authenticated');
      return;
    }
    console.log('Creating a new note...'); // Debugging log
    try {
      const newNote = {
        body: "# Type your markdown note's title here",
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      const newNoteRef = await addDoc(notesCollection, newNote);
      console.log('New note created with ID:', newNoteRef.id); // Debugging log
      setCurrentNoteId(newNoteRef.id);
    } catch (error) {
      console.error('Error creating new note:', error); // Debugging log
    }
  }

  // function to update note
  async function updateNote(text) {
    if (!user) return;
    const docRef = doc(db, 'notes', currentNoteId);
    await setDoc(
      docRef,
      { body: text, updatedAt: Date.now() },
      { merge: true }
    );
  }

  // function to delete note
  async function deleteNote(noteId) {
    if (!user) return;
    const docRef = doc(db, 'notes', noteId);
    await deleteDoc(docRef);
  }

  return (
    <div className="App">
      <Header />
      <Notes
        // Data being passed to the child components
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
