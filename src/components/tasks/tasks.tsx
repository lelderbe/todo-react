import { useEffect, useState } from 'react';
import { Task } from '../task/task';
import api from '../../services/api';
import { ITask } from '../../types';
import List from '@mui/material/List';

export const Tasks = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);

    const getTasks = async () => {
        try {
            const data = await api.getTasks();
            setTasks(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleRemoveTask = async (id: string) => {
        await api.removeTask(id);
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
        <List sx={{ width: '100%', maxWidth: '600px', bgcolor: 'background.paper' }}>
            {tasks.map((item) => (
                <Task key={item.id} {...item} onRemoveTask={handleRemoveTask} onToggleTask={handleToggleTask} />
            ))}
        </List>
    );
};
