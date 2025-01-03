// src/components/LoginAndSignUp/Login.js
import React, { useState } from 'react';
import axiosInstance from '../../hooks/axios.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, Navigate } from 'react-router-dom';
import Profile from '../AdminZone/Clubs/Profile/Profile';
import Cookies from 'js-cookie';


const Login = () => {
  const [mail, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [redirect, setRedirect] = useState(false); // State for redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Clear previous error message

    try {
      const response = await axiosInstance.post('/api/Club/login', {
        mail,
        password,
      });
        if(response.data.token){

        const token = response.data.token;
        axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        Cookies.set('token',`Bearer ${token}`);
        axiosInstance.defaults.headers.common['IdClub'] = response.data.id; 
      }

      setRedirect(true);
    } catch (error) {
      console.error('Login Failed:', error);
      setErrorMessage('Login failed. Please check your credentials.');
    }
  };


  if (redirect) {
    return   <Navigate to="/ClubsAdministration" />;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-header text-center">
              <h4>Login</h4>
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

export default Login;
