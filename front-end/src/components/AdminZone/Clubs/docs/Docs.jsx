import React, { useState } from 'react';
import "./docs.css";
import NavClubs from '../Profile/NavClubs';
import "bootstrap/dist/css/bootstrap.min.css"
import Cookies from 'js-cookie';
import axiosInstance from '../../../../hooks/axios';



export default function Docs() {
    const [fileName, setFileName] = useState('No file chosen');
    const [isDragging, setIsDragging] = useState(false);
    const [file, setFile] = useState(null); // State to hold the uploaded file

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        handleFiles(files);
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        handleFiles(files);
    };

    const handleFiles = (files) => {
        if (files.length > 0) {
            setFile(files[0]);
            setFileName(files[0].name);
        } else {
            setFileName('No file chosen');
        }
    };

    const handleUpload = async () => {
        if (!file) return; 
    
        const formData = new FormData();
        formData.append('document', file); 
        formData.append("id",axiosInstance.defaults.headers.common['IdClub'])
    
        try {
            const response = await axiosInstance.post('/api/Club/PutDemande', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
    
            if (response.status === 200) {
                alert('File uploaded successfully!');
            } else {
                alert('File upload failed!');
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('An error occurred while uploading the file.');
        }
    };
    

    return (
        <>
            <NavClubs />
            <div className="card b-white">
            <div className="container text-center mt-4">
                
                <div className="btn-group" role="group" aria-label="Download Button Group">
                    <a href="public/Docx/docx1.docx" className="btn btn-primary" download="مطلب حجز قاعة.docx">Doc 1</a>
                    <a href="path/to/doc2.docx" className="btn btn-primary" download>Doc 2</a>
                    <a href="path/to/doc3.docx" className="btn btn-primary" download>Doc 3</a>
                    <a href="path/to/doc4.docx" className="btn btn-primary" download>Doc 4</a>
                </div>
            </div>

        
            <div
                className={`drop-area ${isDragging ? 'highlight' : ''} text-center mt-4 mb-5`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => document.getElementById('fileInput').click()}
            >
                <p className='text-center'>Drag and drop your file here or click to select a file.</p>
                <input
                    type="file"
                    id="fileInput"
                    className="d-none"
                    onChange={handleFileChange}
                    accept='.docx'
                />
                <div className="file-name text-muted mt-2">{fileName}</div>
            </div>
                <div className="text-center mb-4">
                <button className="btn btn-success mt-1 col-2" onClick={handleUpload}>Upload File</button>

                </div>
            </div>
           
        </>
    );
}
