import { Tasks } from '../components/tasks/tasks';
import { Box, Container, CssBaseline } from '@mui/material';

export const App = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <CssBaseline />
            <Container component="main" disableGutters sx={{ padding: '20px 0', flex: '1' }}>
                <h1>ToDo App</h1>
                <Tasks />
            </Container>
        </Box>
    );
};
