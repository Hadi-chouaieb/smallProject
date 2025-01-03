import React, { useState, useEffect, useCallback } from 'react';
import axiosInstance from '../../../../hooks/axios.jsx';
import "./css/Profile.css";
import NavClubs from './NavClubs';
import Cookies from 'js-cookie';
import Cropper from 'react-easy-crop';
import { baseUrlProfileImage } from '../../../../hooks/axios.jsx';
import getCroppedImg from './cropImage';
import { Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Committee from './AddmemberComite.jsx';
import ShowComite from './ShowComite.jsx';
import { IoPersonAddSharp } from "react-icons/io5";
import PostCard from '../../../PostCard/PostCard';


export default function Profile() {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    bio: '',
    profileImage: null,
  });
  const id = axiosInstance.defaults.headers.common['IdClub'];

  const [imagePreview, setImagePreview] = useState(null); // Image preview before upload
  const [croppedArea, setCroppedArea] = useState(null);   // Stores cropped area
  const [crop, setCrop] = useState({ x: 0, y: 0 });       // Crop coordinates
  const [zoom, setZoom] = useState(1);                    // Zoom level
  const [croppingImage, setCroppingImage] = useState(null); // Image being cropped
  const [isModalOpen, setIsModalOpen] = useState(false);   // Modal open state
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



  // Fetch profile data on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userId = axiosInstance.defaults.headers.common['IdClub'];
        const response = await axiosInstance.get(`/api/Club/profile/${userId}`);
        const profileData = response.data;

        setFormData({
          name: profileData.Name || '',
          email: profileData.Mail || '',
          phone: profileData.Tel || '',
          bio: profileData.Bio || '',
          profileImage: profileData.ImageProfile || null,
        });
        setImagePreview(`${baseUrlProfileImage}/${profileData.ImageProfile}`);
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCroppingImage(URL.createObjectURL(file)); // Preview the image for cropping
      setIsModalOpen(true); // Open modal for image cropping
    }
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();


    const dataToSend = new FormData();
    dataToSend.append('name', formData.name);
    dataToSend.append('email', formData.email);
    dataToSend.append('phone', formData.phone);
    dataToSend.append('bio', formData.bio);
    dataToSend.append("id", axiosInstance.defaults.headers.common['IdClub']);

    try {
      const response = await axiosInstance.post('/api/Club/Updateprofile', dataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Profile updated:', response.data);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false); // Close the cropping modal
  };

  const handleCropConfirm = async () => {
    const croppedImage = await getCroppedImg(croppingImage, croppedArea);

    if (croppedImage) {
      const dataToSend = new FormData();
      dataToSend.append("id", axiosInstance.defaults.headers.common['IdClub']);
      dataToSend.append('profileImage', croppedImage);

      try {
        const response = await axiosInstance.post('/api/Club/UpdateprofileImg', dataToSend, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('Profile updated with new image:', response.data);
        setImagePreview(URL.createObjectURL(croppedImage)); // Update image preview
      } catch (error) {
        console.error('Error updating profile image:', error);
      }
    }
    closeModal();
  };

  const handleAddMember = () => {
    setShowCommittee(true);
  };

  return (
    <>
      <NavClubs />

      <div className="container my-5 ">
        <div className="row justify-content-center">
          <div className="col-md-12 col-lg-10">
            <div className="card shadow-lg rounded-3">
              <div className="card-body text-center p-4">
                <form onSubmit={handleSubmit}>
                  <div className="profile-image mb-3">
                    <div className="img-edit">
                      <input
                        type="file"
                        className="form-control file-input"
                        id="fileInput"
                        onChange={handleFileChange}
                      />
                    </div>
                    {imagePreview && (
                      <img
                        src={imagePreview}
                        className="rounded-circle img-fluid border border-3 border-primary"
                        id='imgP'
                        alt="Profile"
                      />
                    )}
                  </div>

                  <div className="row justify-content-center">
                    <div className="col-3">
                      <input
                        type="text"
                        name="name"
                        className='col-3 text-center form-control'
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="card-text mb-4 mt-2">
                    <div className="row  justify-content-center">
                      <div className="col-6">
                        <textarea
                          placeholder='Bio'
                          name="bio"
                          rows={5}
                          cols={5}
                          className='col-3 text-start form-control text-center'
                          value={formData.bio}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <ul className="list-group list-group-flush text-start">
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span><i className="bi bi-envelope me-2"></i>Email</span>
                      <div className="col-6">
                        <input
                          type="email"
                          name="email"
                          className='col-3 text-start form-control'
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>
                    </li>
                    <li className="list-group-item d-flex justify-content-between align-items-center">
                      <span><i className="bi bi-phone me-2"></i>Phone</span>
                      <div className="col-6">
                        <input
                          type="tel"
                          name="phone"
                          className='col-3 text-start form-control'
                          value={formData.phone}
                          onChange={handleChange}
                        />
                      </div>
                    </li>
                  </ul>

                  <button className='btn btn-mc col-4' type="submit">
                    Save
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>


        <div className="text-end m-5 mt-2">
          <button type="button" className="btn btn-light col-md-1 col-sm-12 p-1" data-bs-toggle="modal" data-bs-target="#myModal">
            <IoPersonAddSharp />
          </button>
        </div>


        <ShowComite members={members}  fetchMembers={fetchMembers} />


      </div>


      <Modal show={isModalOpen} onHide={closeModal} aria-labelledby="popupLabel" centered>
        <Modal.Header closeButton>
          <Modal.Title id="popupLabel">Crop Image</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="crop-container">
            <Cropper
              image={croppingImage}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={closeModal}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleCropConfirm}>
            Confirm
          </button>
        </Modal.Footer>
      </Modal>





      <div className="modal" id="myModal">
        <div className="modal-dialog">
          <div className="modal-content bg-light">



            <div className="modal-body">
              <Committee  fetchMembers={fetchMembers} />
            </div>


          </div>
        </div>
      </div>







    </>
  );
}
