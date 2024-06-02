import React, { useState } from 'react';
import './RegisterForm.css'; 

function RegisterForm() {
    const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
    const [errors, setErrors] = useState({});
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });

        if (name === 'confirmPassword') {
            setErrors({ ...errors, confirmPassword: formData.password !== value ? 'Passwords do not match' : '' });
        } else {
            setErrors({ ...errors, [name]: '' });
        }
    };

    const handleCheckboxChange = () => {
        setAgreedToTerms(!agreedToTerms);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        let formErrors = {};

        if (!agreedToTerms) formErrors.agreedToTerms = 'You must agree to the terms of service';      
        if (formData.name.length < 3 || formData.name.length > 30) formErrors.name = 'Name should be 3-30 characters long';
        if (!/\S+@\S+\.\S+/.test(formData.email)) formErrors.email = 'Invalid email address';      
        if (formData.password.length < 10 || !/[^a-zA-Z0-9]/.test(formData.password)) formErrors.password = 'Password should be at least 10 characters with a special character';        
        if (formData.password !== formData.confirmPassword) formErrors.confirmPassword = 'Should match the value entered in the Password field';
      
        setErrors(formErrors);

        if (Object.keys(formErrors).length === 0) {
            setRegistrationSuccess(true);
            setTimeout(() => {
                setRegistrationSuccess(false);
                setFormData({ name: '', email: '', password: '', confirmPassword: '' });
            }, 10000);
        }
    };

    return (
        <div className='container'>
            {registrationSuccess && <div className="message">Successfully Signed Up!</div>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
                {errors.name && <div className="error">{errors.name}</div>}
                
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
                {errors.email && <div className="error">{errors.email}</div>}
                
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
                {errors.password && <div className="error">{errors.password}</div>}
                
                <input type="password" name="confirmPassword" placeholder="Repeat password" value={formData.confirmPassword} onChange={handleChange} />
                {errors.confirmPassword && <div className="error">{errors.confirmPassword}</div>}
                
                <label className="terms-checkbox">
                    <input type="checkbox" checked={agreedToTerms} onChange={handleCheckboxChange} />
                    <span>I agree to all statements in <a href="#">Terms of service</a>.</span>
                </label>
                {errors.agreedToTerms && <div className="error">{errors.agreedToTerms}</div>}
                
                <button type="submit">Sign up</button>

                <p>Already have an account? <a href="#">Login Here</a></p>
            </form>
        </div>
    );
}

export default RegisterForm;
