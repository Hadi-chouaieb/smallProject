import React from 'react';
import './clubs.css'; 
import { useState, useEffect } from 'react';
import { baseUrlProfileImage } from '../../hooks/axios';
import { useLocation } from 'react-router-dom';
import PostCard from '../PostCard/PostCard';
import Navbars from '../Navbars/NavBars';
import "bootstrap-icons/font/bootstrap-icons.css";
import axiosInstance from '../../hooks/axios';
import ShowComiteNormal from '../AdminZone/Clubs/Profile/ShowComiteNormal';


export default function Clubs() {
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const { id_club } = (location.state) || {};
  const [Data, setData] = useState({});
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get(`/api/Club/profile/${id_club}`);
        setData(response.data);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };
    fetchProfile();
  }, [id_club]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get(`/api/Club/GetPostsWithId/ ${id_club}`);
        setPosts(response.data);
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };
    fetchPosts();
  }, [Data]);
  return (
    <>
    <Navbars/>
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-12 col-lg-10">
          <div className="profile-card shadow-lg rounded-5 p-4 text-center position-relative overflow-hidden">
            <div className="bg-circle bg-circle-1"></div>
            <div className="bg-circle bg-circle-2"></div>

            <div className="profile-image mb-4">
              <img
                src={baseUrlProfileImage + "/" + Data.ImageProfile}
                className="rounded-circle img-fluid shadow profile-img-hover"
                alt="Profile"
              />
            </div>

            <h2 className="profile-name fw-bold mb-2">{Data.Name}</h2>
            <p className="profile-bio mb-4">{Data.Bio}</p>

            <div className="contact-info mb-4 text-start">
              <p className='text-start'> <i className="bi bi-envelope me-2"></i>{Data.Mail}</p>
              <p className='text-start'><i className="bi bi-phone me-2"></i>{Data.Tel}</p>
            </div>
          </div>
        </div>
      </div>

      <ShowComiteNormal id={id_club}/>


      <div className="row mt-5 g-4">
        {posts.map((post, key) => (
            <PostCard post={post} key={key} />
        ))}
      </div>
    </div>
    </>
  );
}
