import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import auth from '../firebase.init';
import CompleteTaskModal from './CompleteTaskModal';
import DeleteTaskModal from './DeleteTaskModal';
import Loading from './Loading';
import Task from './Task';

const Main = () => {
    const [user, loading] = useAuthState(auth);
    const [load, setLoad] = useState(false);
    const [completeTask, setCompleteTask] = useState(null);
    const [deleteTask, setDeleteTask] = useState(null);

    const { data: tasks, isLoading, refetch } = useQuery(["tasks", user], () => fetch(`https://master-to-do-server.onrender.com/task/${user?.email}`).then(res => res.json()))
    if (loading || isLoading || load) {
        return <Loading />
    }

    const handleTask = e => {
        e.preventDefault();
        setLoad(true);
        const name = e.target.name.value;
        const description = e.target.description.value;
        const task = {
            name,
            description,
            email: user?.email
        }
        fetch("https://master-to-do-server.onrender.com/task", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(task)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged && data.insertedId) {
                    toast.success("Task added!");
                    e.target.reset();
                    refetch();
                    setLoad(false);
                }
            })
    }

    return (
        <div>
            <h2 className='md:text-4xl text-xl font-bold text-primary my-5'>Welcome to Master To Do</h2>
            <div className='lg:flex justify-center items-center'>
                <div className='flex-1'>
                    <h3 className="text-xl text-secondary my-2">Add a new task.</h3>
                    <form onSubmit={handleTask}>
                        <input name="name" type="text" placeholder="Type task name" className="input input-bordered w-full lg:max-w-lg max-w-xs mb-1" />
                        <textarea name="description" className="textarea textarea-bordered w-full lg:max-w-lg max-w-xs mb-1" placeholder="Description about task"></textarea>
                        <input type="submit" className="input input-bordered w-full max-w-xs lg:max-w-lg btn-primary font-bold text-white" value="Add Task" />
                    </form>

                </div>
                <div className="overflow-x-auto flex-1">
                    <h3 className="text-xl text-secondary my-2">Your all task that you added.</h3>
                    <div className="overflow-x-auto">
                        <table className="table table-zebra w-full">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Task</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    tasks?.map((task, index) => <Task
                                        key={task._id}
                                        task={task}
                                        index={index}
                                        setCompleteTask={setCompleteTask}
                                        setDeleteTask={setDeleteTask}
                                    ></Task>)
                                }
                            </tbody>
                        </table>
                    </div>

                </div>
            </div>
            {
                completeTask &&
                <CompleteTaskModal
                    setCompleteTask={setCompleteTask}
                    completeTask={completeTask}
                    refetch={refetch} />
            }
            {
                deleteTask &&
                <DeleteTaskModal
                    setDeleteTask={setDeleteTask}
                    deleteTask={deleteTask}
                    refetch={refetch} />
            }
        </div>
    );
};

export default Main;