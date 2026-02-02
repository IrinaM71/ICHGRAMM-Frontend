import { io } from "socket.io-client";
const socket = io("http://locallhost:5000", {
  withCredentials: true,
});

export default socket;
