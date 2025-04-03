import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const socket = io("https://localhost:8000"); // Ensure same port as your app

const VideoCallModal = ({ selectedUserEmail, currentUserEmail }) => {
    const [stream, setStream] = useState(null);
    const [remoteStream, setRemoteStream] = useState(null);
    const [isCalling, setIsCalling] = useState(false);
    const [isReceiving, setIsReceiving] = useState(false);
    const [callAccepted, setCallAccepted] = useState(false);
    const [peerConnection, setPeerConnection] = useState(null);

    const localVideoRef = useRef();
    const remoteVideoRef = useRef();

    useEffect(() => {
        const newPeerConnection = new RTCPeerConnection({
            iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
        });

        setPeerConnection(newPeerConnection);

        socket.on("callUser", (data) => {
            if (data.to === currentUserEmail) {
                setIsReceiving(true);
            }
        });

        socket.on("callAccepted", async (signal) => {
            setCallAccepted(true);
            if (peerConnection) {
                await peerConnection.setRemoteDescription(new RTCSessionDescription(signal));
            }
        });

        return () => {
            socket.off("callUser");
            socket.off("callAccepted");
        };
    }, [peerConnection]);

    const startCall = async () => {
        setIsCalling(true);
        const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(userStream);
        localVideoRef.current.srcObject = userStream;

        userStream.getTracks().forEach((track) => {
            peerConnection.addTrack(track, userStream);
        });

        peerConnection.ontrack = (event) => {
            setRemoteStream(event.streams[0]);
            remoteVideoRef.current.srcObject = event.streams[0];
        };

        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);

        socket.emit("callUser", {
            from: currentUserEmail,
            to: selectedUserEmail,
            signal: offer,
        });
    };

    const acceptCall = async () => {
        setCallAccepted(true);
        const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        setStream(userStream);
        localVideoRef.current.srcObject = userStream;

        userStream.getTracks().forEach((track) => {
            peerConnection.addTrack(track, userStream);
        });

        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);

        socket.emit("acceptCall", { signal: answer, to: selectedUserEmail });
    };

    const toggleVideo = () => {
        stream.getVideoTracks()[0].enabled = !stream.getVideoTracks()[0].enabled;
    };

    const toggleAudio = () => {
        stream.getAudioTracks()[0].enabled = !stream.getAudioTracks()[0].enabled;
    };

    const endCall = () => {
        setIsCalling(false);
        setIsReceiving(false);
        setCallAccepted(false);
        peerConnection.close();
        setPeerConnection(null);
        socket.emit("endCall", { to: selectedUserEmail });
    };

    return (
        <div className="video-call-container">
            {isCalling ? <p>Calling {selectedUserEmail}...</p> : null}
            {isReceiving && !callAccepted ? (
                <button onClick={acceptCall} className="join-call-button">Join Call</button>
            ) : null}

            <div className="video-container">
                <video ref={localVideoRef} autoPlay muted className="local-video" />
                <video ref={remoteVideoRef} autoPlay className="remote-video" />
            </div>

            <div className="controls">
                <button onClick={toggleVideo}>Toggle Video</button>
                <button onClick={toggleAudio}>Toggle Audio</button>
                <button onClick={endCall} className="end-call">End Call</button>
            </div>
        </div>
    );
};

export default VideoCallModal;
