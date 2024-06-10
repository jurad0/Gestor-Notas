// src/App.jsx
import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, ThemeContext } from './contexts/ThemeContext';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import './styles/home.css';
import './styles/theme.css'; // Asegúrate de que los estilos de tema estén importados

function AppContent() {
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-theme' : 'dark-theme';
  }, [theme]);

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
