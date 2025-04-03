import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import Navbar from "./shared/Navbar";
import Footer from "./shared/Footer";
import { toast } from "react-toastify";
import { BsPaperclip, BsEmojiSmile } from "react-icons/bs";
import { useTranslation } from "react-i18next";
import "../../src/i18n.jsx";
import { v4 as uuidv4 } from "uuid";
import EmojiPicker from "emoji-picker-react";
import { BsCameraVideo } from "react-icons/bs";
  


    

const VideoCallModal = () => {
    const { t } = useTranslation();
    const [allUsers, setAllUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [sentUsers, setSentUsers] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [unreadMessages, setUnreadMessages] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [showScrollButton, setShowScrollButton] = useState(false);
    const [firstNewMessageId, setFirstNewMessageId] = useState(null);
    const [showNewMessage, setShowNewMessage] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [selectedMessages, setSelectedMessages] = useState([]);
    const [isSelectionModeNew, setIsSelectionModeNew] = useState(false);
    const [selectedMessagesNew, setSelectedMessagesNew] = useState([]);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    const [confirmAction, setConfirmAction] = useState(null);
    const [confirmData, setConfirmData] = useState(null);
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const [isMessageSearchVisible, setIsMessageSearchVisible] = useState(false);
    const [messageSearchQuery, setMessageSearchQuery] = useState("");
    const [pinnedMessages, setPinnedMessages] = useState([]);
    const userEmail = localStorage.getItem("email");
    const currentUser = userEmail;
    const storageKey = `sentUsers_${currentUser}`;
    const chatStorageKey = `chat_${currentUser}`;
    const DUMMY_PHOTO_URL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToiRnzzyrDtkmRzlAvPPbh77E-Mvsk3brlxQ&s";
    const fileInputRef = useRef(null);
    const chatContainerRef = useRef(null);
    const emojiPickerRef = useRef(null);
   
    const [isPinMode, setIsPinMode] = useState(false);
    const [selectedPinMessage, setSelectedPinMessage] = useState(null);
    const peerRef = useRef(null);


    const [isInVideoCall, setIsInVideoCall] = useState(false);
    const [videoCallData, setVideoCallData] = useState(null);
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [isAudioOn, setIsAudioOn] = useState(true);
    const [remoteStreams, setRemoteStreams] = useState({});
    const [showVideoModal, setShowVideoModal] = useState(false);
    const [incomingCall, setIncomingCall] = useState(null);
    const peerConnections = useRef({});
    const localStreamRef = useRef(null);
    if (!showVideoModal) return null;
    
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
                    {/* Local video */}
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
                                className={`p-2 rounded-full ${isVideoOn ? 'bg-blue-500' : 'bg-red-500'} text-white`}
                            >
                                {isVideoOn ? <BsCameraVideo /> : <BsCameraVideoOff />}
                            </button>
                            <button
                                onClick={toggleAudio}
                                className={`p-2 rounded-full ${isAudioOn ? 'bg-blue-500' : 'bg-red-500'} text-white`}
                            >
                                {isAudioOn ? <BsMic /> : <BsMicMute />}
                            </button>
                        </div>
                        <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                            You
                        </div>
                    </div>
                    
                    {/* Remote video streams */}
                    {Object.entries(remoteStreams).length > 0 ? (
                        Object.entries(remoteStreams).map(([email, stream]) => (
                            <div key={email} className="video-container relative">
                                <video
                                    autoPlay
                                    playsInline
                                    className="w-full h-64 bg-gray-800 rounded-lg"
                                    ref={el => {
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