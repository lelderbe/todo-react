import { Box, Button, Container, Input, Typography } from '@mui/material';
import { SyntheticEvent, useState, useEffect, ChangeEvent } from 'react';
import api from '../../services/api';
import { ITask } from '../../types/types';

interface Props {
    getTasks: () => Promise<void>;
    editTask: ITask | null;
    setEditTask: React.Dispatch<React.SetStateAction<ITask | null>>;
}

export const Header = ({ getTasks, editTask, setEditTask }: Props) => {
    const [title, setTitle] = useState<ITask['title']>('');

    const handleChangeTitle = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTitle(e.target.value);
    };

    const handleCreateTask = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!title) {
            return;
        }
        if (editTask !== null) {
            await api.updateTask(editTask.id, { title });
            setEditTask(null);
        } else {
            await api.createTask({ title, done: false });
        }
        getTasks();
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
                    onSubmit={handleCreateTask}
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
