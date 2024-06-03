require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const whiteList = require("./config/whiteList");
const app = express();
const server = require("http").Server(app);
const PORT = process.env.PORT;
const mongoose = require("mongoose");
const registerGameResult = require("./middleware/registerGameResult");

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

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

let playersId = [];

io.on("connection", (socket) => {
  socket.on("send-msg", (opponent, message) => {
    socket.to(opponent).emit("receive-msg", message);
    // if (opponent === "") {
    //   socket.broadcast.emit("receive-msg", message);
    // } else {
    // }
  });
  socket.on("join-room", (room) => {
    socket.join(room);
  });
  socket.on("fetch-opponent", (data, callback) => {
    console.log(playersId);
    if (
      playersId.length &&
      playersId.some(
        (element) => element.timeSet === data.timeSet && element.id !== data.id
      )
    ) {
      const player = playersId.find(
        (element) => element.timeSet === data.timeSet
      );
      socket.to(player.id).emit("receive-opponent", data.id, data.username);
      callback({
        opponent: player,
      });
      playersId = playersId.filter((element) => element.id !== player.id);
    } else {
      if (playersId.some((element) => element.id === data.id)) {
        playersId = playersId.filter((element) => element.id !== data.id);
      }
      playersId.push({
        id: data.id,
        username: data.username,
        timeSet: data.timeSet,
      });
    }
  });
  socket.on("make-move", (id, x, y, xx, yy, opponent) => {
    console.log(id, opponent, x, y, xx, yy);
    socket.to(opponent).emit("receive-move", id, x, y, xx, yy);
  });
  socket.on("resigned", (opponent) => {
    console.log("Game aborted");
    socket.to(opponent).emit("resigned");
  });
  socket.on(
    "gameResult",
    (username, opponentUsername, reason, result, movesCount, date) => {
      registerGameResult(
        username,
        opponentUsername,
        reason,
        result,
        movesCount,
        date
      );
      console.log(
        `Game result: ${username} ${
          result === "won" || result === "lost" ? result : "got draw"
        } by ${reason} - ${date}. moves: ${movesCount}`
      );
    }
  );
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
