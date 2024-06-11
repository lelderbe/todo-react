import { useEffect, useState } from 'react';
import { Task } from '../task/task';
import api from '../../services/api';
import { ITask } from '../../types';

export const Tasks = () => {
    const [tasks, setTasks] = useState<ITask[]>([]);

    useEffect(() => {
        api.getTasks()
            .then((data) => {
                setTasks(data);
            })
            .catch((err) => console.error(err));
    }, []);

    return (
        <div>
            {tasks.map((item) => (
                <Task key={item.id} {...item} />
            ))}
        </div>
    );
};
