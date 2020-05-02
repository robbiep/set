import { socketEvents } from "./events";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";

export const socket = socketIOClient(ENDPOINT);

export const initSockets = ({ setValue }) => {
    socketEvents({ setValue });
};