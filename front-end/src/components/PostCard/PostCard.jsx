import React, { useState, useRef } from 'react';
import './postcard.css';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { baseUrlImage, baseUrlProfileImage } from '../../hooks/axios';
import { CiPause1 } from "react-icons/ci";
import { CiPlay1 } from "react-icons/ci";


export default function PostCard({ post }) {
  const [like, setLike] = useState(<AiOutlineLike size={25} className='like-icon' />);
  const [liked, setLiked] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null); // Reference to the video element

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    if (videoRef.current) {
      videoRef.current.pause(); // Pause the video when closing the modal
      setIsPlaying(false); // Reset the play state
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    if (!liked) {
      setLike(<AiFillLike size={25} color='#007bff' />);
    } else {
      setLike(<AiOutlineLike size={25} />);
    }
  };

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Function to render the media based on its type
  const renderMedia = () => {
    if (post.file_path && post.file_path.endsWith('.mp4')) {
      return (
        <div className="post-media-container" onClick={handleOpenModal} style={{ cursor: 'pointer' }}>
          {/* Render video thumbnail using the 'poster' attribute */}
          <video
            className="post-media img-fluid rounded-bottom"
            // poster={`${baseUrlImage}${post.file_path}`} // This shows the first frame as an image
            onClick={handleOpenModal} // On click, open modal to play video
          >
            <source src={`${baseUrlImage}${post.file_path}`} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    }
    return (
      <img
        src={`${baseUrlImage}${post.file_path}`}
        alt="Post"
        className="post-img img-fluid rounded-bottom"
        onClick={handleOpenModal}
        style={{ cursor: 'pointer' }}
      />
    );
  };

  return (
    <>
      <div className="row d-flex justify-content-center m-0">
        <div className="col-lg-6 col-md-10 col-sm-12 mb-4">
          <div className="card card-post shadow-sm border-0 rounded-lg">
            {/* User Info Section */}
            <div className="user-info d-flex align-items-center p-3">
              <img
                src={`${baseUrlProfileImage}/${post.ImageProfile}`}
                alt="Profile"
                className="profile-photo rounded-circle me-3"
              />
              <div className="user-details">
                <Link
                  to={`/Clubs/${post.Name}`}
                  state={{ id_club: post.Id_Club }}
                  className="text-decoration-none text-dark"
                >
                  <h5 className="user-name mb-1">{post.Name}</h5>
                </Link>
                <p className="post-date text-muted small">{post.date}</p>
              </div>
            </div>
            {/* Post Title */}
            <h3 className="post-title px-3 mt-2">{post.title}</h3>
            {/* Post Description */}
            <p className="post-description px-3">{post.description}</p>



            {renderMedia()}



            <div className="like-section d-flex justify-content-between align-items-center p-3">
              <div
                className={`like-icon d-flex align-items-center ${liked ? 'liked' : ''}`}
                onClick={handleLike}
                style={{ cursor: 'pointer' }}
              >
                {like}
                <span className="like-count ms-2">
                  {liked ? post.Likes + 1 : post.Likes}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal to show image/video on click */}
      <Modal show={showModal} onHide={handleCloseModal} centered size="lg">
        <Modal.Body className="p-0 container-fluid bg-none">
          <div className="p-0 m-0 d-flex justify-content-center align-items-center">
            <div className="col-sm-12 col-md-8 m-0 p-0">
              {post.file_path && post.file_path.endsWith('.mp4') ? (
                <div className="post-media-container">
                  <video
                    ref={videoRef}
                    className="img-fluid card"
                    style={{ width: '100%' }}
                    onClick={handlePlayPause}
                  >
                    <source src={`${baseUrlImage}${post.file_path}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  <button
                    onClick={handlePlayPause}
                    className={`custom-play-pause-btn ${isPlaying ? 'pause' : 'play'}`}
                    aria-label={isPlaying ? 'Pause' : 'Play'}
                  >
                    {!isPlaying ? <CiPause1 /> : <CiPlay1 />}
                  </button>
                </div>
              ) : (
                <img
                  src={`${baseUrlImage}${post.file_path}`}
                  alt="Post"
                  className="img-fluid card"
                  style={{ width: '100%' }}
                />
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
