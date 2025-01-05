import React from 'react';
import { Box, Button, Container, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuBookIcon from '@mui/icons-material/MenuBook';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: 4,
            textAlign: 'center',
            background: 'rgba(255, 255, 255, 0.95)',
            borderRadius: 4,
          }}
        >
          <MenuBookIcon sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
          <Typography
            variant="h2"
            component="h1"
            sx={{
              mb: 3,
              fontWeight: 'bold',
              background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Bíblia Online
          </Typography>
          <Typography variant="h5" sx={{ mb: 4, color: '#666' }}>
            Explore a palavra de Deus em diferentes versões,
            com uma interface moderna e fácil de usar.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/reader')}
            sx={{
              px: 4,
              py: 2,
              fontSize: '1.2rem',
              borderRadius: '25px',
              background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
              '&:hover': {
                background: 'linear-gradient(45deg, #1976d2 50%, #21CBF3 100%)',
              },
            }}
          >
            Começar a Leitura
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;
