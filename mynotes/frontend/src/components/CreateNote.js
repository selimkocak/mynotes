import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Box, Typography } from "@mui/material";

const CreateNote = ({ fetchNotes }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createNote = async (e) => {
    e.preventDefault();

    await axios.post("/api/notes/", { title, content });
    setTitle("");
    setContent("");
    fetchNotes();
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Create Note
      </Typography>
      <form onSubmit={createNote}>
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
          <Button type="submit" variant="contained" color="primary">
            Create
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateNote;
