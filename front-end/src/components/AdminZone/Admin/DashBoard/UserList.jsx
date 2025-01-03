import { React, useEffect, useState } from 'react';
import './css/cardUser.css';
import { baseUrlProfileImage, axiosInstance } from '../../../../hooks/axios';
import { IoNotificationsOutline } from 'react-icons/io5';
import { FaPlus } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import DashboardAdmin from './DashboardAdmin';
import AddNewClub from './AddNewClub';
import { AiFillDelete } from "react-icons/ai";

const UserList = () => {
    const [users, setUser] = useState([]);
    const [del, setDelete] = useState(-1);
    const [clubName, setClubName] = useState("");
    const fetchUsers = async () => {
        try {
            const response = await axiosInstance.get('/api/admin/ListUsers');
            setUser(response.data);

        } catch (err) {
            console.error("Error fetching users:", err);
        }
    };
    useEffect(() => {

        fetchUsers();

    }, []);

    const handelDelete = async (id) => {
        try {
            await axiosInstance.delete(`/api/admin/DeleteUser/${id}`);
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };


    const handelRefrech = () => {
        fetchUsers();
    }
    return (
        <>
            <div className="row">
                <DashboardAdmin />
                <div className="main-content d-flex flex-column  p-4 col-md-9 col-sm-12" >
                    <div className="row d-flex justify-content-end">
                        <button type="button" className="btn btn-light m-4 mt-0 col-1 p-3" data-bs-toggle="modal" data-bs-target="#myModal">
                            <FaPlus />
                        </button>
                    </div>

                    <div className="d-flex justify-content-center row ">

                        {users.length > 0 ? (
                            users.map((user, key) => (
                                <div className="user-card col-5 m-3" key={key}>
                                    <div className="container text-end">
                                        <span className='btn' onClick={() => setDelete(user.Id_Club) && setClubName(user.Name)}
                                            data-bs-toggle="modal" data-bs-target="DeleteModal"
                                            ><AiFillDelete size={25} className='text-danger' /></span>

                                    </div>
                                    <Link to={'/ClubDocuments'} state={{ idClub: user.Id_Club }}>

                                        <img
                                            src={baseUrlProfileImage + "/" + user.ImageProfile}
                                            alt={user.Name}
                                            className={`user-image rounded-circle border border-secondary border-3`}
                                        />
                                        <h5 className="user-name">{user.Name}</h5>
                                        <span> <IoNotificationsOutline size={14} className='iconNot' />  </span>

                                    </Link>
                                </div>


                            ))
                        ) : (
                            <p>No users found.</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="modal modal-topped" id="myModal">
                <div className="modal-dialog modal-dialog-topped  ">
                    <div className="modal-content">
                        {/* <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div> */}
                        <div className="modal-body">
                            <AddNewClub refrech={handelRefrech()} />
                        </div>
                    </div>
                </div>
            </div>










            {/* verifictation after delete club */}

            <div className="modal modal-topped" id="DeleteModal">
                <div className="modal-dialog modal-dialog-topped  ">
                    <div className="modal-content">
                        {/* <div className="modal-header">
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div> */}
                        <div className="modal-body">
                            <p>When you delete this club you dlete all posts ..</p>
                            <p>please enter <span className='bg-danger text-light'> {clubName} </span> in the fild below</p>
                            <input type="text" className="form-control text-danger" />
                            <button className="btn btn-danger m-2" onClick={()=>handelDelete(del)} data-bs-dismiss="modal">Delete</button> 
                            <button className='btn btn-secondary' data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>



    );
};

export default UserList;
