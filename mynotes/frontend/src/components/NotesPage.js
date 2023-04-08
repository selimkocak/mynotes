import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

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
    <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        <Typography variant="h3" gutterBottom>
          Notes
        </Typography>
        <Grid container spacing={3}>
          {notes.map((note, index) => (
            <Grid key={note.id} item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  {updateIndex === index ? (
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
                          onClick={(e) => updateNote(e, note.id)}
                        >
                          Update
                        </Button>
                        <Button
                          color="secondary"
                          onClick={() => setUpdateIndex(null)}
                        >
                          Cancel
                        </Button>
                      </Box>
                    </>
                  ) : (
                    <>
                      <Typography variant="h5" gutterBottom>
                        {note.title}
                      </Typography>
                      <Typography variant="body1">{note.content}</Typography>
                      <Box mt={2}>
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={() => deleteNote(note.id)}
                        >
                          Delete
                        </Button>
                        <Button
                          color="primary"
                                                onClick={() => {
                        setTitle(note.title);
                        setContent(note.content);
                        setUpdateIndex(index);
                      }}
                    >
                      Edit
                    </Button>
                  </Box>
                </>
              )}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
    <Box mt={4}>
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
    </Box>
  </Container>
</ThemeProvider>
);
};

export default NotesPage;
