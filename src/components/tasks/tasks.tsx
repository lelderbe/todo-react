import { Task } from '../task/task';
import { ITask } from '../../types/types';
import { List } from '@mui/material';

interface Props {
    tasks: ITask[];
    onEditTask: (task: ITask) => void;
    onRemoveTask: (id: string) => void;
    onToggleTask: (id: string) => void;
}

export const Tasks = ({ tasks, onEditTask, onRemoveTask, onToggleTask }: Props) => {
    return (
        <List sx={{ mt: '80px', bgcolor: 'background.paper' }}>
            {tasks.map((item) => (
                <Task
                    key={item.id}
                    {...item}
                    onRemoveTask={onRemoveTask}
                    onToggleTask={onToggleTask}
                    onEditTask={onEditTask}
                />
            ))}
        </List>
    );
};
