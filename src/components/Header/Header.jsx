// src/components/Header/Header.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import "./Header.css";

const Header = () => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <IconButton onClick={() => navigate(-1)} aria-label="back">
        <ArrowBackIcon />
      </IconButton>
      <IconButton onClick={() => navigate("/")} aria-label="home">
        <HomeIcon />
      </IconButton>
    </div>
  );
};

export default Header;