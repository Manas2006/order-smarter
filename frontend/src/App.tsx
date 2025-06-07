import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { CartAnalyzer } from './components/CartAnalyzer';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
    },
    typography: {
        fontFamily: '"Inter", "Helvetica", "Arial", sans-serif',
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container>
                <CartAnalyzer />
            </Container>
        </ThemeProvider>
    );
}

export default App;
