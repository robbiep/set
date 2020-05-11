import { socket } from './index';
import { getDefaultState } from '../components/Socket/SocketContext';

export const socketEvents = ({ setValue }) => {
    socket.on("draw_board", (board, playerScore) => {
        console.log(board);
        // TODO - figure out why we need to clear board before redraw
        const defaultState = getDefaultState();
        setValue(state => { return { ...state, ...defaultState }});
        setValue(state => { return { ...state, board } });
        setValue(state => { return { ...state, playerScore } });
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
