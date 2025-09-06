import React from 'react'

function LogIn() {
    return (
        <div className='login-page h-[100vh] login-background center'>
            <div className='login-details w-[40rem] h-[50vh] rounded-md center flex-col'>
                <img className='w-[80px] mb-9' src='../../assets/icons/medicine.png' />

                <div>
                    <div className='login-info'>
                        <img className='w-[20px]' src='../../assets/icons/email.png'/>        
                        <input placeholder='Email' />
                    </div>

                      <div className='login-info'>
                        <img className='w-[20px]' src='../../assets/icons/padlock.png'/>        
                    <input type='password' placeholder='Password' />
                    </div>


                    <button className='bg-brandYellow mt-5 rounded-md px-[8rem] py-2'>Log In</button>
                </div>
            </div>
        </div>
    )
}

export default LogIn