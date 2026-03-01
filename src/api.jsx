import axios from "axios";

// Base URL of Django backend
const API = axios.create({
  baseURL: "https://emotitales-backend.onrender.com/api/",
});

// export const getSummary = (text) => API.post("summary/", { text });
// export const generateStory = (formData) => API.post("story/", formData);
export const loginUser = (data) => API.post("login/", data);
export const registerUser = (data) => API.post("register/", data);
export const getSummary = (formData) => API.post("summary/", formData); // PDF hai toh formData bhejna
export const generateStory = (data) => API.post("story/", data);
export const getLibrary = () => API.get("library/");
export const getAudio = (storyText) => API.post("audio/", { story: storyText });
export default API;