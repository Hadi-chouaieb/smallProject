import React from 'react'
import "./css/navbar.css"
import axiosInstance from '../../../../hooks/axios';
import { Link } from "react-router-dom";
import { IoLogOut } from "react-icons/io5";
import Cookies from 'js-cookie';


export default function NavClubs() {
  const handellogout = () => {
    axiosInstance.defaults.headers.common['Role'] ="normal";
    Cookies.set("token", "");
    Cookies.set("IdClub", "");
    
  };
  
  return (
    <>
      <nav className="navbar navbar-expand-sm bg-dark navbar-dark py-3 shadow-lg">
        <div className="container-fluid">
          <a className="navbar-brand text-uppercase fw-bold" href="#">
            {/* <img src="logo.png" alt="Logo" width="30" height="30" class="d-inline-block align-text-top"/> */}
            ISET
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
              
                <Link  className="nav-link active" to={"/ClubsAdministration"}>Profile</Link>
              </li>
              <li className="nav-item">
                
                <Link  className="nav-link"  to={"/Docs"}>Docs</Link>
              </li>
              <li className="nav-item">
              <Link  className="nav-link"  to={"/Post"}>Post</Link>
              </li>


              <li className="nav-item">
              <Link  className="nav-link" to={"/"} onClick={()=>handellogout()} ><IoLogOut  size={30} /></Link>
      
              </li>


            </ul>
          </div>
        </div>
      </nav>












    </>
  )
}
