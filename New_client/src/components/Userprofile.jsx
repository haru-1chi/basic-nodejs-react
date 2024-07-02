import React from 'react'
import ProfilePic from '../assets/img/profile.jpg'
function Userprofile() {
    return (
        <div className='Userprofile-page mt-12'>
            <div className="content bg-white w-[550px] rounded-2xl py-8 px-16 shadow-lg">
                <div className="head-profile flex flex-col items-center justify-center">
                    <img src={ProfilePic} alt="" className='w-28 rounded-full mt-6 mb-4'/>
                    <p className='text-2xl text-[#03AED2] mb-6'>@username</p>
                </div>
                <div className="body-profile">
                    <div className="data-profile">
                        <label htmlFor="" className='block text-xl text-[#03AED2]'>Firstname</label>
                        <input type="text" />
                    </div>
                    <div className="data-profile">
                        <label htmlFor="" className='block text-xl text-[#03AED2]'>Lastname</label>
                        <input type="text" />
                    </div>
                    <div className="data-profile">
                        <label htmlFor="" className='block text-xl text-[#03AED2]'>Birthday</label>
                        <input type="text" />
                    </div>
                    <div className="data-profile">
                        <label htmlFor="" className='block text-xl text-[#03AED2]'>Phone Number</label>
                        <input type="text" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Userprofile