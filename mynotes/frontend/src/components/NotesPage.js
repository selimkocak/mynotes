import React, { useState, useEffect } from "react";
import axios from "axios";

const NotesPage = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [updateIndex, setUpdateIndex] = useState(null);

  const fetchNotes = async () => {
    const response = await axios.get("/api/notes/");
    setNotes(response.data);
  };

  const createNote = async (e) => {
    e.preventDefault();

    await axios.post("/api/notes/", { title, content });
    setTitle("");
    setContent("");
    fetchNotes();
  };

  const updateNote = async (e, id) => {
    e.preventDefault();

    await axios.put(`/api/notes/${id}/`, { title, content });
    setTitle("");
    setContent("");
    setUpdateIndex(null);
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(`/api/notes/${id}/`);
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div>
      <h1>Notes</h1>
      {notes.map((note, index) => (
        <div key={note.id}>
          {updateIndex === index ? (
            <>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
              <button onClick={(e) => updateNote(e, note.id)}>Update</button>
              <button onClick={() => setUpdateIndex(null)}>Cancel</button>
            </>
          ) : (
            <>
              <h2>{note.title}</h2>
              <p>{note.content}</p>
              <button onClick={() => deleteNote(note.id)}>Delete</button>
              <button
                onClick={() => {
                  setTitle(note.title);
                  setContent(note.content);
                  setUpdateIndex(index);
                }}
              >
                Edit
              </button>
            </>
          )}
        </div>
      ))}
      <h2>Create Note</h2>
      <form onSubmit={createNote}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default NotesPage;
