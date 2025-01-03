import React, { useState } from 'react';
import axiosInstance from '../../../../hooks/axios';

const AddNewClub = () => {
    const [formData, setFormData] = useState({
        name: '',
        login: '',
        password: '',
        confirmPassword: ''
    });

    const [errorMessage, setErrorMessage] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if passwords match
        if (formData.password !== formData.confirmPassword) {
            setErrorMessage('Passwords do not match!');
            return; // Stop form submission if passwords don't match
        }

        try {
            const response = await axiosInstance.post('/api/admin/CreateClub', formData);
             // Call refresh to update the user list
            setErrorMessage(
                <div className="alert alert-success text-center" role="alert">
                    Club created successfully!
                </div>
            );

            // Reset the form
            setFormData({
                name: '',
                login: '',
                password: '',
                confirmPassword: ''
            });
        } catch (error) {
            console.error('Error creating club:', error);
            setErrorMessage(
                <div className="alert alert-danger text-center" role="alert">
                    An error occurred while creating the club.
                </div>
            );
        }
    };

    return (
        <>
            <form onSubmit={handleSubmit} className="border p-4 rounded bg-light shadow">
                <div className="mb-3">
                    <label htmlFor="formName" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formName"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="formLogin" className="form-label">Login</label>
                    <input
                        type="text"
                        className="form-control"
                        id="formLogin"
                        name="login"
                        value={formData.login}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="formPassword" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="formPassword"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="formConfirmPassword" className="form-label">Confirm Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="formConfirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                    />
                </div>

                {errorMessage && (errorMessage)}

                <div className="row justify-content-center">
                    <button type="submit" className="btn btn-primary mt-3 col-4">
                        Submit
                    </button>
                </div>
            </form>
        </>
    );
};

export default AddNewClub;
