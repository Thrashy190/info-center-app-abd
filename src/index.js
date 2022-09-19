import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter } from 'react-router-dom';
import UserProvider from './context/UserProvider';

const theme = createTheme({
  palette: {
    primary: {
      main: '#800040',
    },
    secondary: {
      main: '#3B3D78',
    },
    neutral: {
      main: '#ffffff',
      contrastText: '#5D6BE4',
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <UserProvider>
      <ThemeProvider theme={theme}>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </ThemeProvider>
    </UserProvider>
  </BrowserRouter>
);
