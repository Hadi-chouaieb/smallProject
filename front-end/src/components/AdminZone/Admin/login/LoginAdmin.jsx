// src/components/LoginAndSignUp/Login.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axiosInstance from '../../../../hooks/axios';

const LoginAdmin = () => {
  const [mail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [redirect, setRedirect] = useState("none"); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); 

    try {
      const response = await axiosInstance.post('/api/admin/login', {
        mail,
        password,
      });
        if(response.data.token && response.data.role === 'Admin'){
          const token ="Barer "+ response.data.token;
          Cookies.set("AdminToken",token);
          axiosInstance.defaults.headers.common['IdAdmin'] = response.data.id; 
          setRedirect(response.data.role);
      }
      setRedirect(response.data.role);
    } catch (error) {
      console.error('Login Failed:', error);
      setErrorMessage('Login failed. Please check your credentials.');
    }
  };


  if (redirect == "Admin") {
    return   <Navigate to="/DashboardAdmin" />;
  }


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-header text-center">
              <h4>Login Admin</h4>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Email"
                    value={mail}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <br />
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <br />
                {errorMessage && <div className="text-danger">{errorMessage}</div>}
                <button type="submit" className="btn btn-primary btn-block">Login</button>
              </form>
            </div>
            <div className="card-footer text-center">
              <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default LoginAdmin;
