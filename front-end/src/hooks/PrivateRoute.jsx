// src/hooks/PrivateRoute.js
import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axiosInstance from './axios';
import Cookies from 'js-cookie';

export  const PrivateRouteClubs = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null); 
  useEffect(() => {
    const fetchProtectedData = async () => {
    const token =  Cookies.get('token');
      try {
        const resp= await axiosInstance.get('/api/protected/club', {
          headers: {
            'x-access-token': token,
            
          },
        });


        axiosInstance.defaults.headers.common['IdClub'] = resp.data.id;
        axiosInstance.defaults.headers.common['Role'] = resp.data.role;
        setIsAuthenticated(true); 

      } catch (err) {

        setIsAuthenticated(false); 
      }
    };
    fetchProtectedData(); 
  }, []); 
  if (isAuthenticated === null) {
    return <p>Loading...</p>; 
  } else if (isAuthenticated) {
    return children; 
  } else {
    return <Navigate to="/Login" />;
  }
};




  export  const PrivateRouteAdmin = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); 
    const [Role, setRole] = useState("");
    useEffect(() => {
      const fetchProtectedData = async () => {
      const token =  Cookies.get('AdminToken');
        try {
          const resp= await axiosInstance.get('/api/protected/admin', {
            headers: {
              'token-admin': token,
            },
          });
  
          setRole(resp.data.role)
          console.log(resp.data)
  
          axiosInstance.defaults.headers.common['IDADMIN'] = resp.data.id;
          Cookies.set('IDADMIN',axiosInstance.defaults.headers.common["IDADMIN"])
          setIsAuthenticated(true); 
  
        } catch (err) {
  
          setIsAuthenticated(false); 
        }
      };
      fetchProtectedData(); 
    }, []); 
    if (isAuthenticated === null) {
      return <p>Loading...</p>; 
    } else if (isAuthenticated) {
      return children; 
    } else {
      return <Navigate to="/LoginAdmin" />;
    }
  };
  
  




