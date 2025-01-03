import React, { useState, useEffect } from 'react';
import Navbars from '../Navbars/NavBars';
import PostCard from '../PostCard/PostCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import axiosInstance from '../../hooks/axios';



export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axiosInstance.get('/api/Club/GetPosts'); 
        setPosts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts(posts);
  }, []);



  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <>
      <Navbars />
      <div className="mt-5">
      {posts.map((post,key) => (
        <PostCard key={key} post={post}    /> 

      ))}
      </div>
    </>
  );
}
