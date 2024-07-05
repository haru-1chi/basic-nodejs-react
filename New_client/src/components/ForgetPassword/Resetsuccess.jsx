import React from 'react'
import { Link } from 'react-router-dom';
function Resetsuccess() {
    return (
        <div className='Home-page flex justify-center mt-20'>
            <div className="content w-[769px] h-[540px] bg-white rounded-[20px] px-12 shadow-lg content-center">
                <h1 className='text-5xl text-[#03AED2] text-center mb-14'>Password Reset Successfully</h1>
                <div className="btn-submit mt-6 w-full flex justify-center">
                    <Link to="/login" className="submit-button bg-[#68D2E8] text-xl text-white rounded-full py-2 px-8">Login</Link>
                </div>
            </div>
        </div>
    )
}

export default Resetsuccess