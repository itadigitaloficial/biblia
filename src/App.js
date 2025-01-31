import './App.css';
import { ThemeProvider, createTheme, CssBaseline, useMediaQuery } from '@mui/material';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BibleReader from './components/BibleReader';
import Home from './components/Home';
import DesktopWarning from './components/DesktopWarning';
import InstallPWA from './components/InstallPWA';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
      light: '#42a5f5',
      dark: '#1565c0',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h6: {
      fontWeight: 600,
    },
    subtitle2: {
      letterSpacing: 0.5,
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: '#1976d2',
          borderBottom: '1px solid rgba(0, 0, 0, 0.12)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff',
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

function App() {
  const isDesktop = useMediaQuery('(min-width:1024px)');

  if (isDesktop) {
    return (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DesktopWarning />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reader" element={<BibleReader />} />
        </Routes>
        <InstallPWA />
      </Router>
    </ThemeProvider>
  );
}

export default App;
