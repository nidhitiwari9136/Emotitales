import axios from "axios";

// Base URL of Django backend
const API = axios.create({
  baseURL: "https://emotitales-backend.onrender.com/api/",
});

export const getSummary = (text) => API.post("summary/", { text });
export const generateStory = (formData) => API.post("story/", formData);

export default API;