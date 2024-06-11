import { ITask } from '../../types';

export const Task = ({ id, title }: ITask) => {
    return (
        <div>
            {id} - {title}
        </div>
    );
};
