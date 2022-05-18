import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loading from './Loading';
import auth from '../firebase.init';
import { useCreateUserWithEmailAndPassword, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";

const Register = () => {
    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });

    const [updateProfile, updating, updateError] = useUpdateProfile(auth);

    const navigate = useNavigate();

    let signInError;

    const { register, formState: { errors }, handleSubmit } = useForm();
    const onSubmit = async (data) => {
        await createUserWithEmailAndPassword(data.email, data.password);
        await updateProfile({ displayName: data.name });
    };

    useEffect(() => {
        if (user || gUser) {
            navigate("/");
        }
    }, [user, gUser, navigate]);

    if (loading || gLoading || updating) {
        return <Loading />
    }

    if (error || gError || updateError) {
        signInError = <p className='text-red-500'><small>{error?.message.split(":")[1] || gError?.message.split(":")[1] || updateError?.message.split(":")[1]}</small></p>
    }
    return (
        <div className='flex justify-center items-center h-4/5'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-secondary text-center">Sign Up</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input
                                {...register("name", {
                                    required: {
                                        value: true,
                                        message: "Name field is required."
                                    }
                                })}
                                type="text"
                                placeholder="Type Name"
                                className="input input-bordered w-full max-w-xs" />
                            <label className="label">
                                {errors.name?.type === 'required' && <span className="label-text-alt text-red-500">{errors.name.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input
                                {...register("email", {
                                    required: {
                                        value: true,
                                        message: "Email field is required."
                                    },
                                    pattern: {
                                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                                        message: 'Enter a valid email address.'
                                    }
                                })}
                                type="email"
                                placeholder="Type Email"
                                className="input input-bordered w-full max-w-xs" />
                            <label className="label">
                                {errors.email?.type === 'required' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                                {errors.email?.type === 'pattern' && <span className="label-text-alt text-red-500">{errors.email.message}</span>}
                            </label>
                        </div>
                        <div className="form-control w-full max-w-xs">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                {...register("password", {
                                    required: {
                                        value: true,
                                        message: "Password field is required."
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Must be 6 characters or longer.'
                                    }
                                })}
                                type="password"
                                placeholder="Password"
                                className="input input-bordered w-full max-w-xs" />
                            <label className="label">
                                {errors.password?.type === 'required' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                                {errors.password?.type === 'minLength' && <span className="label-text-alt text-red-500">{errors.password.message}</span>}
                            </label>
                        </div>
                        <div className='pb-3'>
                            {signInError}
                        </div>
                        <input className='btn btn-secondary text-white w-full max-w-xs bg-gradient-to-r from-secondary to-primary' type="submit" value="Sign Up" />
                    </form>

                    <p className='text-center'><small>Already have an account? <Link className='text-secondary font-bold' to="/login">Login Now</Link></small></p>

                    <div className="divider text-secondary">OR</div>
                    <button
                        onClick={() => signInWithGoogle()}
                        className="btn btn-outline">Continue With Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;