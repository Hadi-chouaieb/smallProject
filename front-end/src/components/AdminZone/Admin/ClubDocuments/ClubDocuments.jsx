// src/App.js
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../../../hooks/axios';
import { useLocation } from 'react-router-dom';
import { baseUrlImage } from '../../../../hooks/axios';
import "./clubDoc.css";
import DashboardAdmin from '../DashBoard/DashboardAdmin';
const App = () => {
    const [files, setFiles] = useState([]);
    const location = useLocation();
    const id = location.state.idClub;
    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await axiosInstance.get(`/api/admin/GetFiles/${id}`);
                setFiles(response.data);
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };
        fetchFiles();
    }, []);
    return (
        <>
            <DashboardAdmin />
            <div className="main-content d-flex flex-column p-4 col-6">
                <div className="container file-container my-5 py-4">
                    <ul className="list-group">
                        {files.map((file, key) => (
                            <li key={key} className="list-group-item file-item d-flex justify-content-between align-items-center">
                                <span className="file-name">{file.OriginalName}</span>
                                <a
                                    href={`${baseUrlImage}${file.PathFile}`}
                                    className="btn btn-custom btn-sm col-4"
                                    download={`CustomName_${file.OriginalName}`}
                                >
                                    Download {file.OriginalName}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default App;
