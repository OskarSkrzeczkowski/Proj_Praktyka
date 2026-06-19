import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';
import Home from './Home';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from '@clarity/ui';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
        <BrowserRouter>
            <Home />
        </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
