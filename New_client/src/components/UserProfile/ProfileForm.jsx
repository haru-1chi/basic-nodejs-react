import React from 'react';
import ProfileField from './ProfileField';

const ProfileForm = ({ formData, handleChange, handleSubmit, errors, isSubmitting, toggleEditMode }) => (
    <>
        <form onSubmit={handleSubmit} className="body-profile">
            <ProfileField label="Firstname" name="first_name" value={formData.first_name} onChange={handleChange} error={errors.first_name} />
            <ProfileField label="Lastname" name="last_name" value={formData.last_name} onChange={handleChange} error={errors.last_name} />
            <ProfileField label="Birthday" name="birthday" type="date" value={formData.birthday} onChange={handleChange} error={errors.birthday} />
            <ProfileField label="Phone Number" name="tel" value={formData.tel} onChange={handleChange} error={errors.tel} />
            <div className="btn-submit mt-6 max-w-lg w-full flex justify-center">
                <button type="button" className='submit-button bg-[#68D2E8] dark:bg-[#C996CC] text-xl text-white rounded-full py-2 px-8 mr-5' onClick={toggleEditMode}>
                    Cancel
                </button>
                <button type="submit" className='submit-button bg-[#68D2E8] dark:bg-[#C996CC] text-xl text-white rounded-full py-2 px-8' disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Save Changes"}
                </button>
            </div>
        </form>
    </>
);

export default ProfileForm;