import { socket } from "./index";

export const startGame = () => {
    socket.emit('start_game');
};

export const startTurn = (playerId) => {
    socket.emit('start_turn', playerId );
};

export const submitSet = (setPositions) => {
    socket.emit('submit_set', setPositions);
};