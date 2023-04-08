import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from "react-router-dom";

const NotePage = () => {
  const [note, setNote] = useState(null);
  const { id } = useParams();

  const navigate = useNavigate();

  const handleDelete = async () => {
    await axios.delete(`/notes/${id}/`);
    navigate("/");
  };

  useEffect(() => {
    axios
      .get(`/api/notes/${id}/`)
      .then((response) => setNote(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  return (
    <div>
      {note && (
        <>
          <h1>{note.title}</h1>
          <p>{note.content}</p>
          <Link to={`/notes/${id}/update`}>Update</Link>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default NotePage;
