import { IconButton } from '@mui/material';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { ITask } from '../../types';
import api from '../../services/api';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import CommentIcon from '@mui/icons-material/Comment';

type Props = ITask & {
    onRemoveTask: (id: string) => void;
    onToggleTask: (id: string) => void;
};

export const Task = ({ id, title, done, onRemoveTask, onToggleTask }: Props) => {
    return (
        <ListItem
            key={id}
            secondaryAction={
                <>
                    <IconButton edge="end" aria-label="comments">
                        <CommentIcon />
                    </IconButton>
                    <IconButton aria-label="remove product" onClick={() => onRemoveTask(id)}>
                        <DeleteForeverOutlinedIcon />
                    </IconButton>
                </>
            }
            disablePadding
        >
            <ListItemButton role={undefined} onClick={() => onToggleTask(id)} dense>
                <ListItemIcon>
                    <Checkbox
                        edge="start"
                        checked={done}
                        tabIndex={-1}
                        disableRipple
                        // inputProps={{ 'aria-labelledby': labelId }}
                    />
                </ListItemIcon>
                <ListItemText id={String(id)} primary={title} />
            </ListItemButton>
        </ListItem>
    );
};
