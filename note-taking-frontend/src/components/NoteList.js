import React, { useEffect, useState } from "react";
import axios from "axios";
import NoteCard from "./BookSlider";

const NoteList = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await axios.get("http://localhost:5000/api/notes");
      setNotes(response.data);
    };

    fetchNotes();
  }, []);

  return (
    <div>
      {notes.map((note) => (
        <NoteCard
          key={note._id}
          note={note}
        />
      ))}
    </div>
  );
};

export default NoteList;
