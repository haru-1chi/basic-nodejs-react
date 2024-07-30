import React from 'react';
import ProfileField from './ProfileField';
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
            <button className='submit-button bg-[#68D2E8] dark:bg-[#C996CC] text-xl text-white rounded-full py-2 px-8' onClick={toggleEditMode}>
                Edit Profile
            </button>
        </div>
    </>
);

export default ProfileView;