import React, { useState, useEffect } from 'react';
import axiosInstance, { baseUrlImage } from '../../../../hooks/axios';

const Committee = ({ fetchMembers }) => {
  const [name, setName] = useState('');
  const [img, setImg] = useState(null); // Store image file
  const [post, setPost] = useState('');
  const id = axiosInstance.defaults.headers.common['IdClub'];
  const addMember = async () => {
    const formData = new FormData();
    formData.append('name', name);
    formData.append('post', post);
    formData.append('id', id);
    if (img) formData.append('img', img);

    try {
      const response = await axiosInstance.post('/api/club/SetComite', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        


      });
      // Add new member to the list
      setName('');
      setImg(null);
      setPost('');
      fetchMembers();
    } catch (error) {
      console.error('Error adding member:', error);
    }
  };

  return (
    <div className="container mt-5 bg-light p-4">
      <h2>Add Committee Member</h2>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          type="text"
          className="form-control"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="img" className="form-label">Image</label>
        <input
          type="file"
          className="form-control"
          id="img"
          onChange={(e) => setImg(e.target.files[0])}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="post" className="form-label">Post</label>
        <input
          type="text"
          className="form-control"
          id="post"
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={addMember}>Add Member</button>
    </div>
  );
};

export default Committee;
