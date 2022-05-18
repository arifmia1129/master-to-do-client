import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import auth from '../firebase.init';
import CompleteTaskModal from './CompleteTaskModal';
import Loading from './Loading';
import Task from './Task';

const Main = () => {
    const [user, loading] = useAuthState(auth);
    const [completeTask, setCompleteTask] = useState(null);

    const { data: tasks, isLoading, refetch } = useQuery(["tasks", user], () => fetch(`http://localhost:5000/task/${user?.email}`).then(res => res.json()))
    if (loading || isLoading) {
        return <Loading />
    }

    const handleTask = e => {
        e.preventDefault();
        const name = e.target.name.value;
        const description = e.target.description.value;
        const task = {
            name,
            description,
            email: user?.email
        }
        fetch("http://localhost:5000/task", {
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
                    console.log(data);
                    e.target.reset();
                    refetch();
                }
            })
    }

    return (
        <div>
            <h2 className='md:text-4xl text-xl font-bold text-primary my-5'>Welcome to Master To Do {tasks.length}</h2>
            <div className='lg:flex justify-center items-center'>
                <div className='flex-1'>
                    <h3 className="text-xl text-secondary my-2">Add a new task.</h3>
                    <form onSubmit={handleTask}>
                        <input name="name" type="text" placeholder="Type task name" class="input input-bordered w-full lg:max-w-lg max-w-xs mb-1" />
                        <textarea name="description" class="textarea textarea-bordered w-full lg:max-w-lg max-w-xs mb-1" placeholder="Description about task"></textarea>
                        <input type="submit" class="input input-bordered w-full max-w-xs lg:max-w-lg btn-primary font-bold text-white" value="Add Task" />
                    </form>

                </div>
                <div class="overflow-x-auto flex-1">
                    <h3 className="text-xl text-secondary my-2">Your all task that you added.</h3>
                    <div class="overflow-x-auto">
                        <table class="table table-zebra w-full">
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
                                    tasks.map((task, index) => <Task
                                        key={task._id}
                                        task={task}
                                        index={index}
                                        setCompleteTask={setCompleteTask}
                                        refetch={refetch}
                                    ></Task>)
                                }
                            </tbody>
                        </table>
                    </div>
                    {
                        completeTask &&
                        <CompleteTaskModal
                            setCompleteTask={setCompleteTask}
                            completeTask={completeTask} />
                    }
                </div>
            </div>
        </div>
    );
};

export default Main;