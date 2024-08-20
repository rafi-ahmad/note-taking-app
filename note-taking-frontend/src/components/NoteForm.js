import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeading,
  faAlignLeft,
  faTag,
} from "@fortawesome/free-solid-svg-icons";

const categories = ["Work", "Personal", "Shopping", "Health","Food", "Others"];


const NoteForm = ({ onSave, note }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [category, setCategory] = useState("");

  // Effect to populate form fields when editing a note
  useEffect(() => {
    if (note) {
      setTitle(note.title);
      setBody(note.body);
      setCategory(note.category);
    } else {
      setTitle("");
      setBody("");
      setCategory("");
    }
  }, [note]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ id: note?.id, title, body, category });
    setTitle("");
    setBody("");
    setCategory("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-teal-100 rounded-lg shadow-lg space-y-6"
    >
      <div className="relative">
        <FontAwesomeIcon
          icon={faHeading}
          className="text-teal-500 absolute left-3 top-3"
        />
        <input
          className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className="relative">
        <FontAwesomeIcon
          icon={faAlignLeft}
          className="text-teal-500 absolute left-3 top-3"
        />
        <textarea
          className="w-full p-3 pl-10 border border-gray-300 rounded-lg h-32 focus:outline-none focus:ring-2 focus:ring-teal-400"
          placeholder="Body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />
      </div>
      <div className="relative">
        <FontAwesomeIcon
          icon={faTag}
          className="text-teal-500 absolute left-3 top-3"
        />
        <select
          className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select a Category</option>
          {categories.map((cat) => (
            <option
              key={cat}
              value={cat}
            >
              {cat}
            </option>
          ))}
        </select>
      </div>
      <button
        className="w-full p-3 bg-sky-600 text-white rounded-lg font-semibold hover:bg-sky-700 transition-colors"
        type="submit"
      >
        {note ? "Update Note" : "Save Note"}
      </button>
    </form>
  );
};

export default NoteForm;
