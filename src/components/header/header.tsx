import { Box, Button, Container, Input, Typography } from '@mui/material';
import { SyntheticEvent, useState, useEffect, ChangeEvent } from 'react';
import { TCreateTaskDto, TUpdateTaskDto } from '../../services/api';
import { ITask } from '../../types/types';

interface Props {
    onCreateTask: (task: TCreateTaskDto) => Promise<void>;
    onUpdateTask: (task: TUpdateTaskDto) => Promise<void>;
    editTask: ITask | null;
}

export const Header = ({ editTask, onCreateTask, onUpdateTask }: Props) => {
    const [title, setTitle] = useState<ITask['title']>('');

    const handleChangeTitle = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTitle(e.target.value);
    };

    const handleCreateOrUpdateTask = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title) {
            return;
        }
        if (editTask !== null) {
            onUpdateTask({ title });
        } else {
            onCreateTask({ title, done: false });
        }
        setTitle('');
    };

    useEffect(() => {
        setTitle(editTask?.title || '');
    }, [editTask]);

    return (
        <Box
            component="header"
            sx={{
                position: 'fixed',
                left: 0,
                right: 0,
                zIndex: 1,
                backgroundColor: '#f3f3f3',
            }}
        >
            <Container maxWidth="md" disableGutters sx={{ padding: '20px 0', flex: '1' }}>
                <Box
                    component="form"
                    noValidate
                    autoComplete="off"
                    sx={{ display: 'flex', gap: '20px', alignItems: 'center' }}
                    onSubmit={handleCreateOrUpdateTask}
                >
                    <Typography>TODO:</Typography>
                    <Input name="title" fullWidth value={title} onChange={handleChangeTitle} />
                    <Button type="submit" variant="contained" color="primary">
                        {editTask !== null ? 'Save' : 'Add'}
                    </Button>
                </Box>
            </Container>
        </Box>
    );
};
