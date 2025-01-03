import React, { useState } from 'react';
import axiosInstance from '../../../../hooks/axios';
import './css/settings.css'; // Import the custom CSS file for additional styling
import Cookies from 'js-cookie';
import DashboardAdmin from './DashboardAdmin';

function Settings() {
    const id = Cookies.get('IDADMIN');
    console.log(id);
    const [formData, setFormData] = useState({
        Mail: '',
        Nom: '',
        Password: '',
        id: id,
    });

    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        return formData.Mail && formData.Nom && formData.Password;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if (formData.Password != formData.confirmPassword) {
        //     setMessage('Password and Confirm Password do not match!');
        //     return;

        // }
        // else {
            setFormData({
                ...formData,
                id: id,
            });


        // }



        if (!validateForm()) {
            setMessage('All fields are required!');
            return;
        }

        setLoading(true);
        setMessage('');

        try {
            const response = await axiosInstance.post('/api/admin/UpdateAdmin', formData);
            setMessage('Settings updated successfully!');
        } catch (error) {
            setMessage(
                error.response?.data?.message || 'Error updating settings. Please try again.'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <DashboardAdmin />
            <div className="main-content d-flex flex-column  p-4 col-md-9 col-sm-12" >

                <div className="container mt-5 card p-4 container-cardUpdate ">
                    <h1 className="text-center mb-4">Update Admin Account</h1>
                    <form onSubmit={handleSubmit} className="form-horizontal">
                        <div className="form-group mb-3">
                            
                            <input
                                type="text"
                                id="nom"
                                name="Nom"
                                value={formData.Nom}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            
                            <input
                                type="txt"
                                id="mail"
                                name="Mail"
                                value={formData.Mail}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div className="form-group mb-3">
                            
                            <input
                                type="password"
                                id="password"
                                name="Password"
                                value={formData.Password}
                                onChange={handleChange}
                                className="form-control"
                                placeholder="Enter your password"
                                required
                            />
                        </div>
                        <div className="text-center">
                            <button
                                type="submit"
                                className="btn btn-primary btnUpdate"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                        Updating...
                                    </>
                                ) : (
                                    'Update Account'
                                )}
                            </button>
                        </div>
                    </form>
                    {message && <p className="text-center mt-3 alert alert-info">{message}</p>}
                </div>
            </div>


        </>
    );
}

export default Settings;
