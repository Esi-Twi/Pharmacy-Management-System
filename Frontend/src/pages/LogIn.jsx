import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import 'bootstrap-icons/font/bootstrap-icons.css';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios'
import { toast } from 'sonner';

function LogIn() {
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, reset } = useForm()

    const { login } = useAuth()
    const navigate = useNavigate()

    const onSubmit = async (data) => {
        try {
            if(!data.email || !data.password) {
                return  toast.error("Email and Password are required", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            }

            const res = await api.post("api/auth/login", data, {
                headers: { 'Content-Type': 'application/json' }
            })

            login(res.data.user, res.data.token)
            navigate('/dashboard')

        } catch (error) {
            let message = 'Login failed!!';

            if (error.response) {
                const serverMessage = error.response.data.msg || error.response.data.error;

                if (serverMessage?.includes("fails to match the required pattern")) {
                    message = "Password must contain at least one uppercase letter and one number.";
                } else {
                    message = serverMessage;
                }

            } else if (error.request) {
                message = 'No response from server. Please try again.';
            } else {
                message = error.message;
            }

            toast.error(message, {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                closeButton: true
            });
        }
    }

    return (
        <div className='login-page h-[100vh] login-background center'>
            <div className='login-details w-[40%] h-[50vh] rounded-md center flex-col'>
                <img className='w-[80px] mb-9' src='../../assets/icons/medicine.png' />

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='login-info'>
                        <img className='w-[20px]' src='../../assets/icons/email.png' />
                        <input placeholder='Email' {...register("email")} />
                    </div>

                    <div className='login-info'>
                        <img className='w-[20px]' src='../../assets/icons/padlock.png' />
                        <input type={showPassword ? 'text' : 'password'}
                            placeholder='Password'  {...register("password")} />

                        <button type='button' onClick={() => setShowPassword(!showPassword)}>
                            <i className={`bi ${showPassword ? "bi-eye" : "bi-eye-slash"} text-lg`}></i>
                        </button>
                    </div>


                    <button className='bg-brandYellow mt-5 rounded-md px-[8rem] py-2'>Log In</button>
                </form>
            </div>
        </div>
    )
}

export default LogIn