import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

// Create a theme instance
const theme = createTheme({
  palette: {
    mode: 'light', // or 'dark' for a dark theme
    primary: {
      main: '#1976d2', // Blue color
    },
    secondary: {
      main: '#dc004e', // Pink color
    },
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeProvider>
  </BrowserRouter>
);