import React from "react";
import NoteForm from "../components/NoteForm";

const NotePage = ({ match }) => {
  return (
    <div>
      <h1>Edit Note</h1>
      <NoteForm noteId={match.params.id} />
    </div>
  );
};

export default NotePage;
