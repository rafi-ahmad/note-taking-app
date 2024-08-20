import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import BookSlider from "./BookSlider";

const Note = ({ note, onEdit, onDelete }) => {
  const handleEdit = () => {
    onEdit(note);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-teal-600">{note.title}</h2>
        <div className="space-x-3">
          <button
            className="text-teal-500 hover:text-teal-600"
            onClick={handleEdit}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button
            className="text-red-500 hover:text-red-600"
            onClick={() => onDelete(note._id)}
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
        </div>
      </div>
      <p className="text-gray-700">
        <BookSlider paragraph={note.body} />
      </p>
      {note.category && (
        <span className="inline-block bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-sm font-semibold">
          <li>{note.category}</li>
        </span>
      )}
    </div>
  );
};

export default Note;
