import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css'; 
import NotesPage from "./components/NotesPage";
import NotePage from "./components/NotePage";
import NoteUpdate from "./components/NoteUpdate";
import NoteCreate from "./components/NoteCreate";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<NotesPage />} />
          <Route exact path="/notes/:id" element={<NotePage />} />
          <Route exact path="/notes/:id/update" element={<NoteUpdate />} />
          <Route exact path="/create" element={<NoteCreate />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
