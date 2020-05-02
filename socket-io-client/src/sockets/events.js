import { socket } from './index';

export const socketEvents = ({ setValue }) => {
    socket.on("receive_board", (board) => {
        setValue(state => { return { ...state, board } });
    });
      
    socket.on("set_found", (setFound) => {
        setValue(state => { return { ...state, setFound } });
    });
};
