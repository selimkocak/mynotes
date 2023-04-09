import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Box } from "@mui/material";

const UpdateNote = ({ note, stopEditing, fetchNotes }) => {
  const [title, setTitle] = useState(note.title);
  const [content, setContent] = useState(note.content);

  const updateNote = async (e) => {
    e.preventDefault();

    await axios.put(`/api/notes/${note.id}/`, { title, content });
    stopEditing();
    fetchNotes();
  };

  return (
    <>
      <TextField
        label="Title"
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        label="Content"
        multiline
        rows={6}
        fullWidth
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Box mt={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={updateNote}
        >
          Update
        </Button>
        <Button color="secondary" onClick={stopEditing}>
          Cancel
        </Button>
      </Box>
    </>
  );
};

export default UpdateNote;
