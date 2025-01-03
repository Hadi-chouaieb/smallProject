import { React, useEffect, useState } from 'react';
import "./css/dashboard.css"
import UserList from './UserList'
import { FaUsersGear } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';



function DashboardAdmin() {
    return (
        <>
            <nav className="sidebar flex-shrink-0 p-3 col-md-3 col-sm-6 m-0 float-start">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <a className="nav-link active">
                            Dashboard
                        </a>
                    </li>
                    <li className="nav-item">
                        <Link to={"/ClubDocuments/Users"} className="nav-link">
                            <FaUsersGear className='m-2' />
                            Clubs
                        </Link>
                    </li>
                    <Link to={"/ClubDocuments/Settings"} className="nav-link">
                            <IoSettingsOutline className='m-2' />
                            Settings
                    </Link>
                    <li className="nav-item">
                        <a className="nav-link" onClick={() => { Cookies.remove("AdminToken"), window.location.href = "/LoginAdmin"; }}>
                            <TbLogout className='m-2' />

                            Logout
                        </a>
                    </li>
                </ul>
            </nav>

        </>
    )
}

export default DashboardAdmin
