import React from 'react';

const Task = ({ task, index, setCompleteTask, setDeleteTask }) => {
    const { name, description, completeStatus } = task;
    const handleCompleteTask = () => {
        setCompleteTask(task);
    }
    const handleDeleteTask = () => {
        setDeleteTask(task);
    }
    return (
        <tr>
            <th>{index + 1}</th>
            <td className={completeStatus && "line-through"}>{name} {completeStatus}</td>
            <td>{description}</td>
            <td>
                <label onClick={handleCompleteTask} for="my-complete-modal" class="btn modal-button btn-xs btn-success mr-2">Complete</label>
                <label onClick={handleDeleteTask} for="my-delete-modal" class="btn modal-button btn-xs btn-error">Delete</label>
            </td>
        </tr>
    );
};

export default Task;