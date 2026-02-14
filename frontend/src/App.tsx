import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import AppRoutes from './AppRoutes';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const theme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        main: '#3ebc8c',
      },
    },
  });

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRoutes />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
