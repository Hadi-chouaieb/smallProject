import axios from "axios";
const IP_LINK = "http://localhost"

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5500/", 
  });



export const baseUrlImage = IP_LINK+":5500/"
export const baseUrlComite = IP_LINK+":5500/uploads"
export const baseUrlProfileImage = IP_LINK+":5500/uploads/Profiles"

export default axiosInstance;