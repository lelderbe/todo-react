import { IconButton } from '@mui/material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { ITask } from '../../types/types';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
    task: ITask;
    onRemoveTask: (id: string) => void;
    onToggleTask: (task: ITask) => void;
    onEditTask: (task: ITask) => void;
}

export const Task = ({ task, onRemoveTask, onToggleTask, onEditTask }: Props) => {
    const { id, title, done } = task;

    return (
        <ListItem
            key={id}
            secondaryAction={
                <>
                    <IconButton edge="end" aria-label="edit" onClick={() => onEditTask({ id, title, done })}>
                        <EditIcon />
                    </IconButton>
                    <IconButton aria-label="remove" onClick={() => onRemoveTask(id)}>
                        <DeleteForeverOutlinedIcon />
                    </IconButton>
                </>
            }
            disablePadding
        >
            <ListItemButton
                role={undefined}
                onClick={() => onToggleTask(task)}
                dense
                sx={{ paddingRight: '84px !important' }}
            >
                <ListItemText
                    id={id}
                    primary={title}
                    sx={done ? { textDecoration: 'line-through', color: '#ccc' } : {}}
                />
            </ListItemButton>
        </ListItem>
    );
};
