import { useEffect, useState } from 'react';
import { Header } from '../components/header/header';
import { Tasks } from '../components/tasks/tasks';
import { Box, Container, CssBaseline } from '@mui/material';
import { ITask } from '../types/types';
import api, { TCreateTaskDto, TUpdateTaskDto } from '../services/api';
import { Loader } from '../components/loader/loader';

export const App = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [editTask, setEditTask] = useState<ITask | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const getTasks = async () => {
        try {
            // setLoading(true);
            const data = await api.getTasks();
            setTasks(data.reverse());
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTask = async (task: TCreateTaskDto) => {
        await api.createTask(task);
        getTasks();
    };

    const handleUpdateTask = async (task: TUpdateTaskDto) => {
        if (editTask !== null) {
            await api.updateTask(editTask.id, task);
            setEditTask(null);
            getTasks();
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

    const handleToggleTask = async (task: ITask) => {
        await api.updateTask(task.id, { done: !task.done });
        getTasks();
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
            <Header editTask={editTask} onCreateTask={handleCreateTask} onUpdateTask={handleUpdateTask} />
            <Container
                component="main"
                maxWidth="sm"
                disableGutters
                sx={{ display: 'flex', pt: '80px', flexDirection: 'column', flex: '1' }}
            >
                {loading && <Loader />}
                {!loading && (
                    <Tasks
                        tasks={tasks}
                        onEditTask={handleEditTask}
                        onRemoveTask={handleRemoveTask}
                        onToggleTask={handleToggleTask}
                    />
                )}
            </Container>
        </Box>
    );
};
