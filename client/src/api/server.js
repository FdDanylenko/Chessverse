import axios from "axios";

const baseURLdev = "http://localhost:5000";
const baseURL = "https://chessverseapi.onrender.com";

export default axios.create({
  baseURL: baseURL,
});

export const serverPrivate = axios.create({
  baseURL: baseURL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
