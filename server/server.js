require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const whiteList = require("./config/whiteList");
const app = express();
const server = require("http").Server(app);
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
      if (!origin || whiteList.indexOf(origin) !== -1 || true) {
        callback(null, true);
      } else {
        callback(new Error("Access denied"));
      }
    },
    credentials: true,
    originsSuccessStatus: 200,
  })
);

const io = require("socket.io")(server, {
  cors: {
    origin: ["http://127.0.0.1:3000", "http://localhost:3000", undefined],
  },
});

const playersId = [];

io.on("connection", (socket) => {
  socket.on("send-msg", (message, room) => {
    if (room === "") {
      socket.broadcast.emit("receive-msg", message);
    } else {
      socket.to(room).emit("receive-msg", message);
    }
  });
  socket.on("join-room", (room) => {
    socket.join(room);
  });
  socket.on("fetch-opponent", (id, callback) => {
    if (playersId.length) {
      // socket.to(id).emit("receive-opponent", playersId[playersId.length - 1]);
      socket.to(playersId[playersId.length - 1]).emit("receive-opponent", id);
      console.log(`${id} vs ${playersId[playersId.length - 1]}`);
      callback({
        opponent: playersId[playersId.length - 1],
      });
      playersId.pop();
    } else {
      playersId.push(id);
    }
  });
  socket.on("make-move", (id, x, y, xx, yy, opponent) => {
    console.log(id, opponent, x, y, xx, yy);
    socket.to(opponent).emit("receive-move", id, x, y, xx, yy);
  });
});

app.get("/", (req, res) => {
  res.send("Hello there!");
});
app.use("/users", require("./routes/users"));
app.use("/db/images", require("./routes/imagesdb"));

mongoose.connection.once("open", () => {
  console.log("Connected to Chessverse");
  server.listen(PORT, console.log(`Server runs on http://localhost:${PORT}`));
});
