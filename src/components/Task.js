import React from 'react';

const Task = ({ task, index }) => {
    const { name, description } = task;
    return (
        <tr>
            <th>{index + 1}</th>
            <td>{name}</td>
            <td>{description}</td>
            <td>
                <button className='btn btn-xs btn-success mr-2'>Complete</button>
                <button className='btn btn-xs btn-error'>Delete</button>
            </td>
        </tr>
    );
};

export default Task;