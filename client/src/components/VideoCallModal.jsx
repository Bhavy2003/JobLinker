import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const socket = io("https://your-backend.onrender.com", {
    transports: ["websocket"],
    withCredentials: true
});

const VideoCallModal = ({ selectedUser }) => {
    const [stream, setStream] = useState(null);
    const [callActive, setCallActive] = useState(false);
    const peerConnection = useRef(null);

    useEffect(() => {
        socket.on("callUser", (data) => {
            if (!callActive) {
                handleIncomingCall(data);
            }
        });

        return () => {
            socket.off("callUser");
        };
    }, [callActive]);

    const startVideoCall = async () => {
        if (!selectedUser || callActive) return;

        setCallActive(true);

        try {
            const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setStream(localStream);

            if (!peerConnection.current) {
                peerConnection.current = new RTCPeerConnection();
                peerConnection.current.addStream(localStream);
            }

            const offer = await peerConnection.current.createOffer();
            await peerConnection.current.setLocalDescription(offer);

            socket.emit("callUser", {
                to: selectedUser.email,
                from: "your-email@example.com", // Replace with actual sender
                offer
            });

        } catch (error) {
            console.error("Error starting video call:", error);
        }
    };

    const handleIncomingCall = async (data) => {
        setCallActive(true);

        try {
            const localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            setStream(localStream);

            if (!peerConnection.current) {
                peerConnection.current = new RTCPeerConnection();
                peerConnection.current.addStream(localStream);
            }

            await peerConnection.current.setRemoteDescription(new RTCSessionDescription(data.offer));
            const answer = await peerConnection.current.createAnswer();
            await peerConnection.current.setLocalDescription(answer);

            socket.emit("acceptCall", { to: data.from, answer });

        } catch (error) {
            console.error("Error handling incoming call:", error);
        }
    };

    return (
        <div>
            <button onClick={startVideoCall} disabled={callActive}>
                Start Video Call
            </button>
            {stream && <video autoPlay playsInline srcObject={stream} />}
        </div>
    );
};

export default VideoCallModal;
