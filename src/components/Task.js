import React from 'react';

const Task = ({ task, index, setCompleteTask }) => {
    const { name, description, completeStatus } = task;
    const handleCompleteStatus = () => {
        setCompleteTask(task);
    }
    return (
        <tr>
            <th>{index + 1}</th>
            <td className={completeStatus && "line-through"}>{name} {completeStatus}</td>
            <td>{description}</td>
            <td>
                <label onClick={handleCompleteStatus} for="my-modal-5" class="btn modal-button btn-xs btn-success mr-2">Complete</label>
                <button className='btn btn-xs btn-error'>Delete</button>
            </td>
        </tr>
    );
};

export default Task;