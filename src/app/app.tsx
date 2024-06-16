import { useEffect, useState } from 'react';
import { Header } from '../components/header/header';
import { Tasks } from '../components/tasks/tasks';
import { Box, Container, CssBaseline } from '@mui/material';
import { ITask } from '../types/types';
import api, { TCreateTaskDto, TUpdateTaskDto } from '../services/api';
import { Loader } from '../components/loader/loader';
import { toast } from 'react-toastify';
import { getMessageFromError } from '../utils/error-utils';

export const App = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [editTask, setEditTask] = useState<ITask | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    const getTasks = async () => {
        try {
            const data = await api.getTasks();
            setTasks(data.reverse());
        } catch (error) {
            toast.error(getMessageFromError(error, 'Неизвестная ошибка при получении списка задач, попробуйте позже'));
        } finally {
            setLoading(false);
        }
    };

    const handleCreateTask = async (task: TCreateTaskDto) => {
        try {
            await api.createTask(task);
            getTasks();
        } catch (error) {
            toast.error(getMessageFromError(error, 'Неизвестная ошибка при создании задачи, попробуйте позже'));
        }
    };

    const handleUpdateTask = async (task: TUpdateTaskDto) => {
        try {
            if (editTask !== null) {
                await api.updateTask(editTask.id, task);
                setEditTask(null);
                getTasks();
            }
        } catch (error) {
            toast.error(getMessageFromError(error, 'Неизвестная ошибка при сохранении задачи, попробуйте позже'));
        }
    };

    const handleEditTask = (task: ITask) => {
        setEditTask(task);
    };

    const handleRemoveTask = async (id: string) => {
        try {
            await api.removeTask(id);
            if (editTask?.id === id) {
                setEditTask(null);
            }
            getTasks();
        } catch (error) {
            toast.error(getMessageFromError(error, 'Неизвестная ошибка при удалении задачи, попробуйте позже'));
        }
    };

    const handleToggleTask = async (task: ITask) => {
        try {
            await api.updateTask(task.id, { done: !task.done });
            getTasks();
        } catch (error) {
            toast.error(getMessageFromError(error, 'Неизвестная ошибка, попробуйте позже'));
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
