import React from "react";
import NotesPage from "./components/NotesPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import './App.css';

const theme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <NotesPage />
      </div>
    </ThemeProvider>
  );
}

export default App;
