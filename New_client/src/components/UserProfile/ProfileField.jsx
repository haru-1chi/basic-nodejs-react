import React from 'react';

const ProfileField = ({ label, name, type = "text", value, onChange, error }) => (
    <div className="form-group grid grid-cols-2 mb-8 flex items-center mb-4">
        <label className='block text-xl text-[#03AED2] dark:text-[#C996CC]'>{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className={`input-field p-1 pl-3 border border-[#68D2E8] dark:border-[#C996CC] rounded-full w-full text-xl text-[#03AED2] dark:text-[#C996CC] ${error ? 'border-red-500' : 'border-[#E5E1F6]'} ${error ? 'dark:border-red-500' : 'dark:border-[#D8CBF5]'} ${error ? 'dark:text-red-500' : 'dark:text-[#B6A6D8]'}`}
        />
        {error && <span className="error-text text-red-500 dark:text-red-500">{error}</span>}
    </div>
);

export default ProfileField;