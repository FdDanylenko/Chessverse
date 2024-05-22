import axios from "axios";

export default axios.create({
  baseURL: "https://chessverseapi.onrender.com",
});

export const serverPrivate = axios.create({
  baseURL: "https://chessverseapi.onrender.com",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
