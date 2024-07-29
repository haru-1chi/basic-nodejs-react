export const validateSignupForm = (formData) => {
    const { username, email, password, confirmPassword } = formData;
    let errors = {};

    if (!username) errors.username = "Your username is required";
    else if (username.length > 25) errors.username = "Username cannot exceed 25 characters";

    if (!email) errors.email = "Your email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Enter a valid email address";

    if (!password) errors.password = "Your password is required";
    else if (password.length < 8) errors.password = "Password must be at least 8 characters long";

    if (!confirmPassword) errors.confirmPassword = "Your confirmPassword is required";
    else if (password !== confirmPassword) errors.confirmPassword = "Passwords do not match";

    return errors;
};

export const validateForm = (formData) => {
    const errors = {};

    if (!formData.email) {
        errors.email = "Your email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        errors.email = "Enter a valid email address";
    }

    if (!formData.password) {
        errors.password = "Your password is required";
    }

    return errors;
};