import React from 'react';
import ProfilePic from '../../assets/img/profile.jpg'
const ToolPanel = () => {
  return (
    <div className="tool-panel w-1/5 bg-white dark:bg-[#1C0C5B] border-r border-white shadow-lg p-4 ">
      <div className="user-profile flex items-center border-b">
        <img src={ProfilePic} alt="User Profile" className="ml-8 rounded-full w-16 h-16" />
        <div className="ml-8">
          <p className="text-lg font-semibold text-[#03AED2]">WT</p>
        </div>
      </div>
      <nav className="nav-links ml-8 ">
        <ul className='divide-y'>
          <li className="p-2"><a href="#notifications" className="text-[#03AED2]">แจ้งเตือน</a></li>
          <li className="p-2"><a href="#calendar" className="text-[#03AED2]">ปฏิทิน</a></li>
          <li className="p-2"><a href="#logs" className="text-[#03AED2]">บันทึกกิจกรรม</a></li>
          <li className="p-2"><a href="#dashboard" className="text-[#03AED2]">Dashboard</a></li>
          <li className="p-2"><a href="#members" className="text-[#03AED2]">Members</a></li>
        </ul>
      </nav>
    </div>
  );
};

export default ToolPanel;