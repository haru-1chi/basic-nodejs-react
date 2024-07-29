import React from 'react';

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

const ProfileField = ({ label, name, type = "text", value, onChange, error }) => (
    <div className="data-profile grid grid-cols-2 mb-8 flex items-center">
        <label className='block text-xl text-[#03AED2] dark:text-[#C996CC]'>{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            className="p-1 pl-3 border border-[#68D2E8] dark:border-[#C996CC] rounded-full w-full text-xl text-[#03AED2] dark:text-[#C996CC]"
            onChange={onChange}
        />
        {error && <p className="error-text">{error}</p>}
    </div>
);

export default ProfileForm;