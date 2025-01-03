import React, { useState } from 'react';
import './Posts.css'; // Importing custom CSS for additional styles
import { FaImage } from "react-icons/fa6";
import NavClubs from '../Profile/NavClubs';
import axiosInstance from '../../../../hooks/axios';
import Cookies from 'js-cookie';

function Posts() {
    const [file, setFile] = useState(null); // Renamed to 'file' to handle both image and video
    const [description, setDescription] = useState('');
    const id = axiosInstance.defaults.headers.common['IdClub']; // Add state for the club ID

    const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            setFile(selectedFile); // Set the file object for upload
        }
    };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        // Create a FormData object to send the file (image or video) and description
        const formData = new FormData();
        formData.append('file', file);
        formData.append('description', description);
        formData.append('id', id); // Append the club ID

        try {
            const response = await axiosInstance.post('/api/Club/CreatePost', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            // Reset the form after successful upload
            setFile(null);
            setDescription('');
        } catch (error) {
            console.error('Error uploading post:', error);
        }
    };

    return (
        <>
            <NavClubs />
            <div className="container mt-2">
                <div className="card shadow-sm animated-card">
                    <div className="card-body">
                        <form onSubmit={handleSubmit}>
                            <div className="form-floating mb-3">
                                <textarea
                                    className="form-control textarea"
                                    id="description"
                                    rows="4"
                                    value={description}
                                    onChange={handleDescriptionChange}
                                    required
                                ></textarea>
                                <label htmlFor="description">Description</label>
                            </div>

                            <div className="mb-3">
                                <div className="row justify-content-center">
                                    <div className="col-1"><FaImage className='imgInsert' /></div>
                                    <input
                                        type="file"
                                        className="imgfile"
                                        id="file"
                                        accept="image/*, video/*"
                                        onChange={handleFileChange}
                                        required // Ensure a file is uploaded
                                    />
                                </div>
                            </div>

                            <div className="file-preview mb-3">
                                {file ? (
                                    file.type.startsWith('image') ? (
                                        <img src={URL.createObjectURL(file)} alt="Preview" className="img-fluid col-3" />
                                    ) : file.type.startsWith('video') ? (
                                        <video controls className="img-fluid">
                                            <source src={URL.createObjectURL(file)} type={file.type} />
                                            Your browser does not support the video tag.
                                        </video>
                                    ) : null
                                ) : (
                                    <div className="placeholder-file">
                                        <span>Preview Will Show Here</span>
                                    </div>
                                )}
                            </div>

                            <button type="submit" className="btn btn-gradient w-100">Submit Post</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Posts;
