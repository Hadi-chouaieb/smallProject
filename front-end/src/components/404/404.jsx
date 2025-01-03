import React from 'react'
import {Link} from "react-router-dom"
import { MdKeyboardBackspace } from "react-icons/md";

function NotFound() {
  return (
    <div>
      <div className="text-center">
      <img src="public/Imgs/404.png" className='col-6' alt="" srcset="" />
      <h1 className='fw-bold text-warning'>OOPS ! THIS PAGE NOT FOUND</h1>
        <Link to="/"><div className="btn btn-outline-warning"><MdKeyboardBackspace/></div></Link>
      </div>
    </div>
  )
}

export default NotFound
