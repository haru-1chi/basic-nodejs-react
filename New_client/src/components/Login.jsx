import React from 'react'

function Login() {
    return (
        <div className='Login-page mt-12'>
            <div className="content bg-white w-[550px] rounded-2xl py-8 px-16 shadow-lg">
                <h1 className='text-4xl text-[#03AED2] text-center mb-6'>Login</h1>
                <form action="">
                    <div className="form-group mb-4">
                        <label htmlFor="" className="block text-xl text-[#03AED2] mb-1">E-mail</label>
                        <input type="email" name='email' className="mt-1 p-2 pl-3 border border-[#68D2E8] rounded-full w-full"/>
                    </div>
                    <div className="form-group mb-4">
                        <label htmlFor="" className="block text-xl text-[#03AED2] mb-1">Password</label>
                        <input type="password" name='password' className="mt-1 p-2 pl-3 border border-[#68D2E8] rounded-full w-full" />
                    </div>
                    <div className="btn-submit mt-6 max-w-lg w-full flex justify-center">
                        <button type='submit' className='submit-button bg-[#68D2E8] text-xl text-white rounded-full py-2 px-8'>Login</button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default Login