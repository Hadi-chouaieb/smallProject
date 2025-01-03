import React from 'react'
import { useEffect, useState } from 'react';
import axiosInstance from '../../../../hooks/axios';
import { baseUrlComite } from '../../../../hooks/axios';


function ShowComiteNormal({ id }) {

    const [members, setMembers] = useState([]);
    const fetchMembers = async () => {
        try {
            const response = await axiosInstance.get(`/api/club/GetComite/${id}`);
            setMembers(response.data);
        } catch (error) {
            console.error('Error fetching members:', error);
        }
    };
    useEffect(() => {
        fetchMembers();
    }, []);

    return (
        <>
            <div className="profile-card col-10 mt-2 container">
                <div className=" row d-flex justify-content-center ">


                    <h1 className="text-center">Comite</h1>
                    {members.map((member, key) => (
                        <div key={key} className="card-containere">
                            <div className="card-bodye">
                                <img className="card-imagee" src={`${baseUrlComite}/Comite/${member.Photo_comite}`} alt="comite_photo" />
                                <div className="card-info">
                                    <h5 className="card-titlee">{member.Name_comite}</h5>
                                    <p className="card-texte">{member.Post_comite}</p>

                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </>
    )
}

export default ShowComiteNormal
