import React from "react";
import { BsCameraVideo, BsCameraVideoOff, BsMic, BsMicMute } from "react-icons/bs";

const VideoCallModal = ({
    showVideoModal,
    isInVideoCall,
    selectedUser,
    localVideoRef,
    remoteStreams,
    endVideoCall,
    toggleVideo,
    toggleAudio,
    isVideoOn,
    isAudioOn,
}) => {
    if (!showVideoModal || !isInVideoCall) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-4 w-full max-w-5xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">
                        Video Call with {selectedUser?.email || ""}
                    </h2>
                    <button
                        onClick={endVideoCall}
                        className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                    >
                        End Call
                    </button>
                </div>

                <div className="video-grid grid grid-cols-2 gap-4">
                    {/* Local Video */}
                    <div className="video-container relative">
                        <video
                            ref={localVideoRef}
                            autoPlay
                            muted
                            playsInline
                            className="w-full h-64 bg-gray-800 rounded-lg"
                        />
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                            <button
                                onClick={toggleVideo}
                                className={`p-2 rounded-full ${isVideoOn ? "bg-blue-500" : "bg-red-500"} text-white`}
                            >
                                {isVideoOn ? <BsCameraVideo /> : <BsCameraVideoOff />}
                            </button>
                            <button
                                onClick={toggleAudio}
                                className={`p-2 rounded-full ${isAudioOn ? "bg-blue-500" : "bg-red-500"} text-white`}
                            >
                                {isAudioOn ? <BsMic /> : <BsMicMute />}
                            </button>
                        </div>
                        <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                            You
                        </div>
                    </div>

                    {/* Remote Video Streams */}
                    {Object.entries(remoteStreams).length > 0 ? (
                        Object.entries(remoteStreams).map(([email, stream]) => (
                            <div key={email} className="video-container relative">
                                <video
                                    autoPlay
                                    playsInline
                                    className="w-full h-64 bg-gray-800 rounded-lg"
                                    ref={(el) => {
                                        if (el && stream) el.srcObject = stream;
                                    }}
                                />
                                <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                                    {email}
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="video-container flex items-center justify-center h-64 bg-gray-800 rounded-lg">
                            <p className="text-white text-center">Waiting for others to join...</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoCallModal;