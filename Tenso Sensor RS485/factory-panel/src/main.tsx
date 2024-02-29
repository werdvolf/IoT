import ReactDOM from 'react-dom/client'
import { StyledEngineProvider, ThemeProvider } from '@mui/material'
import App from './App.tsx'
import './index.css'
import theme from './components/UI/Palette/Palette.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <StyledEngineProvider injectFirst>
      <App />
    </StyledEngineProvider>
  </ThemeProvider>
)
