import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import 'bootstrap-icons/font/bootstrap-icons.css';

function LogIn() {
    const [showPassword, setShowPassword] = useState(false);

    // react hook form 
    const { register, handleSubmit, reset } = useForm()


    const onSubmit = async (data) => {
        console.log(data)

        try {
            const res = await axios.post('http://localhost:3000/api/auth/login', data, {
                withCredentials: true
            }, {headers: {'Content-Type': 'application/json'}})
                .then(res => console.log(res))
                .catch(error => console.log(error))
                
        } catch (error) {
            console.log(error)
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

                        <button onClick={() => setShowPassword(!showPassword)}>
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