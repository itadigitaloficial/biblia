import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import TabletIcon from '@mui/icons-material/Tablet';

const DesktopWarning = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(45deg, #1976d2 30%, #21CBF3 90%)',
        padding: 3,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          maxWidth: 600,
          textAlign: 'center',
          borderRadius: 4,
          background: 'rgba(255, 255, 255, 0.95)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 2,
            mb: 3,
          }}
        >
          <PhoneIphoneIcon sx={{ fontSize: 48, color: '#1976d2' }} />
          <TabletIcon sx={{ fontSize: 48, color: '#1976d2' }} />
        </Box>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: '#1976d2' }}>
          Versão Mobile
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, color: '#666' }}>
          Esta aplicação foi otimizada para dispositivos móveis e tablets.
        </Typography>
        <Typography sx={{ color: '#666' }}>
          Por favor, acesse através de um smartphone ou tablet para a melhor experiência.
        </Typography>
        <Box
          sx={{
            mt: 4,
            p: 2,
            backgroundColor: '#f5f5f5',
            borderRadius: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            Dica: Você também pode redimensionar sua janela do navegador para uma largura menor que 1024px.
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default DesktopWarning;
