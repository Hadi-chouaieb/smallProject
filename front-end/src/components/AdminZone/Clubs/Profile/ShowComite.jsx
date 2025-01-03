import React from 'react'
import axiosInstance, { baseUrlComite } from '../../../../hooks/axios.jsx';
import { useState, useEffect } from 'react';
import { MdDeleteForever } from "react-icons/md";
import PostCard from '../../../PostCard/PostCard.jsx';



import "./css/cardMember.css"
function ShowComite({fetchMembers,members}) {
   
    const id = axiosInstance.defaults.headers.common['IdClub'];
    const [posts, setPosts] = useState([]); // State for posts


    const handelDelete = async (id) => {
        try {
            await axiosInstance.delete(`/api/club/DeleteComite/${id}`);
            fetchMembers();
        } catch (error) {
            console.error('Error deleting member:', error);
        }
    };


    useEffect(() => {
        const fetchPosts = async () => {
          try {
            const response = await axiosInstance.get(`/api/Club/GetPostsWithId/${id}`);
            setPosts(response.data);
            console.log(response.data)
          } catch (err) {console.log("errror getting posts")} 
        };
  
        fetchPosts();
      }, []);
    return (
        <>
            <div className=" row d-flex justify-content-center ">
                {members.map((member, key) => (
                    <div key={key} className="card-containere">
                        <div className="card-bodye">
                            <img className="card-imagee" src={`${baseUrlComite}/Comite/${member.Photo_comite}` || "public/Imgs/user.png"} alt="comite_photo" />
                            <div className="card-info">
                                <h5 className="card-titlee">{member.Name_comite}</h5>
                                <p className="card-texte">{member.Post_comite}</p>
                                <div className="text-end">
                                    {member.Post_comite.toLowerCase() !== "president" && (
                                        <span className="text-end">
                                            <MdDeleteForever size={20} className='remouve' onClick={()=>handelDelete(member.Id_comite)} />                                                      
                                        </span>
                                    )}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>


            <div className="row">
            <div className="mt-5">
          {posts.map((post, key) => (
            <PostCard key={key} post={post}  />
          ))}
        </div>

            </div>
        </>
    )
}

export default ShowComite
