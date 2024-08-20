import React, { useState,useEffect } from "react";
import axios from "axios";
import Note from "./components/Note";
import NoteForm from "./components/NoteForm";
import CategoryFilter from "./components/CategoryFilter";

const host = ""

function App() {
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null); // State to keep track of the note being edited
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch all notes from the API when the component mounts
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`${host}/api/notes`);
        setNotes(response.data);
        console.log(response.data
        );
        
      } catch (error) {
        console.error("Error fetching notes:", error);
      }
    };

    fetchNotes();
  }, []);

  const handleSaveNote = async (note) => {
    try {
      if (note.id) {
        // Update the existing note
        const response = await axios.put(`${host}/api/notes/${note.id}`, note);
        setNotes(notes.map((n) => (n.id === note.id ? response.data : n)));
        //setNotes(notes.map((n) => (n.id === note.id ? note : n)));
        
      } else {
        // Create a new note
        let date = new Date()
        const response = await axios.post(
          `${host}/api/notes`,
          Object.assign(note, { id: `${date.getTime()}` })
        );
        setNotes([...notes, response.data]);
        //setNotes([...notes, note]);
      }
      setEditingNote(null); // Reset editing state after saving
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const handleEditNote = (note) => {
    setEditingNote(note); // Set the note to be edited
  };

  const handleDeleteNote = async(id) => {
    ///setNotes(notes.filter((note) => note.id !== id)); // Delete note by id

    try {
      await axios.delete(`${host}/api/notes/${id}`);
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const filteredNotes = selectedCategory
    ? notes.filter((note) => note.category === selectedCategory)
    : notes;

  const categories = [...new Set(notes.map((note) => note.category))];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold mb-4 text-teal-600">
          Note-Taking App
        </h1>
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
        <NoteForm
          onSave={handleSaveNote}
          note={editingNote}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {filteredNotes.map((note) => (
            <Note
              key={note.id}
              note={note}
              onEdit={handleEditNote}
              onDelete={handleDeleteNote}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;


