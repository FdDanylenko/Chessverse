import axios from "axios";

const baseURLdev = "http://localhost:5000";
const baseURL = "https://chessverseapi.onrender.com";

export default axios.create({
  baseURL: baseURLdev,
});

export const serverPrivate = axios.create({
  baseURL: baseURLdev,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
