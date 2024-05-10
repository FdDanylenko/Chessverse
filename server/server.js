require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const whiteList = require("./config/whiteList");
const app = express();
const PORT = process.env.PORT;
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);
  } catch (err) {
    console.log(err);
  }
};
connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || whiteList.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Access denied"));
      }
    },
    credentials: true,
    originsSuccessStatus: 200,
  })
);

const io = require("socket.io")(8080, {
  cors: {
    origin: ["http://127.0.0.1:3000", "http://localhost:3000", undefined],
  },
});

io.on("connection", (socket) => {
  socket.on("send-msg", (message, room) => {
    if (room === "") {
      socket.broadcast.emit("receive", message);
    } else {
      socket.to(room).emit("receive", message);
    }
  });
  socket.on("join-room", (room) => {
    socket.join(room);
  });
  socket.on("make-move", (id, x, y, xx, yy, opponent) => {
    socket.to(opponent).emit("receive-move", id, x, y, xx, yy);
    console.log(id, opponent, x, y, xx, yy);
  });
});

app.get("/", (req, res) => {
  res.send("Hello there!");
});
app.use("/users", require("./routes/users"));
app.use("/db/images", require("./routes/imagesdb"));

mongoose.connection.once("open", () => {
  console.log("Connected to Chessverse");
  app.listen(PORT, console.log(`Server runs on http://localhost:${PORT}`));
});
