import { socket } from './index';

export const socketEvents = ({ setValue }) => {
    socket.on("draw_board", (board) => {
        setValue(state => { return { ...state, board } });
    });
      
    socket.on("set_found", (setFound) => {
        setValue(state => { return { ...state, setFound } });
    });

    socket.on("turn_started", () => {
        const isActiveTurn = true;
        const setFound = undefined;
        setValue(state => { return { ...state, isActiveTurn } });
        setValue(state => { return { ...state, setFound } });
    });

    socket.on("turn_ended", () => {
        const isActiveTurn = false;
        const cardSelection = [];
        setValue(state => { return { ...state, isActiveTurn } });
        setValue(state => { return { ...state, cardSelection } });
    });
};
