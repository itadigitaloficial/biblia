import React from 'react';
import { Box, Button, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import AdSense from './AdSense';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 3,
      }}
    >
      <Container maxWidth="sm">
        <AdSense />
        <Box
          sx={{
            textAlign: 'center',
            color: 'white',
            mb: 4,
          }}
        >
          <MenuBookIcon sx={{ fontSize: 60, mb: 2 }} />
          <Typography variant="h3" component="h1" gutterBottom>
            Bíblia Online
          </Typography>
          <Typography variant="h6" sx={{ mb: 4 }}>
            Leia e compartilhe a palavra de Deus
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/reader')}
            sx={{
              backgroundColor: 'white',
              color: '#1976d2',
              '&:hover': {
                backgroundColor: '#f5f5f5',
              },
              borderRadius: 8,
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
            }}
          >
            Começar a Ler
          </Button>
        </Box>
        <AdSense />
      </Container>
    </Box>
  );
};

export default Home;
