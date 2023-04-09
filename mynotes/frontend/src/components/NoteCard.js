import React, { useState } from "react";
import axios from "axios";
import {
  Card,
  CardContent,
  Typography,
  Button,
  Box,
} from "@mui/material";
import UpdateNote from "./UpdateNote";

const NoteCard = ({ note, fetchNotes }) => {
  const [isEditing, setIsEditing] = useState(false);

  const deleteNote = async (id) => {
    await axios.delete(`/api/notes/${id}/`);
    fetchNotes();
  };

  const startEditing = () => {
    setIsEditing(true);
  };

  const stopEditing = () => {
    setIsEditing(false);
  };

  return (
    <Card>
      <CardContent>
        {isEditing ? (
          <UpdateNote
            note={note}
            stopEditing={stopEditing}
            fetchNotes={fetchNotes}
          />
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
              <Button color="primary" onClick={startEditing}>
                Edit
              </Button>
            </Box>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default NoteCard;
