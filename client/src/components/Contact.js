import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform validation and send form data to the server
        console.log('Form submitted', formData);
    };

    return (
        <div className="contact-container">
            <div className="contact-header">
                <h2>Contact</h2>
                <p>Home {'>'} Contact</p>
            </div>
            <div className="contact-content">
                <div className="contact-info">
                    <h3>Get In Touch With Us</h3>
                    <p>
                        For more information about our product & services, please feel free to drop us an email. 
                        Our staff always be there to help you out. Do not hesitate!
                    </p>
                    <div className="contact-details">
                        <div>
                            <i className="fas fa-map-marker-alt"></i>
                            <p>Address</p>
                            <p>236 5th SE Avenue, New York NY10000, United States</p>
                        </div>
                        <div>
                            <i className="fas fa-phone"></i>
                            <p>Phone</p>
                            <p>Mobile: +1 (84) 546-6789</p>
                            <p>Hotline: +1 (84) 456-6789</p>
                        </div>
                        <div>
                            <i className="fas fa-clock"></i>
                            <p>Working Time</p>
                            <p>Monday-Friday: 9:00 - 22:00</p>
                            <p>Saturday-Sunday: 9:00 - 21:00</p>
                        </div>
                    </div>
                </div>
                <div className="contact-form">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Your name</label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Abc"
                            />
                            {errors.name && <p className="error-text">{errors.name}</p>}
                        </div>
                        <div className="form-group">
                            <label>Email address</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Abc@def.com"
                            />
                            {errors.email && <p className="error-text">{errors.email}</p>}
                        </div>
                        <div className="form-group">
                            <label>Subject</label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                placeholder="This is an optional"
                            />
                        </div>
                        <div className="form-group">
                            <label>Message</label>
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="Hi! I'd like to ask about"
                            ></textarea>
                            {errors.message && <p className="error-text">{errors.message}</p>}
                        </div>
                        <button type="submit" className="submit-button">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;
