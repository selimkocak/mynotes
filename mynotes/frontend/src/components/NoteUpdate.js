import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const NoteUpdate = () => {
  const [note, setNote] = useState({ title: "", content: "" });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      const response = await axios.get(`/notes/${id}/`);
      setNote(response.data);
    };
    fetchNote();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote((prevNote) => ({ ...prevNote, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put('/notes/{id}/', note);
    navigate('/notes/{id}');
  };

  return (
    <div>
      <h1>Update Note</h1>
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
     <button type="submit">Update</button>
    </form>
  </div>
  
  );
  };

  export default NoteUpdate;