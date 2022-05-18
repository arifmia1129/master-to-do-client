import React, { useEffect, useState } from 'react';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../firebase.init';
import Loading from './Loading';

const Login = () => {

    const [signInWithGoogle, gUser, gLoading, gError] = useSignInWithGoogle(auth);

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    let signInError;
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";

    const { register, formState: { errors }, handleSubmit } = useForm();
    const [email, setEmail] = useState("");
    const [sendPasswordResetEmail, sending, RError] = useSendPasswordResetEmail(
        auth
    );

    const onSubmit = (data) => {
        signInWithEmailAndPassword(data.email, data.password);
    };

    useEffect(() => {
        if (user || gUser) {
            navigate(from, { replace: true });
        }
    }, [user, gUser, from, navigate]);

    if (loading || gLoading || sending) {
        return <Loading />
    }


    if (error || gError || RError) {
        signInError = <p className='text-red-500'><small>{error?.message.split(":")[1] || gError?.message.split(":")[1]}</small></p>
    }

    const passwordReset = async () => {
        if (email) {
            await sendPasswordResetEmail(email);
            toast.success("Send email for reset password");
        }
        else {
            toast.error("Enter your valid email and then try again.")
        }
    }
    return (
        <div className='flex justify-center items-center h-4/5'>
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-secondary text-center">Login</h2>

                    <form onSubmit={handleSubmit(onSubmit)}>

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
                                onChange={(e) => setEmail(e?.target?.value)}
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
                        <div>
                            <button onClick={passwordReset} className='text-secondary'><small>Forgot password?</small></button>
                        </div>
                        <div className='pb-3'>
                            {signInError}
                        </div>

                        <input className='btn btn-secondary text-white w-full max-w-xs bg-gradient-to-r from-secondary to-primary' type="submit" value="Login" />
                    </form>

                    <p className='text-center'><small>New to Master To Do? <Link className='text-secondary font-bold' to="/register">Register Now</Link></small></p>

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

export default Login;