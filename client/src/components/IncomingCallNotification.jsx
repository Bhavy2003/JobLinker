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
  

const IncomingCallNotification = () => {
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
    if (!incomingCall) return null;
    
    return (
        <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 z-50 max-w-md">
            <div className="flex items-center gap-4 mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                    <BsCameraVideo className="text-blue-500 text-xl" />
                </div>
                <div>
                    <h3 className="font-medium">Incoming Video Call</h3>
                    <p className="text-gray-600">{incomingCall.caller}</p>
                </div>
            </div>
            <div className="flex justify-end gap-2">
                <button
                    onClick={() => rejectVideoCall(incomingCall)}
                    className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                    Decline
                </button>
                <button
                    onClick={() => joinVideoCall(incomingCall)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
                    Answer
                </button>
            </div>
        </div>
    );
};

export default IncomingCallNotification;