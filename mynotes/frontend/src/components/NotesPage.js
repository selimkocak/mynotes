import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Typography, Box, Grid } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CreateNote from "./CreateNote";
import NoteCard from "./NoteCard";

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

const NotesPage = () => {
  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const response = await axios.get("/api/notes/");
    setNotes(response.data);
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
        <Box mt={4}>
          <CreateNote fetchNotes={fetchNotes} />
        </Box>
        
        <Grid container spacing={3} style={{ marginTop: "3px" }}>
          {notes.map((note) => (
            <Grid key={note.id} item xs={12} sm={6} md={4}>
              <NoteCard note={note} fetchNotes={fetchNotes} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default NotesPage;
