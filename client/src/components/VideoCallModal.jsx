// import { useState, useEffect, useRef } from "react";
// import { io } from "socket.io-client";

// const socket = io("https://your-backend.onrender.com", {
//     transports: ["websocket"],
//     withCredentials: true
// });

// const VideoCallModal = ({ selectedUser }) => {
//     const [stream, setStream] = useState(null);
//     const [callActive, setCallActive] = useState(false);
//     const peerConnection = useRef(null);

//     useEffect(() => {
//         socket.on("callUser", (data) => {
//             if (!callActive) {
//                 handleIncomingCall(data);
//             }
//         });

//         return () => {
//             socket.off("callUser");
//         };
//     }, [callActive]);

//     const startVideoCall = async () => {
//         if (!selectedUser || callActive) return;

//         setCallActive(true);


//         
//       
//     
// 
// //gdcfdcf
// export default VideoCallModal;
