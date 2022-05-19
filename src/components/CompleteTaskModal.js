import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Loading from './Loading';

const CompleteTaskModal = ({ completeTask, setCompleteTask, refetch }) => {
    const [loading, setLoading] = useState(false);
    const { _id } = completeTask;
    if (loading) {
        return <Loading />
    }
    const handleComplete = () => {
        setLoading(true);
        fetch(`http://localhost:5000/task/${_id}`, {
            method: "PUT",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({ completeStatus: true })
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged && data.modifiedCount === 1) {
                    toast.success("Complete task operation success.");
                    setCompleteTask(null);
                    refetch();
                    setLoading(false);
                }
            })
    }
    return (
        <div>
            <input type="checkbox" id="my-complete-modal" class="modal-toggle" />
            <div class="modal">
                <div class="modal-box w-11/12 max-w-5xl">
                    <h3 class="font-bold text-lg text-red-500">Are you sure complete this task?</h3>
                    <p class="py-4">If you confirmed thorough strike on this task.</p>
                    <div class="modal-action">
                        <label onClick={handleComplete} for="my-complete-modal" class="btn btn-error text-white">Yes</label>
                        <label onClick={() => setCompleteTask(null)} for="my-complete-modal" class="btn btn-success text-white">No</label>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default CompleteTaskModal;