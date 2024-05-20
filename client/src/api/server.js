import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5000",
});

export const serverPrivate = axios.create({
  baseURL: "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

// export default axios.create({
//   baseURL: "https://chessverse.onrender.com",
// });

// export const serverPrivate = axios.create({
//   baseURL: "https://chessverse.onrender.com",
//   headers: { "Content-Type": "application/json" },
//   withCredentials: true,
// });
