import React, { useEffect, useState } from 'react';
import { Button, Snackbar, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import GetAppIcon from '@mui/icons-material/GetApp';

const InstallPWA = () => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);
  const [showInstallMessage, setShowInstallMessage] = useState(false);
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };

    // Detecta se é iOS
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    setIsIOS(isIOSDevice);

    window.addEventListener('beforeinstallprompt', handler);

    // Verifica se já está instalado
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setSupportsPWA(false);
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const onClick = async () => {
    if (!promptInstall) {
      if (isIOS) {
        setShowInstallMessage(true);
      }
      return;
    }
    promptInstall.prompt();
    const { outcome } = await promptInstall.userChoice;
    if (outcome === 'accepted') {
      setSupportsPWA(false);
    }
  };

  const handleCloseMessage = () => {
    setShowInstallMessage(false);
  };

  if (!supportsPWA && !isIOS) return null;

  const getInstallMessage = () => {
    if (isIOS) {
      return (
        <>
          Para instalar o app no iOS:
          <br />
          1. Toque no botão compartilhar
          <br />
          2. Selecione "Adicionar à Tela Inicial"
        </>
      );
    }
    return 'Instalar App';
  };

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        onClick={onClick}
        startIcon={<GetAppIcon />}
        sx={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          borderRadius: '20px',
          padding: '10px 20px',
          boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
          zIndex: 1000,
        }}
      >
        Instalar App
      </Button>

      <Snackbar
        open={showInstallMessage}
        autoHideDuration={10000}
        onClose={handleCloseMessage}
        message={getInstallMessage()}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleCloseMessage}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        }
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: '#1976d2',
            color: 'white',
          },
        }}
      />
    </>
  );
};

export default InstallPWA;
