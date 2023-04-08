import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NotesPage = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios
      .get('/api/notes/')
      .then((response) => setNotes(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h1>Notes</h1>
      {notes.map((note) => (
        <div key={note.id}>
          <h2>{note.title}</h2>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
};

export default NotesPage;
