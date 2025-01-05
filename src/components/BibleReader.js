import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  IconButton,
  Grid,
  CircularProgress,
  Slider,
  Tooltip,
  Drawer,
  AppBar,
  Toolbar,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  ChevronLeft,
  ChevronRight,
  FormatSize,
  WhatsApp,
  Facebook,
  Instagram,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { getVersions, getBooks, getVerses } from '../services/api';

const BibleReader = () => {
  const [versions, setVersions] = useState([]);
  const [books, setBooks] = useState([]);
  const [currentVersion, setCurrentVersion] = useState('acf');
  const [currentBook, setCurrentBook] = useState('gn');
  const [currentChapter, setCurrentChapter] = useState(1);
  const [maxChapters, setMaxChapters] = useState(1);
  const [verses, setVerses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fontSize, setFontSize] = useState(18);
  const [currentBookName, setCurrentBookName] = useState('');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [versionsRes, booksRes] = await Promise.all([
          getVersions(),
          getBooks(),
        ]);
        setVersions(versionsRes.data);
        setBooks(booksRes.data);
        const currentBookData = booksRes.data.find(b => b.abbrev.pt === currentBook);
        if (currentBookData) {
          setMaxChapters(currentBookData.chapters);
          setCurrentBookName(currentBookData.name);
        }
      } catch (error) {
        console.error('Error fetching initial data:', error);
      }
    };
    fetchInitialData();
  }, [currentBook]);

  useEffect(() => {
    const fetchVerses = async () => {
      setLoading(true);
      try {
        const response = await getVerses(currentVersion, currentBook, currentChapter);
        setVerses(response.data.verses);
      } catch (error) {
        console.error('Error fetching verses:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVerses();
  }, [currentVersion, currentBook, currentChapter]);

  const handleBookChange = (event) => {
    const book = event.target.value;
    const bookData = books.find(b => b.abbrev.pt === book);
    setCurrentBook(book);
    setCurrentBookName(bookData.name);
    setCurrentChapter(1);
    setMaxChapters(bookData.chapters);
  };

  const handleChapterChange = (event) => {
    setCurrentChapter(event.target.value);
  };

  const handleShare = (verse, platform) => {
    const text = `${currentBookName} ${currentChapter}:${verse.number} - "${verse.text}" (${currentVersion.toUpperCase()})`;
    const encodedText = encodeURIComponent(text);
    
    let url = '';
    switch (platform) {
      case 'whatsapp':
        url = `https://api.whatsapp.com/send?text=${encodedText}`;
        break;
      case 'facebook':
        url = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}&quote=${encodedText}`;
        break;
      case 'instagram':
        // Como o Instagram não tem API direta de compartilhamento,
        // vamos copiar o texto para a área de transferência
        navigator.clipboard.writeText(text).then(() => {
          alert('Texto copiado! Agora você pode compartilhar no Instagram.');
        });
        return;
      default:
        return;
    }
    
    window.open(url, '_blank', 'width=600,height=400');
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const renderControls = () => (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>Configurações</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Versão</InputLabel>
            <Select
              value={currentVersion}
              label="Versão"
              onChange={(e) => setCurrentVersion(e.target.value)}
            >
              {versions.map((version) => (
                <MenuItem key={version.version} value={version.version}>
                  {version.version.toUpperCase()} - {version.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Livro</InputLabel>
            <Select
              value={currentBook}
              label="Livro"
              onChange={handleBookChange}
            >
              {books.map((book) => (
                <MenuItem key={book.abbrev.pt} value={book.abbrev.pt}>
                  {book.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <FormControl fullWidth>
            <InputLabel>Capítulo</InputLabel>
            <Select
              value={currentChapter}
              label="Capítulo"
              onChange={handleChapterChange}
            >
              {[...Array(maxChapters)].map((_, index) => (
                <MenuItem key={index + 1} value={index + 1}>
                  Capítulo {index + 1}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <FormatSize />
            <Tooltip title="Ajustar tamanho da fonte">
              <Slider
                value={fontSize}
                onChange={(e, newValue) => setFontSize(newValue)}
                min={14}
                max={32}
                valueLabelDisplay="auto"
                aria-label="Tamanho da fonte"
              />
            </Tooltip>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Box sx={{ pb: 7 }}>
      <AppBar position="fixed" color="primary" elevation={0}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ ml: 2, flex: 1 }}>
            {currentBookName} {currentChapter}
          </Typography>
          <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
            {versions.find(v => v.version === currentVersion)?.name || currentVersion.toUpperCase()}
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor={isMobile ? 'bottom' : 'left'}
        open={drawerOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            width: isMobile ? '100%' : 320,
            maxHeight: isMobile ? '80vh' : '100%',
            borderTopLeftRadius: isMobile ? 16 : 0,
            borderTopRightRadius: isMobile ? 16 : 0,
          },
        }}
      >
        {renderControls()}
      </Drawer>

      <Container 
        maxWidth="lg" 
        sx={{ 
          mt: 8,
          px: isMobile ? 2 : 3,
          py: 2,
        }}
      >
        {loading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Box>
            {verses.map((verse) => (
              <Box 
                key={verse.number}
                sx={{ 
                  position: 'relative',
                  mb: 2,
                  '&:hover .share-buttons': {
                    opacity: 1,
                  },
                }}
              >
                <Typography 
                  sx={{ 
                    fontSize: `${fontSize}px`, 
                    lineHeight: 1.8,
                    pr: isMobile ? 0 : 8,
                  }}
                >
                  <Box 
                    component="span" 
                    sx={{ 
                      fontWeight: 'bold', 
                      color: 'primary.main',
                      mr: 1,
                      fontSize: `${fontSize * 0.8}px`,
                    }}
                  >
                    {verse.number}
                  </Box>
                  {verse.text}
                </Typography>
                <Box 
                  className="share-buttons"
                  sx={{ 
                    position: isMobile ? 'relative' : 'absolute',
                    right: isMobile ? 'auto' : 0,
                    top: isMobile ? 'auto' : '50%',
                    transform: isMobile ? 'none' : 'translateY(-50%)',
                    display: 'flex',
                    gap: 1,
                    opacity: isMobile ? 1 : 0,
                    transition: 'opacity 0.2s',
                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                    padding: '4px',
                    borderRadius: '20px',
                    mt: isMobile ? 1 : 0,
                    justifyContent: isMobile ? 'center' : 'flex-start',
                  }}
                >
                  <Tooltip title="Compartilhar no WhatsApp">
                    <IconButton
                      size="small"
                      onClick={() => handleShare(verse, 'whatsapp')}
                      sx={{ color: '#25D366' }}
                    >
                      <WhatsApp />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Compartilhar no Facebook">
                    <IconButton
                      size="small"
                      onClick={() => handleShare(verse, 'facebook')}
                      sx={{ color: '#1877F2' }}
                    >
                      <Facebook />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Compartilhar no Instagram">
                    <IconButton
                      size="small"
                      onClick={() => handleShare(verse, 'instagram')}
                      sx={{ 
                        background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                        color: 'white',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #bc1888 0%, #cc2366 25%, #dc2743 50%, #e6683c 75%, #f09433 100%)',
                        },
                      }}
                    >
                      <Instagram />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            ))}
          </Box>
        )}
      </Container>

      <Paper
        elevation={3}
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 2,
          py: 1,
          backgroundColor: 'background.paper',
          borderTop: 1,
          borderColor: 'divider',
        }}
      >
        <IconButton
          onClick={() => currentChapter > 1 && setCurrentChapter(currentChapter - 1)}
          disabled={currentChapter === 1}
        >
          <ChevronLeft />
        </IconButton>
        <Typography variant="body2" sx={{ fontWeight: 'medium' }}>
          Capítulo {currentChapter} de {maxChapters}
        </Typography>
        <IconButton
          onClick={() => currentChapter < maxChapters && setCurrentChapter(currentChapter + 1)}
          disabled={currentChapter === maxChapters}
        >
          <ChevronRight />
        </IconButton>
      </Paper>
    </Box>
  );
};

export default BibleReader;
