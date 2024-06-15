import { Task } from '../task/task';
import { ITask } from '../../types/types';
import { List } from '@mui/material';

interface Props {
    tasks: ITask[];
    onEditTask: (task: ITask) => void;
    onRemoveTask: (id: string) => void;
    onToggleTask: (task: ITask) => void;
}

export const Tasks = ({ tasks, onEditTask, onRemoveTask, onToggleTask }: Props) => {
    return (
        <List sx={{ bgcolor: 'background.paper' }}>
            {tasks.map((item) => (
                <Task
                    key={item.id}
                    task={item}
                    onRemoveTask={onRemoveTask}
                    onToggleTask={onToggleTask}
                    onEditTask={onEditTask}
                />
            ))}
        </List>
    );
};
