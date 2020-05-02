const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const debug = require('debug')('app:app');

const Game = require('./models/game/game').Game;
const game = new Game();

const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);

const server = http.createServer(app);

const io = socketIo(server);

let interval;

io.on("connection", (socket) => {
  debug('socket - New client connected');

  socket.on("start_game", () => {
    debug('socket - start_game ')
    game.dealBoard();
    socket.emit("receive_board", game.board.board);
  });

  socket.on("submit_set", (data) => {
    debug('socket - submit_set', data)

    const cardSet = game.selectSetFromBoard({player: {}, cardPositions: data})
    const isSetMsg = cardSet ? "Yeah son, that's a set." : "You are DOO DOO.";

    io.emit("set_found", isSetMsg);
  })

  socket.on("disconnect", () => {
    debug('socketIo - Client disconnected');
  });
});

server.listen(port, () => debug(`Listening on port ${port}`));