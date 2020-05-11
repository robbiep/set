import { createContext } from "react";
import _ from 'lodash'

const getDefaultState = () => {
    return {
        board: [],
        cardSelection: [],
        setFound: undefined,
        isActiveTurn: false,
    }
};

const SocketContext = createContext(getDefaultState());

export {
    SocketContext,
    getDefaultState,
};