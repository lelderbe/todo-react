import { CircularProgress, Stack } from '@mui/material';

export const Loader = () => {
    return (
        <Stack alignItems="center" justifyContent="center" flex={1}>
            <CircularProgress />
        </Stack>
    );
};
