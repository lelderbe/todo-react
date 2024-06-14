import { useEffect, useState } from 'react';
import { Header } from '../components/header/header';
import { Tasks } from '../components/tasks/tasks';
import { Box, Container, CssBaseline } from '@mui/material';
import { ITask } from '../types/types';
import api from '../services/api';

export const App = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [editTask, setEditTask] = useState<ITask | null>(null);

    const getTasks = async () => {
        try {
            const data = await api.getTasks();
            setTasks(data.reverse());
        } catch (error) {
            console.error(error);
        }
    };

    const handleEditTask = (task: ITask) => {
        setEditTask(task);
    };

    const handleRemoveTask = async (id: string) => {
        await api.removeTask(id);
        if (editTask?.id === id) {
            setEditTask(null);
        }
        getTasks();
    };

    const handleToggleTask = async (id: string) => {
        const task = tasks.find((item) => item.id === id);
        if (task) {
            await api.updateTask(id, { done: !task.done });
            getTasks();
        }
    };

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100vh',
            }}
        >
            <CssBaseline />
            <Header getTasks={getTasks} editTask={editTask} setEditTask={setEditTask} />
            <Container component="main" maxWidth="sm" disableGutters sx={{ flex: '1' }}>
                <Tasks
                    tasks={tasks}
                    onEditTask={handleEditTask}
                    onRemoveTask={handleRemoveTask}
                    onToggleTask={handleToggleTask}
                />
            </Container>
        </Box>
    );
};
