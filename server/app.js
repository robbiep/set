const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const debug = require('debug')('app:app');
const Game = require('./models/game/game').Game;
const port = process.env.PORT || 4001;
const index = require("./routes/index");

const app = express();
app.use(index);
const server = http.createServer(app);
const io = socketIo(server);
let game;

io.on("connection", (socket) => {
    debug('socket - New client connected');

    if (game && game.isStarted()) {
        io.emit("draw_board", game.board.board, game.score[123]);
    }

    socket.on("start_game", () => {
        debug('socket - start_game ')
        game = new Game({ dealerStrategyType: 'auto' });
        game.addPlayer({playerId: 123})
        game.start();
        game.startRound();
        io.emit("draw_board", game.board.board);
    });

    socket.on("start_turn", (playerId) => {
        debug('socket - start_turn', playerId);

        const player = game.getPlayer(playerId);
        game.startTurn(player);
        io.emit('turn_started');
    });

    socket.on("submit_set", (cardPositions) => {
        debug('socket - submit_set', cardPositions)

        const hasCardSet = game.takeTurn(cardPositions)
        const isSetMsg = hasCardSet ? "Yeah son, that's a set." : "You are DOO DOO.";

        io.emit("set_found", isSetMsg);
        if (hasCardSet) {
            console.log(game.board.hasMinBoard());
            if (!game.board.hasActiveCardSets() || !game.board.hasMinBoard()) {
                game.deal();
            }
            io.emit("draw_board", game.board.board, game.score[123]);
        }
        io.emit('turn_ended');
    });

    socket.on("disconnect", () => {
        debug('socketIo - Client disconnected');
    });
});

server.listen(port, () => debug(`Listening on port ${port}`));