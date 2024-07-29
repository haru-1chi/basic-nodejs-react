import React from 'react';
import { formatDateToDDMMYYYY } from '../utils/formatDate';

const ProfileView = ({ user, toggleEditMode }) => (
    <>
        <div className="data-profile">
            <ProfileField label="Firstname" value={user.first_name} />
            <ProfileField label="Lastname" value={user.last_name} />
            <ProfileField label="Birthday" value={formatDateToDDMMYYYY(new Date(user.birthday).toISOString().split('T')[0])} />
            <ProfileField label="Phone Number" value={user.tel} />
        </div>
        <div className="btn-submit mt-6 max-w-lg w-full flex justify-center">
            <button type="button" className='submit-button bg-[#68D2E8] dark:bg-[#C996CC] text-xl text-white rounded-full py-2 px-8' onClick={toggleEditMode}>
                Edit Profile
            </button>
        </div>
    </>
);

const ProfileField = ({ label, value }) => (
    <div className="data-profile grid grid-cols-2 mb-8 flex items-center">
        <label className='block text-xl text-[#03AED2] dark:text-[#C996CC]'>{label}</label>
        <p className='block text-xl text-[#03AED2] dark:text-[#C996CC]'>{value}</p>
    </div>
);

export default ProfileView;