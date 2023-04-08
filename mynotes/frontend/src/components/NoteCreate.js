import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NoteCreate = () => {
  const [note, setNote] = useState({ title: "", content: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({ ...prevNote, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("/notes/", note);
    navigate(`/notes/${response.data.id}`);
  };

  return (
    <div>
      <h1>Create Note</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={note.title}
          onChange={handleChange}
        />
        <textarea
          name="content"
          value={note.content}
          onChange={handleChange}
        ></textarea>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default NoteCreate;
