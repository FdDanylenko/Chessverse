import axios from "axios";

export default axios.create({
  baseURL: "https://chessverse.onrender.com",
});

export const serverPrivate = axios.create({
  baseURL: "https://chessverse.onrender.com",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
