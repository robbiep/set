import { socket } from "./index";

export const startGame = () => {
    socket.emit('start_game');
};
export const submitSet = (setPositions) => {
    console.log(setPositions)
    socket.emit('submit_set', setPositions);
};