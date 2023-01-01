import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Loading from './Loading';

const DeleteTaskModal = ({ deleteTask, setDeleteTask, refetch }) => {
    const [loading, setLoading] = useState(false);
    const { _id } = deleteTask;
    if (loading) {
        return <Loading />
    }
    const handleComplete = () => {
        setLoading(true);
        fetch(`https://master-to-do-server.onrender.com/task/${_id}`, {
            method: "DELETE",
            headers: {
                "content-type": "application/json"
            },
        })
            .then(res => res.json())
            .then(data => {

                if (data.acknowledged && data.deletedCount === 1) {
                    toast.success("Delete task operation success.");
                    setDeleteTask(null);
                    refetch();
                    setLoading(false);
                }
            })
    }
    return (
        <div>
            <input type="checkbox" id="my-delete-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box w-11/12 max-w-5xl">
                    <h3 className="font-bold text-lg text-red-500">Are you sure delete this task?</h3>
                    <p className="py-4">If you confirmed can't access this task information forever.</p>
                    <div className="modal-action">
                        <label onClick={handleComplete} htmlFor="my-delete-modal" className="btn btn-error text-white">Yes</label>
                        <label onClick={() => setDeleteTask(null)} htmlFor="my-delete-modal" className="btn btn-success text-white">No</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteTaskModal;